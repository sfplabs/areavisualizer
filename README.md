# Area Visualizer

> A web-based 3D tool that turns a numeric area or volume measurement into an intuitive shape next to a human-scale reference model.

> Source & original author: [@shawnfromportland](https://github.com/shawnfromportland)

## What

Area Visualizer is a browser-based Three.js app that renders a numeric measurement as 3D geometry. In **area** mode it draws a semi-transparent square plane whose side equals `√measurement`; in **volume** mode it draws a cube (default) or sphere whose dimension equals `∛measurement`. A humanoid GLB model stands at the origin as a human-scale reference so squared and cubed numbers become easy to grasp.

## Why

People read linear measurements (like height) intuitively, but squared and cubed units are hard to picture. This app gives instant visual feedback by rendering the measurement in 3D beside a familiar human-scale object. See [`project-specification.md`](project-specification.md) for the original problem statement and goals.

## Who

Author: Shawn K ([@shawnfromportland](https://github.com/shawnfromportland)). Intended audience: anyone wanting to understand area/volume magnitudes visually, plus developers exploring a small, focused Three.js example.

## Where

- Runs locally in a modern browser via the Vite dev server.
- Deployment URLs: none. There is no CI, hosting, or GitHub Pages configured.
- GitHub repo: https://github.com/sfplabs/areavisualizer.git

## When

- Status: early/MVP. Single "Initial commit" in history; several spec features are not yet implemented (see the docs for a per-topic **Status / gaps**).
- Use it when you want a quick local 3D visualization of an area or volume number, or as a reference Three.js project.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173). Pick a mode with the toggle, type a number, orbit with the mouse, and move with WASD.

## Documentation

- [docs/overview/README.md](docs/overview/README.md) — what the app is, why it exists, and core concepts.
- [docs/getting-started/README.md](docs/getting-started/README.md) — prerequisites, install, run, and first use.
- [docs/architecture/README.md](docs/architecture/README.md) — tech stack, directory layout, rendering/data flow, key modules.
- [docs/usage/README.md](docs/usage/README.md) — the features that exist today and how to use them.
- [docs/development/README.md](docs/development/README.md) — dev environment, build/test state, conventions, and how to extend.
- [docs/reference/README.md](docs/reference/README.md) — config values, scripts, units, and the module API surface.

## Credits

Created by Shawn K — [@shawnfromportland](https://github.com/shawnfromportland). Please credit the original author when reusing this work.
