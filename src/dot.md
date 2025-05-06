---
toc: false
---

# Dot: Dodge Drum

Each dot is a drum. Click the chart to play drums, like [Touch Pianist](https://touchpianist.com/).

## Cars

```js
const data = await FileAttachment("./data/cars.json").json();
```

```js
const node = Plot.plot({
  width,
  height: 160,
  marks: [
    Plot.dotX(
      cars,
      Plot.dodgeY({
        x: "weight (lb)",
        title: "name",
        fill: "currentColor",
        anchor: "middle",
      })
    ),
  ],
});

display(node);
```

## Data

```js
display(Inputs.table(data));
```
