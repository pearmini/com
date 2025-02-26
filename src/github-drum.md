---
toc: false
---

# Github Drum

```js
import {githubDrum} from "./components/githubDrum.js";
```

```js
const year = (d) => d.getUTCFullYear();
const week = (d) => d3.utcWeek.count(d3.utcYear(d), d);
```

```js
const data = await FileAttachment("./data/contributions.csv").csv();
const contributions = data.map((d) => ({count: +d.contributionCount, date: new Date(d.date)}));
const lineData = d3
  .rollups(
    contributions,
    (D) => ({date: d3.min(D, (d) => d.date), count: d3.sum(D, (d) => d.count), endDate: d3.max(D, (d) => d.date)}),
    (d) => year(d.date) + "," + week(d.date)
  )
  .map((d) => d[1]);
```

```js
const chartHeight = 720;
const color = scaleColor(contributions);
```

```js
function scaleColor(data) {
  const domains = d3.rollup(
    contributions,
    (D) => ({year: year(D[0].date), domain: Array.from(new Set(D.map((d) => d.count)))}),
    (d) => year(d.date)
  );
  const years = Array.from(new Set(contributions.map((d) => year(d.date))));
  const main = d3.scaleOrdinal(years, d3.schemeObservable10);
  const scaleByYear = new Map(
    years.map((d) => {
      const mainColor = main(d);
      const {domain} = domains.get(d);
      const color = d3.color(mainColor);
      const range = [color.brighter(2), color, color.darker(2)].map((d) => d + "");
      return [d, d3.scaleQuantile(domain, range)];
    })
  );
  return ({date, count}) => (count ? scaleByYear.get(year(date))(count) : "black");
}
```

```js
const lineChart = Plot.plot({
  width: 240,
  height: chartHeight,
  x: {nice: true, reverse: true, grid: true},
  y: {reverse: true, nice: true},
  color: {type: "categorical"},
  marks: [
    Plot.lineX(lineData, {
      x: "count",
      y: "date",
      stroke: (d) => year(d.date),
      channels: {
        start: (d) => d.date,
        end: (d) => d.endDate,
      },
      tip: {
        format: {
          stroke: false,
          z: false,
          y: false,
        },
      },
    }),
  ],
});
```

```js
const cellChart = Plot.plot({
  width: 700,
  height: chartHeight,
  fx: {axis: false},
  x: {axis: false},
  y: {axis: false},
  marks: [
    Plot.cell(contributions, {
      fy: (d) => year(d.date),
      x: (d) => week(d.date),
      y: (d) => d.date.getUTCDay(),
      fill: (d) => color(d),
      inset: 0.5,
      tip: {
        format: {
          count: true,
          date: true,
          x: false,
          y: false,
          fy: false,
        },
      },
      channels: {
        date: (d) => d.date,
        count: (d) => d.count,
      },
    }),
  ],
});

d3.select(cellChart).selectAll("rect").attr("rx", 2).attr("ry", 2);
```

```js
display(html`<div style="display:flex">${lineChart}${cellChart}</div>`);
```

```js
console.log({contributions});
```
