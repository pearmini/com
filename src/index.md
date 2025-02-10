---
toc: false
---

<div class="hero">
  <h1>The Code of Music</h1>
   <h2>Some of my pieces about music, created by <a href="https://charmingjs.org/" target="__blank">Charming.js</a></h2>!
</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 504px">
  <div class="card">
    <a class="link" href="/streamgraph"><img src="/img/streamgraph.png" width="100%"/></a>
  </div>
  <div class="card">
    <a class="link" href="/eye"><img src="/img/eye.png" /></a>
  </div>
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

.card a {
  position: relative;
  display: block;
  background: black;
  width: 100%;
  height: 100%;
}

.card img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
}

</style>
