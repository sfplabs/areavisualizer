# Usage

> The features that exist today and how to use them.

## Controls overview

The UI is a small panel fixed to the top-left of the viewport with two controls: a mode toggle button and a numeric measurement input. All other interaction is in the 3D scene itself.

## Mode toggle

- A single button labeled `Area` or `Volume`.
- Starts on **Area**. Clicking it flips the mode and re-renders the current measurement.

## Measurement input

- A numeric field (`min=0`, placeholder "Enter measurement").
- Updates the visualization live on every input event. Non-numeric input resolves to `0`.

### Area mode

- Renders a semi-transparent square **plane** lying flat on the ground.
- Side length = `√measurement`. (For example, entering `100` yields a 10×10 plane.)
- Includes a hot-pink wireframe outline.

### Volume mode

- Renders a semi-transparent **cube** by default.
- Dimension = `∛measurement`. (For example, entering `1000` yields a 10×10×10 cube.)
- Includes a hot-pink wireframe outline.

## Camera and navigation

- **Mouse** — orbit and zoom via Three.js `OrbitControls` (damping enabled).
- **W / A / S / D** — move the camera horizontally (forward/back/left/right) relative to view direction.
- The camera starts at position `(5, 5, 5)` looking at the origin.

## Scene reference

- A humanoid GLB model stands at the origin for human-scale comparison; it persists as you change the measurement.
- A grey box appears instead if the model fails to load.
- A 10-unit axes helper and scene lighting are always present.

## Status / gaps

Described in the spec but **not** available in the current UI:

- **Units dropdown** — you cannot choose square/cubic feet, meters, inches, etc. All values are treated as raw numbers.
- **Volume shape toggle** — sphere rendering exists in code (`setShape('sphere')`) but there is no button to trigger it; volume is always a cube.
- **Automatic reference switching** (hand / sports field / Earth by scale) — not implemented.

## Related docs

- [Overview](../overview/README.md)
- [Getting started](../getting-started/README.md)
- [Architecture](../architecture/README.md)
- [Development](../development/README.md)
- [Reference](../reference/README.md)
- [Project README](../../README.md)
