// The ground is static, so it is painted once into an offscreen layer (sand grains, the nest and
// the antlion pit) and blitted every frame.
export class Land {
  constructor(w, h) {
    this.wSize = w;
    this.hSize = h;
    this.increment = 0.5;
    this.layer = null;
  }
  render(theme, homes) {
    if (this.layer) this.layer.remove();
    const g = createGraphics(this.wSize, this.hSize);
    g.background(...theme.ground);
    this.texture(g, theme);
    for (const home of homes) home.render(g, theme);
    this.layer = g;
  }
  // Noise-driven sand grains on a 5px lattice.
  texture(g, theme) {
    const lo = theme.grainDark, hi = theme.grainLight;
    g.strokeWeight(2);
    let xOffset = 2;
    for (let x = 0; x < this.wSize; x += 5) {
      xOffset += this.increment;
      let yOffset = 2;
      for (let y = 0; y < this.hSize; y += 5) {
        yOffset += this.increment;
        const t = noise(xOffset + 255, yOffset);
        g.stroke(lerp(lo[0], hi[0], t), lerp(lo[1], hi[1], t), lerp(lo[2], hi[2], t), theme.grainAlpha);
        g.point(x, y);
      }
    }
  }
  display() { image(this.layer, 0, 0); }
}
