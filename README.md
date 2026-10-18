# Ant Colony

An ant colony simulation using Processing, now with a p5.js (JavaScript) port.

Project structure:
- `Processing/` – container for the Processing sketch (original lives in `AntColonyProcessing/`).
- `AntColonyProcessing/` – original Processing (Java) sketch files.
- `JS/` – p5.js port preserving look-and-feel and behavior.

How to run:
- Processing: Open `AntColonyProcessing/AntColony.pde` in the Processing IDE and Run.
- JavaScript: Open `JS/index.html` in a browser (serving via a simple HTTP server recommended) and interact with the simulation.
  - Or, use the webpack build in `JS/`:
    - `cd JS`
    - `npm install`
    - Development server: `npm run dev` then open the printed URL (defaults to `http://localhost:5173/index.html`). Ensure `JS/vendor/p5.min.js` exists or your network allows the CDN fallbacks.
    - Watch-only (rebuild on change, serve with your own static server like Live Server): `npm run watch` in one terminal, and open `JS/index.html` with Live Server in another.
    - Production build: `npm run build` then open `JS/index.html` (it loads `dist/bundle.js`).

Notes:
- The JS port uses p5.js and mirrors the OOP structure of the original.
- The canvas is only the playfield; the control panel is HTML (`JS/index.html`, wired up in `JS/src/ControlPanel.js`). It adds ants (up to 100), places any number of biscuit/sugar/toxic piles (keys 1/2/3, Esc to stop), toggles the antlion, and switches palettes.
- New ants also hatch from the nest on their own at random intervals (every 4–14 s, up to 100 alive), so the colony recovers even if the antlion eats every ant.
- Biscuit and sugar each leave their own food trail. Sugar is worth more: an ant heading for biscuit switches to a sugar trail as soon as it crosses one.
- Colour palettes (Loam, dark; Dune, light) are defined in two places with matching ids: panel colours in `JS/style.css`, canvas colours in `JS/src/theme.js`.
 - Classes are split under `JS/src/` and bundled via webpack to `JS/dist/bundle.js`. p5 is treated as an external global; it loads from `JS/vendor/p5.min.js` (preferred) or falls back to CDNs via `JS/loader.js`.
