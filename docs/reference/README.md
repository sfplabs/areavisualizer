# Reference

> Config values, scripts, units, and the module API surface.

## npm scripts

Defined in [`package.json`](../../package.json):

| Script | Command | Notes |
| --- | --- | --- |
| `dev` | `vite` | Starts the Vite dev server. |
| `test` | `echo "Error: no test specified" && exit 1` | Placeholder; no tests. |

There are no `build` or `preview` scripts.

## Dependencies

| Package | Version | Role |
| --- | --- | --- |
| `three` | ^0.173.0 | 3D rendering, `OrbitControls`, `GLTFLoader`. |
| `vite` | ^6.0.11 | Dev server / bundler (devDependency). |

## Environment variables

None. The app reads no environment variables.

## Colors and opacity

From `src/config/colors.js`:

```js
COLORS = {
  background: 0x000000,   // black
  shape: 0xFFB6C1,        // light pink (fill)
  shapeOutline: 0xFF69B4, // hot pink (wireframe)
  axes: 0x666666          // (defined; AxesHelper uses default colors)
}
OPACITY = { shape: 0.3, outline: 1 }
```

## Units (defined, not yet wired)

From `src/config/units.js`. These constants exist but are not currently used at runtime.

**`AREA_UNITS`**

| Key | Label | Multiplier |
| --- | --- | --- |
| `square-meters` | m² | 1 |
| `square-feet` | ft² | 10.764 |
| `square-inches` | in² | 1550.003 |

**`VOLUME_UNITS`**

| Key | Label | Multiplier |
| --- | --- | --- |
| `cubic-meters` | m³ | 1 |
| `cubic-feet` | ft³ | 35.315 |
| `cubic-inches` | in³ | 61023.744 |

## Module API surface

### `Scene(container)` — `src/core/Scene.js`

- `render()` — apply WASD movement, update controls, render the frame.
- `clearMeasurements()` — remove all scene children except lights, the axes helper, and the human model.
- `updateCameraPosition()` — move the camera per pressed WASD keys.
- `loadHumanModel()` — async-load the GLB; falls back to a grey box on error.
- Properties: `scene`, `camera`, `renderer`, `controls`, `axesHelper`, `humanModel`, `keyStates`, `moveSpeed` (0.1).

### `VisualizationManager(scene)` — `src/services/VisualizationManager.js`

- `setMode(mode)` — `'area'` or `'volume'`.
- `setShape(shape)` — `'cube'` or `'sphere'` (used only in volume mode).
- `updateVisualization(measurement, units)` — clears measurements and draws area or volume. `units` is accepted but ignored.
- `visualizeArea(measurement)` — plane of side `√measurement` + wireframe.
- `visualizeVolume(measurement)` — cube or sphere of dimension `∛measurement` + wireframe.

### UI widgets — `src/ui/`

- `ModeToggle(container, onChange)` — button; calls `onChange('area'|'volume')`.
- `MeasurementInput(container, onChange)` — numeric input; calls `onChange(number)`.

## Assets

- `public/models/simple_male_humanoid_body_-_by_ezren.glb` — humanoid reference model, served at `/models/...`.

## Related specification

- [`project-specification.md`](../../project-specification.md) — original spec, including planned units, shape toggle, scale thresholds, and future enhancements.

## Related docs

- [Overview](../overview/README.md)
- [Getting started](../getting-started/README.md)
- [Architecture](../architecture/README.md)
- [Usage](../usage/README.md)
- [Development](../development/README.md)
- [Project README](../../README.md)
