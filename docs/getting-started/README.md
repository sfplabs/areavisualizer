# Getting started

> Prerequisites, install, run, and first use.

## Prerequisites

- [Node.js](https://nodejs.org/) (with npm) — required to run Vite. No specific version is pinned in the repo.
- A modern browser with WebGL support.

## Install

```bash
npm install
```

This installs the two dependencies declared in [`package.json`](../../package.json): `three` (^0.173.0) and `vite` (^6.0.11).

## Run

```bash
npm run dev
```

Vite serves the app (default http://localhost:5173). The dev server also serves the `public/` directory, so the humanoid model at `public/models/simple_male_humanoid_body_-_by_ezren.glb` is available at `/models/...`.

There is no production build or preview command (see [Status / gaps](#status--gaps)).

## First use

1. The scene opens with a black background, an axes helper, lighting, and the humanoid reference model.
2. Use the **mode toggle** (top-left) to switch between `Area` and `Volume`. It starts on `Area`.
3. Type a number into the **measurement input**. The shape updates live:
   - Area → a flat square plane of side `√value`.
   - Volume → a cube of side `∛value`.
4. Orbit and zoom with the mouse (OrbitControls). Move the camera horizontally with **W / A / S / D**.

## Status / gaps

- `npm test` is a placeholder that prints an error and exits `1` — there are no tests.
- No `build` or `preview` scripts are defined.
- The units dropdown and volume cube/sphere toggle described in the spec are not present in the UI.

## Related docs

- [Overview](../overview/README.md)
- [Architecture](../architecture/README.md)
- [Usage](../usage/README.md)
- [Development](../development/README.md)
- [Reference](../reference/README.md)
- [Project README](../../README.md)
