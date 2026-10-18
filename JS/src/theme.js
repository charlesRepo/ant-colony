// Canvas palettes. The panel colours for the same theme ids live in style.css ([data-theme=...]).
// Colours are [r, g, b]; trail colours carry a 4th value: their maximum opacity (0..1).
export const THEMES = {
  loam: {
    label: 'Loam',
    ground: [120, 90, 60],
    grainDark: [0, 0, 0], grainLight: [255, 235, 0], grainAlpha: 100,
    soilLight: [176, 138, 94], soilDark: [58, 38, 22], hole: [20, 12, 6],
    ant: [44, 22, 12],
    trails: { home: [26, 14, 6, 0.27], biscuit: [236, 146, 58, 0.42], sugar: [255, 240, 170, 0.45], toxic: [172, 236, 64, 0.42] },
  },
  dune: {
    label: 'Dune',
    ground: [196, 166, 122],
    grainDark: [112, 80, 44], grainLight: [255, 246, 222], grainAlpha: 110,
    soilLight: [232, 208, 168], soilDark: [128, 94, 58], hole: [42, 26, 14],
    ant: [38, 18, 10],
    trails: { home: [72, 44, 22, 0.24], biscuit: [186, 92, 18, 0.45], sugar: [255, 255, 246, 0.7], toxic: [92, 158, 20, 0.42] },
  },
};

export const DEFAULT_THEME = 'loam';

export function rgba(c, a = 1) { return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`; }
