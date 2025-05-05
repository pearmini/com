---
toc: false
---

```js
import {area} from "./area.js";
```

# Area: AV Instrument

> Press _A_, _S_, _D_, _F_ to play sounds, _C_ to clear the canvas

```js
const measure = view(
  Inputs.radio(["Waveform", "FFT"], {
    label: "Measure",
    value: "Waveform",
  })
);
```

```js
const urls = [
  await FileAttachment("samples/tears.wav").url(),
  await FileAttachment("samples/takerimba.wav").url(),
  await FileAttachment("samples/blip.wav").url(),
  await FileAttachment("samples/punch.wav").url(),
];

const cancelURL = await FileAttachment("samples/cancel.wav").url();
```

```js
const {root, dispose} = await area({urls, measure, width, cancelURL});

invalidation.then(() => dispose());

display(root.node());
```
