---
toc: false
---

# Contour: Timbre

Generate sound based on this [spectrogram-like](https://musiclab.chromeexperiments.com/Spectrogram/) chart.

## Volcano

```js
const data = await FileAttachment("./data/volcano.json").json();
```

```js
const node = Plot.plot({
  aspectRatio: 1,
  color: {
    legend: true,
    label: "Elevation (m)",
  },
  marks: [
    Plot.contour(data.values, {
      width: data.width,
      height: data.height,
      fill: Plot.identity,
      stroke: "black",
    }),
  ],
});

display(node);
```
