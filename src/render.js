import {shape} from "charmingjs";
import {
  stack,
  union,
  index,
  scaleLinear,
  scaleOrdinal,
  schemeTableau10,
  area,
  extent,
  max,
  stackOffsetExpand,
} from "d3";

const d3 = {stack, union, index, scaleLinear, scaleOrdinal, schemeTableau10, area, extent, max, stackOffsetExpand};

const data = [
  {index: 0, name: "A", value: 10},
  {index: 1, name: "A", value: 20},
  {index: 2, name: "A", value: 30},
  {index: 0, name: "B", value: 40},
  {index: 1, name: "B", value: 50},
  {index: 2, name: "B", value: 60},
  {index: 0, name: "C", value: 70},
  {index: 1, name: "C", value: 80},
  {index: 2, name: "C", value: 90},
];

export function render({width, height, marginLeft = 0, marginRight = 0, marginTop = 0, marginBottom = 0}) {
  const series = d3
    .stack()
    .offset(d3.stackOffsetExpand)
    .keys(d3.union(data.map((d) => d.name)))
    .value(([, D], key) => D.get(key).value)(
    d3.index(
      data,
      (d) => d.index,
      (d) => d.name
    )
  );

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.index))
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
    .rangeRound([height - marginBottom, marginTop]);

  const color = d3
    .scaleOrdinal()
    .domain(series.map((d) => d.key))
    .range(d3.schemeTableau10);

  const area = d3
    .area()
    .x((d) => x(d.data[0]))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  return shape.svg({width, height, viewBox: [0, 0, width, height]}, [
    series.map((d) =>
      shape.path({
        d: area(d),
        fill: color(d.key),
      })
    ),
  ]);
}
