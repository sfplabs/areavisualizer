# Architecture

> Tech stack, directory structure, rendering/data flow, and key modules.

## Tech stack

- **Vanilla JavaScript** (ES modules), no framework.
- **[Three.js](https://threejs.org/) 0.173** — rendering, plus `OrbitControls` and `GLTFLoader` from `three/examples/jsm`.
- **[Vite](https://vitejs.dev/) 6** — dev server and module bundling.
- **CSS** in a single `style.css`.

## Directory structure

```
areavisualizer/
├── index.html            # Entry HTML: <canvas id="scene">, loads /src/main.js
├── style.css             # Layout for canvas + fixed top-left controls
├── package.json          # Dependencies and scripts (dev, test)
├── package-lock.json
├── project-specification.md
├── public/
│   └── models/
│       └── simple_male_humanoid_body_-_by_ezren.glb   # Human-scale reference model
└── src/
    ├── main.js                       # App bootstrap: wires UI → manager → scene
    ├── core/
    │   └── Scene.js                  # Three.js scene, camera, renderer, controls, model
    ├── services/
    │   └── VisualizationManager.js   # Builds area/volume geometry
    ├── ui/
    │   ├── ModeToggle.js             # Area/Volume toggle button
    │   └── MeasurementInput.js       # Numeric input
    └── config/
        ├── colors.js                 # COLORS + OPACITY constants
        └── units.js                  # AREA_UNITS / VOLUME_UNITS (defined, not yet used)
```

Note: `index.html` links `style.css` and loads `/src/main.js` directly; there is no bundler config beyond Vite defaults.

## Rendering / data flow

1. `index.html` loads `src/main.js`, which constructs `App`.
2. `App.setupUI()` creates a `.controls` container and instantiates `ModeToggle` and `MeasurementInput`, passing callbacks.
3. `App` creates a `Scene` (attached to `document.body`) and a `VisualizationManager` bound to that scene.
4. User interaction:
   - `ModeToggle` → `visualizationManager.setMode(mode)` then re-renders the current measurement.
   - `MeasurementInput` → stores `currentMeasurement` then re-renders.
5. `VisualizationManager.updateVisualization(measurement)` calls `scene.clearMeasurements()` (which preserves lights, axes, and the human model) and then builds either the area plane or the volume mesh, adding both a filled mesh and a wireframe `LineSegments`.
6. `App.animate()` runs a `requestAnimationFrame` loop calling `scene.render()`, which applies WASD camera movement, updates `OrbitControls`, and renders the frame.

## Key modules

- **`core/Scene.js`** — owns the `THREE.Scene`, perspective camera (starts at `(5,5,5)`), WebGL renderer, `OrbitControls` (with damping), ambient + directional lights, a 10-unit `AxesHelper`, WASD key handling, and async loading of the GLB model (with a grey `BoxGeometry` fallback). `clearMeasurements()` filters scene children to keep lights, the axes helper, and the human model.
- **`services/VisualizationManager.js`** — holds `currentMode` (`'area'`) and `currentShape` (`'cube'`). `visualizeArea` uses `√measurement` for a `PlaneGeometry` rotated flat; `visualizeVolume` uses `∛measurement` for a `BoxGeometry` or `SphereGeometry`. Exposes `setMode` and `setShape`.
- **`ui/ModeToggle.js`** — a button that flips its own label between `Area`/`Volume` and calls `onChange`.
- **`ui/MeasurementInput.js`** — a `type="number"` input (`min=0`) that emits `parseFloat(value) || 0` on input.
- **`config/colors.js`** — `COLORS` (black background, pink shape, hot-pink outline) and `OPACITY` (0.3 shape fill).
- **`config/units.js`** — area/volume unit labels and multipliers; currently unused by the runtime.

## Status / gaps

- `VisualizationManager.updateVisualization` accepts a second `units` parameter but never uses it, and callers do not pass one.
- `config/units.js` is not imported anywhere in the running app.
- Only one reference model is loaded; the spec's multi-model scale progression is not present.

## Related docs

- [Overview](../overview/README.md)
- [Getting started](../getting-started/README.md)
- [Usage](../usage/README.md)
- [Development](../development/README.md)
- [Reference](../reference/README.md)
- [Project README](../../README.md)
