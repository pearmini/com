import "dotenv/config";
import {graphql} from "@octokit/graphql";
import {csvFormat} from "d3-dsv";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const USERNAME = "pearmini";

const query = `
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

async function fetchContributionsByYear(username, year) {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  try {
    const response = await graphql({
      query,
      username,
      from,
      to,
      headers: {
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    return response.user.contributionsCollection.contributionCalendar.weeks.flatMap((week) => week.contributionDays);
  } catch (error) {
    console.error(`Failed to fetch contributions for ${year}:`, error);
    return [];
  }
}

async function fetchMultipleYears(username, startYear, endYear) {
  let allContributions = [];
  for (let year = startYear; year <= endYear; year++) {
    const contributions = await fetchContributionsByYear(username, year);
    allContributions = allContributions.concat(contributions);
  }
  return allContributions;
}

const contributions = await fetchMultipleYears(USERNAME, 2019, 2025);

process.stdout.write(csvFormat(contributions));
