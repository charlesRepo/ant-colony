// `sense` is how far away an ant can smell a pile of that kind; `value` is how much ants want it
// (sugar beats biscuit; toxic food looks like ordinary food to them).
export const FOOD_TYPES = {
  biscuit: { label: 'Biscuit', value: 1, sense: 100, fill: [206, 160, 94], edge: [132, 92, 46], corner: 1 },
  sugar: { label: 'Sugar', value: 2, sense: 150, fill: [250, 248, 240], edge: [176, 170, 156], corner: 0.5 },
  toxic: { label: 'Toxic', value: 1, sense: 100, fill: [164, 214, 46], edge: [62, 96, 18], corner: 2, toxic: true },
};

const GRID = 5;   // a pile is GRID x GRID units
const UNIT = 5;   // spacing between units, in px

function layout() {
  const half = (GRID - 1) * UNIT / 2, units = [];
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      units.push({ x: i * UNIT - half + random(-0.6, 0.6), y: j * UNIT - half + random(-0.6, 0.6), rot: random(-0.35, 0.35), shade: random(-16, 16) });
    }
  }
  return units;
}

export class FoodSource {
  constructor(type, location) {
    this.type = type;
    this.kind = FOOD_TYPES[type];
    this.location = location.copy();
    this.radius = (GRID * UNIT) / 2;
    this.units = layout();
  }
  get isEmpty() { return this.units.length === 0; }
  get isToxic() { return !!this.kind.toxic; }
  // Remove the unit nearest to `from`; returns false once the pile is gone.
  take(from) {
    if (this.isEmpty) return false;
    let best = 0, bestD = Infinity;
    this.units.forEach((u, i) => {
      const d = dist(from.x, from.y, this.location.x + u.x, this.location.y + u.y);
      if (d < bestD) { bestD = d; best = i; }
    });
    this.units.splice(best, 1);
    return true;
  }
  display(alpha = 255) { FoodSource.draw(this.kind, this.location.x, this.location.y, this.units, alpha); }

  static draw(kind, x, y, units, alpha) {
    if (kind.toxic) {
      noStroke();
      for (let r = 34; r > 14; r -= 5) { fill(kind.fill[0], kind.fill[1], kind.fill[2], alpha * 0.045); circle(x, y, r); }
    }
    rectMode(CENTER);
    strokeWeight(0.6);
    stroke(kind.edge[0], kind.edge[1], kind.edge[2], alpha);
    for (const u of units) {
      push();
      translate(x + u.x, y + u.y);
      rotate(u.rot);
      fill(kind.fill[0] + u.shade, kind.fill[1] + u.shade, kind.fill[2] + u.shade * 0.6, alpha);
      rect(0, 0, 4.4, 4.4, kind.corner);
      pop();
    }
  }
  // Faint pile that follows the mouse while a food tool is selected.
  static drawPreview(type, x, y) {
    if (!FoodSource.previewUnits) FoodSource.previewUnits = layout();
    FoodSource.draw(FOOD_TYPES[type], x, y, FoodSource.previewUnits, 120);
  }
}
