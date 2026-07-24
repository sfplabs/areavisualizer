# Overview

> What Area Visualizer is, why it exists, and the concepts behind it.

## What it is

Area Visualizer is a single-page, vanilla-JavaScript web app built on [Three.js](https://threejs.org/). It renders a full-viewport 3D scene where a numeric measurement is drawn as geometry:

- **Area mode** — a semi-transparent square plane laid flat on the ground. Its side length is `√measurement`.
- **Volume mode** — a semi-transparent cube (default) or sphere. Its dimension is `∛measurement`.

A humanoid GLB model sits at the origin as a fixed human-scale reference, so the rendered shape can be compared against something familiar.

## Why it exists

Linear measurements are easy to picture, but squared and cubed units are not. The app's goal is to give instant visual understanding of area and volume by:

1. Rendering the measurement in 3D immediately as it is typed.
2. Keeping interaction minimal (pick a mode, type a number).
3. Providing a human-scale reference object for comparison.

The full problem statement, goals, and user stories live in [`project-specification.md`](../../project-specification.md).

## Core concepts

- **Mode** — `area` or `volume`, controlled by a single toggle button (starts on `area`).
- **Measurement** — a non-negative number entered in a numeric input; updates the visualization live.
- **Shape derivation** — area uses `Math.sqrt`; volume uses `Math.cbrt`. Geometry is translated so a corner (or the sphere) sits relative to the origin.
- **Reference model** — one humanoid GLB, scaled to ~human size, loaded once and preserved across measurement changes; a grey box is used as a fallback if the model fails to load.
- **Camera** — Three.js `OrbitControls` for orbit/zoom plus WASD keys for horizontal movement.

## Status / gaps

The specification describes more than the current build ships. Not yet implemented:

- Units dropdown (unit config exists in code but is not wired to the UI or to calculations).
- Volume shape toggle in the UI (cube/sphere switching exists in code but is not exposed).
- Scale-based reference switching (hand / sports field / Earth); only the single humanoid model is used.

## Related docs

- [Getting started](../getting-started/README.md)
- [Architecture](../architecture/README.md)
- [Usage](../usage/README.md)
- [Development](../development/README.md)
- [Reference](../reference/README.md)
- [Project README](../../README.md)
