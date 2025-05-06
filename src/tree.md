---
toc: false
---

# Tree: Chord

Play chords following the structure of tree like this [Turtle Melody](https://editor.p5js.org/luisa/sketches/H11ZbqNa7).

## Flare

```js
const data = await FileAttachment("./data/flare.json").json();
```

```js
const node = Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 40,
  marginRight: 160,
  width: 928,
  height: 1800,
  marks: [Plot.tree(flare, {path: "name", delimiter: "."})],
});

display(node);
```

## Data

```js
display(Inputs.table(data));
```
