import { rgba } from './theme.js';

// Light comes from the top-left: a raised surface is lit on that side, a depression is lit on the
// opposite inner wall.
const LIGHT = -3 * Math.PI / 4;

export class Home {
  constructor(origin, radius, clearance) {
    this.origin = origin.copy();
    this.radius = radius;          // the opening itself
    this.clearance = clearance;    // keep food piles at least this far from the centre
  }
  distanceTo(p) { return dist(p.x, p.y, this.origin.x, this.origin.y); }
}

// The ants' nest: a crater of excavated soil pellets around a dark, slightly irregular entrance.
export class AntHome extends Home {
  constructor(origin) { super(origin, 11, 34); }
  render(g, theme) {
    const { x, y } = this.origin;
    const r = this.radius, mound = 42;
    const ctx = g.drawingContext;
    ctx.save();
    let grad = ctx.createRadialGradient(x, y, r * 0.8, x, y, mound);
    grad.addColorStop(0, rgba(theme.soilLight, 0.7));
    grad.addColorStop(0.45, rgba(theme.soilLight, 0.4));
    grad.addColorStop(1, rgba(theme.soilLight, 0));
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, mound, 0, Math.PI * 2); ctx.fill();
    // The mound's outer slope facing away from the light.
    grad = ctx.createRadialGradient(x + 8, y + 8, r, x + 8, y + 8, mound);
    grad.addColorStop(0, rgba(theme.soilDark, 0.4));
    grad.addColorStop(1, rgba(theme.soilDark, 0));
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x + 8, y + 8, mound, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    randomSeed(7);
    g.noStroke();
    for (let i = 0; i < 520; i++) {
      const a = random(TWO_PI);
      const d = r + 2 + Math.abs(randomGaussian(0, 11));
      if (d > mound) continue;
      const lit = constrain(0.55 + 0.35 * Math.cos(a - LIGHT) + random(-0.3, 0.3), 0, 1);
      const c = theme.soilDark.map((v, k) => lerp(v, theme.soilLight[k], lit));
      const size = random(1.4, 3.6) * map(d, r, mound, 1.1, 0.6);
      g.fill(0, 0, 0, 50);
      g.circle(x + Math.cos(a) * d + 0.6, y + Math.sin(a) * d + 0.8, size);
      g.fill(c[0], c[1], c[2], map(d, r, mound, 255, 90));
      g.circle(x + Math.cos(a) * d, y + Math.sin(a) * d, size);
    }

    // Entrance: an irregular opening, darkest under the rim nearest the light.
    const edge = [];
    for (let a = 0; a < TWO_PI; a += TWO_PI / 28) edge.push(r * (0.86 + 0.28 * noise(Math.cos(a) + 5, Math.sin(a) + 5)));
    const opening = () => {
      ctx.beginPath();
      edge.forEach((rr, i) => { const a = i * TWO_PI / edge.length; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr); });
      ctx.closePath();
    };
    ctx.save();
    grad = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, r * 1.15);
    grad.addColorStop(0, rgba(theme.hole, 1));
    grad.addColorStop(0.6, rgba(theme.hole, 0.97));
    grad.addColorStop(1, rgba(theme.soilDark, 0.95));
    ctx.fillStyle = grad;
    opening(); ctx.fill();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = rgba(theme.soilLight, 0.55);
    ctx.beginPath(); ctx.arc(x, y, r * 1.05, Math.PI / 4 - 1.2, Math.PI / 4 + 1.2); ctx.stroke();
    ctx.restore();
    randomSeed();
  }
}

// The antlion's lair: a conical funnel dug into the sand, with a rim of thrown-out grains.
export class PredatorHome extends Home {
  constructor(origin) { super(origin, 50, 66); }
  render(g, theme) {
    const { x, y } = this.origin;
    const R = this.radius;
    const ctx = g.drawingContext;
    ctx.save();
    let grad = ctx.createRadialGradient(x, y, R * 0.9, x, y, R + 14);
    grad.addColorStop(0, rgba(theme.soilLight, 0.45));
    grad.addColorStop(1, rgba(theme.soilLight, 0));
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, R + 14, 0, Math.PI * 2); ctx.fill();

    grad = ctx.createRadialGradient(x - R * 0.12, y - R * 0.12, 0, x, y, R);
    grad.addColorStop(0, rgba(theme.hole, 0.95));
    grad.addColorStop(0.16, rgba(theme.soilDark, 0.9));
    grad.addColorStop(0.55, rgba(theme.soilDark, 0.45));
    grad.addColorStop(1, rgba(theme.ground, 0));
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();

    // Inner slopes: the wall nearest the light is in shade, the far wall catches the light.
    ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.clip();
    grad = ctx.createLinearGradient(x - R, y - R, x + R, y + R);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, rgba(theme.soilLight, 0.4));
    ctx.fillStyle = grad;
    ctx.fillRect(x - R, y - R, R * 2, R * 2);
    ctx.restore();

    randomSeed(11);
    g.noFill();
    for (let k = 1; k <= 5; k++) {
      const rr = R * (k / 6);
      g.stroke(theme.soilDark[0], theme.soilDark[1], theme.soilDark[2], 26);
      g.strokeWeight(1);
      g.beginShape();
      for (let a = 0; a <= TWO_PI + 0.01; a += 0.2) {
        const wobble = 1 + (noise(k * 3 + Math.cos(a), Math.sin(a)) - 0.5) * 0.12;
        g.vertex(x + Math.cos(a) * rr * wobble, y + Math.sin(a) * rr * wobble);
      }
      g.endShape();
    }
    g.noStroke();
    for (let i = 0; i < 520; i++) {
      const a = random(TWO_PI);
      const d = R * Math.sqrt(random(0.04, 1.35));
      const slope = d < R ? -Math.cos(a - LIGHT) : Math.cos(a - LIGHT);
      const lit = constrain(0.5 + 0.35 * slope + random(-0.25, 0.25), 0, 1);
      const c = theme.soilDark.map((v, j) => lerp(v, theme.soilLight[j], lit));
      g.fill(c[0], c[1], c[2], d > R ? map(d, R, R * 1.16, 170, 30) : 150);
      g.circle(x + Math.cos(a) * d, y + Math.sin(a) * d, random(1, 2.4));
    }
    randomSeed();
  }
}
