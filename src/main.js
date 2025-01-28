import "./style.css";
import {render} from "./render.js";

document.querySelector("#app").append(
  render({
    width: window.innerWidth,
    height: window.innerHeight,
  })
);
