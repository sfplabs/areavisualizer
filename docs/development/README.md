# Development

> Dev environment, build/test state, conventions, and how to extend.

## Dev environment

```bash
npm install     # install three + vite
npm run dev     # start Vite dev server (default http://localhost:5173)
```

Vite serves `index.html`, ES modules under `src/`, and static assets under `public/` with hot module reloading.

## Build / test state

- **Build:** none. There is no `build` or `preview` script; the app is only run through the Vite dev server today.
- **Test:** `npm test` is the default placeholder — it prints `Error: no test specified` and exits `1`. There is no test framework.

## Conventions

- ES modules with named exports; classes are `PascalCase`.
- One responsibility per file: UI widgets in `src/ui/`, scene/render code in `src/core/`, visualization logic in `src/services/`, constants in `src/config/`.
- UI widgets take a `(container, onChange)` constructor and append their own DOM.
- Colors/opacity come from `src/config/colors.js` rather than being hard-coded in geometry code (a few incidental colors, e.g. lights and the fallback cube, are inline).

## How to extend

- **Wire the units dropdown:** `src/config/units.js` already defines `AREA_UNITS` / `VOLUME_UNITS` with labels and multipliers. Add a `<select>` in a UI widget (mirroring `MeasurementInput`), pass the chosen unit through to `VisualizationManager.updateVisualization(measurement, units)`, and apply the multiplier before `Math.sqrt` / `Math.cbrt`.
- **Expose the volume shape toggle:** `VisualizationManager.setShape('cube'|'sphere')` already exists. Add a control (shown only in volume mode) that calls it and re-renders.
- **Add reference models by scale:** currently `Scene.loadHumanModel()` loads one GLB. To implement the spec's hand/human/field/Earth progression, load additional models and select one based on the measurement.
- **Add new visualizations:** extend `VisualizationManager` with a new `visualizeX` method and build geometry + a wireframe `LineSegments`, then add the mesh(es) via `this.scene.scene.add(...)`. Remember `clearMeasurements()` only preserves lights, the axes helper, and the human model.

## Status / gaps

- No linting, formatting, or CI configuration is present.
- No automated tests.

## Related docs

- [Overview](../overview/README.md)
- [Getting started](../getting-started/README.md)
- [Architecture](../architecture/README.md)
- [Usage](../usage/README.md)
- [Reference](../reference/README.md)
- [Project README](../../README.md)
