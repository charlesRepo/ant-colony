// Pheromones live on a fine grid instead of a list of points: deposits never stack into an opaque
// blob, ants can sample the strength around them cheaply, and the whole field is drawn as one
// translucent image under the ants.
// Each food kind has its own trail so ants can tell where a trail leads (see Ant.step).
export const TRAIL = { HOME: 0, BISCUIT: 1, SUGAR: 2, TOXIC: 3 };

// Per-frame decay is picked per cell from a patchy noise field, so a trail breaks up into fading
// dashes instead of dimming evenly. Fresh trails hold full opacity for a moment, and opacity then
// follows sqrt(strength), which keeps faint remnants visible for a while before they vanish.
// Home trails are laid by every searching ant, so they fade sooner than food and warning trails.
const DECAY = [[0.995, 0.998], [0.9958, 0.9988], [0.9958, 0.9988], [0.9958, 0.9988]]; // [fast, slow] per layer
const HOLD = 1.6;
const CUTOFF = 0.006;

export class PheromoneField {
  constructor(w, h, cellSize = 2) {
    this.cell = cellSize;
    this.cols = Math.ceil(w / cellSize);
    this.rows = Math.ceil(h / cellSize);
    const n = this.cols * this.rows;
    this.layers = DECAY.map(() => ({ strength: new Float32Array(n), decay: new Float32Array(n) }));
    this.buffer = createGraphics(this.cols, this.rows);
    this.buffer.pixelDensity(1);
    this.buffer.loadPixels();
    this.colors = [];
  }
  setColors(trails) {
    this.colors = [trails.home, trails.biscuit, trails.sugar, trails.toxic].map(([r, g, b, a]) => ({ r, g, b, a }));
  }
  clear() {
    for (const l of this.layers) { l.strength.fill(0); l.decay.fill(0); }
    this.buffer.pixels.fill(0);
  }
  // Splat bilinearly over the four nearest cells so trails come out anti-aliased.
  deposit(layer, x, y, amount) {
    const fx = x / this.cell - 0.5, fy = y / this.cell - 0.5;
    const c0 = Math.floor(fx), r0 = Math.floor(fy);
    const tx = fx - c0, ty = fy - r0;
    const l = this.layers[layer];
    const [fast, slow] = DECAY[layer];
    const patch = constrain((noise(x * 0.04, y * 0.04, layer * 10 + frameCount * 0.002) - 0.5) * 2.4 + 0.5, 0, 1);
    for (let k = 0; k < 4; k++) {
      const c = c0 + (k & 1), r = r0 + (k >> 1);
      if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) continue;
      const w = ((k & 1) ? tx : 1 - tx) * ((k >> 1) ? ty : 1 - ty);
      const i = r * this.cols + c, v = amount * Math.min(1, w * 1.5);
      if (v > l.strength[i]) l.strength[i] = v;
      l.decay[i] = lerp(fast, slow, constrain(patch + (Math.random() - 0.5) * 0.3, 0, 1));
    }
  }
  // Lay a continuous line between two positions so fast ants don't leave dotted trails.
  depositLine(layer, from, to, amount) {
    const steps = Math.max(1, Math.ceil(dist(from.x, from.y, to.x, to.y) / this.cell));
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      this.deposit(layer, from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, amount);
    }
  }
  // Sum of the strengths in a (2r+1)² block of cells around (x, y).
  sample(layer, x, y, r = 2) {
    const c0 = Math.floor(x / this.cell), r0 = Math.floor(y / this.cell);
    const s = this.layers[layer].strength;
    let sum = 0;
    for (let row = Math.max(0, r0 - r); row <= Math.min(this.rows - 1, r0 + r); row++) {
      for (let col = Math.max(0, c0 - r); col <= Math.min(this.cols - 1, c0 + r); col++) {
        sum += s[row * this.cols + col];
      }
    }
    return sum;
  }
  // Decay every cell and composite the layers in TRAIL order (home at the bottom, toxic on top).
  update() {
    const px = this.buffer.pixels;
    const strength = this.layers.map(l => l.strength), decay = this.layers.map(l => l.decay);
    const [s0, s1, s2, s3] = strength;
    const n = this.cols * this.rows;
    for (let i = 0; i < n; i++) {
      const p = i << 2;
      if (s0[i] === 0 && s1[i] === 0 && s2[i] === 0 && s3[i] === 0) { if (px[p + 3] !== 0) px[p + 3] = 0; continue; }
      let A = 0, R = 0, G = 0, B = 0;
      for (let l = 0; l < strength.length; l++) {
        let s = strength[l][i];
        if (s === 0) continue;
        s *= decay[l][i];
        if (s < CUTOFF) s = 0;
        strength[l][i] = s;
        if (s === 0) continue;
        const c = this.colors[l], a = c.a * Math.sqrt(Math.min(1, s * HOLD)), k = 1 - a;
        R = c.r * a + R * k; G = c.g * a + G * k; B = c.b * a + B * k; A = a + A * k;
      }
      if (A === 0) { px[p + 3] = 0; continue; }
      px[p] = R / A; px[p + 1] = G / A; px[p + 2] = B / A; px[p + 3] = A * 255;
    }
    this.buffer.updatePixels();
  }
  display() {
    image(this.buffer, 0, 0, this.cols * this.cell, this.rows * this.cell);
  }
}
