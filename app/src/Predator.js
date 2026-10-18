// The predator is an antlion larva. It waits in its sand pit, climbs out to hunt when enabled,
// and retreats into the pit when it is switched off or a swarm of ants drives it back.
export const PREDATOR = { HIDDEN: 'hidden', EMERGING: 'emerging', HUNTING: 'hunting', RETREATING: 'retreating' };

const BODY = [148, 110, 68];
const BODY_DARK = [88, 62, 36];
const BODY_LIGHT = [198, 166, 120];
const BRISTLE = [52, 36, 22];
const LEG = [192, 158, 108];
const JAW_BASE = [198, 130, 60];
const JAW_TIP = [84, 36, 16];
const SCALE = 1.15;
const BODY_REACH = [40, 24]; // half-length and half-width of the zone ants keep out of (jaws and legs included)
const CHASE_LIMIT = 600;   // frames spent on one ant before giving up on it
const IGNORE_FRAMES = 300;
const MEAL_LIMIT = 10;      // eating more than this many ants...
const MEAL_WINDOW = 3600;   // ...within a minute fills it up...
const REST_FRAMES = 1800;   // ...and it goes home to rest for 30 s

// Abdomen outline (local coordinates, +x is forward), smoothed through Catmull-Rom.
const ABDOMEN_KEYS = [[1, 0], [-1, 6.5], [-6, 10.5], [-12, 11.5], [-18, 9], [-23, 4.5], [-26, 0],
  [-23, -4.5], [-18, -9], [-12, -11.5], [-6, -10.5], [-1, -6.5]];
const LEGS = [ // hip, knee, foot for the y > 0 side
  { hip: [8, 2.8], knee: [12.5, 8.5], foot: [17, 11] },
  { hip: [5, 4.2], knee: [5, 11], foot: [3, 15] },
  { hip: [2, 4.6], knee: [-2, 10.5], foot: [-8, 13.5] },
];

function abdomenOutline() {
  const n = ABDOMEN_KEYS.length, pts = [];
  for (let i = 0; i < n; i++) {
    const [a, b, c, d] = [-1, 0, 1, 2].map(k => ABDOMEN_KEYS[(i + k + n) % n]);
    for (let t = 0; t < 1; t += 0.25) pts.push([curvePoint(a[0], b[0], c[0], d[0], t), curvePoint(a[1], b[1], c[1], d[1], t)]);
  }
  return pts;
}
// Half-width of the abdomen at local x, from the upper half of the key points.
function abdomenHalfWidth(x) {
  const top = ABDOMEN_KEYS.slice(0, 7);
  for (let i = 0; i < top.length - 1; i++) {
    const [x0, y0] = top[i], [x1, y1] = top[i + 1];
    if (x <= x0 && x >= x1) return map(x, x0, x1, y0, y1);
  }
  return 0;
}

export class Predator {
  constructor(lair) {
    this.lair = lair;
    this.location = lair.origin.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.heading = random(TWO_PI);
    this.wandertheta = 0;
    this.maxForce = 0.08;
    this.radius = 30;
    this.state = PREDATOR.HIDDEN;
    this.enabled = false;
    this.hideTimer = 0;
    this.chew = 0;
    this.prey = null;
    this.chaseTime = 0;
    this.ignored = null;     // an ant it recently gave up on
    this.ignoreTimer = 0;
    this.meals = [];         // frameCount of each recent meal
    this.full = false;       // resting off a big meal
    this.jaw = 0.4;
    this.jawTarget = 0.4;
    this.gait = 0;
    // Fixed random details so the texture doesn't flicker from frame to frame.
    this.outline = abdomenOutline();
    this.bristles = [];
    this.outline.forEach(([x, y], i) => {
      const [px, py] = this.outline[(i + this.outline.length - 1) % this.outline.length];
      const [nx, ny] = this.outline[(i + 1) % this.outline.length];
      const normal = Math.atan2(-(nx - px), ny - py);
      for (let k = 0; k < 2; k++) this.bristles.push({ x, y, a: normal + random(-0.5, 0.5), len: random(2, 4.2) });
    });
    this.speckles = [];
    while (this.speckles.length < 110) {
      const x = random(-25, 0), y = random(-11, 11);
      if (Math.abs(y) < abdomenHalfWidth(x) * 0.88) this.speckles.push({ x, y, r: random(0.6, 1.6), light: random() < 0.22 });
    }
  }
  get isOnField() { return this.state !== PREDATOR.HIDDEN; }
  get isHunting() { return this.state === PREDATOR.HUNTING; }
  // `p` in the antlion's own frame: x along its heading, y to its side.
  toLocal(p) {
    const dx = p.x - this.location.x, dy = p.y - this.location.y;
    const cos = Math.cos(this.heading), sin = Math.sin(this.heading);
    return [dx * cos + dy * sin, -dx * sin + dy * cos];
  }
  // 1 on the edge of the zone around the body, below 1 inside it.
  bodyDistance(p) {
    const [x, y] = this.toLocal(p);
    return Math.hypot(x / BODY_REACH[0], y / BODY_REACH[1]);
  }
  // The point `reach` times the zone's edge out from the centre, on the line through `p`.
  stationFor(p, reach) {
    let [x, y] = this.toLocal(p);
    const e = Math.hypot(x / BODY_REACH[0], y / BODY_REACH[1]);
    if (e < 1e-6) { x = -BODY_REACH[0]; y = 0; } else { x *= 1 / e; y *= 1 / e; }
    const cos = Math.cos(this.heading), sin = Math.sin(this.heading);
    return createVector(this.location.x + (x * cos - y * sin) * reach, this.location.y + (x * sin + y * cos) * reach);
  }
  keepOutside(p) { if (this.bodyDistance(p) < 1) p.set(this.stationFor(p, 1)); }
  // Anything touching the head or jaws (from the head to the jaw tips) can be caught.
  canBite(p) {
    const cos = Math.cos(this.heading), sin = Math.sin(this.heading);
    const along = constrain((p.x - this.location.x) * cos + (p.y - this.location.y) * sin, 10 * SCALE, 25 * SCALE);
    return dist(p.x, p.y, this.location.x + cos * along, this.location.y + sin * along) < 10;
  }
  get status() {
    if (!this.enabled) return this.isOnField ? 'Heading back to its pit' : 'Asleep in its pit';
    switch (this.state) {
      case PREDATOR.HIDDEN: return this.full ? 'Full, resting in its pit' : 'Hiding after a fight';
      case PREDATOR.EMERGING: return 'Climbing out of its pit';
      case PREDATOR.RETREATING: return this.full ? 'Full, going home to rest' : 'Driven back by ants';
      default: return this.prey ? 'Chasing an ant' : 'Prowling for ants';
    }
  }
  setEnabled(on) {
    this.enabled = on;
    if (on && this.state === PREDATOR.HIDDEN && !this.full) this.hideTimer = 0;
    if (!on && this.isOnField) this.retreat(0);
  }
  retreat(hideFrames) {
    this.state = PREDATOR.RETREATING;
    this.hideTimer = hideFrames;
    this.prey = null;
  }
  ate() {
    this.chew = 40;
    this.meals = this.meals.filter(t => frameCount - t < MEAL_WINDOW);
    this.meals.push(frameCount);
    if (this.meals.length > MEAL_LIMIT) {
      this.full = true;
      this.meals = [];
      this.retreat(REST_FRAMES);
    }
  }

  applyForce(force, weight = 1) { if (force) this.acceleration.add(force.mult(weight)); }
  steerTo(desired) { return p5.Vector.sub(desired, this.velocity).limit(this.maxForce); }
  seek(target, speed) { return this.steerTo(p5.Vector.sub(target, this.location).setMag(speed)); }
  arrive(target, slowRadius, speed) {
    const desired = p5.Vector.sub(target, this.location);
    const d = desired.mag();
    desired.setMag(d < slowRadius ? map(d, 0, slowRadius, 0.4, speed) : speed);
    return this.steerTo(desired);
  }
  // Same meander as the ants: a drifting turning rate that keeps being pulled back to zero.
  wander() {
    this.wandertheta = this.wandertheta * 0.95 + random(-0.012, 0.012);
    return this.steerTo(p5.Vector.fromAngle(this.heading + this.wandertheta, 1.1));
  }
  contain(b, margin = 60) {
    const desired = this.velocity.copy();
    let near = false;
    if (this.location.x < b.left + margin) { desired.x = 2; near = true; }
    else if (this.location.x > b.right - margin) { desired.x = -2; near = true; }
    if (this.location.y < b.top + margin) { desired.y = 2; near = true; }
    else if (this.location.y > b.bottom - margin) { desired.y = -2; near = true; }
    return near ? this.steerTo(desired.setMag(2)) : null;
  }

  update(ants, bounds) {
    const lair = this.lair;
    switch (this.state) {
      case PREDATOR.HIDDEN:
        if (this.enabled && --this.hideTimer <= 0) {
          this.full = false;
          // Climb out the way its jaws were already pointing.
          this.state = PREDATOR.EMERGING;
          this.location.set(lair.origin);
          this.velocity = p5.Vector.fromAngle(this.heading, 0.6);
        }
        break;
      case PREDATOR.EMERGING:
        // Climb straight out of the funnel, then start hunting.
        this.location.add(this.velocity);
        this.gait += 0.2;
        if (lair.distanceTo(this.location) > lair.radius) this.state = PREDATOR.HUNTING;
        break;
      case PREDATOR.HUNTING:
        this.hunt(ants, bounds);
        break;
      case PREDATOR.RETREATING:
        this.applyForce(this.arrive(lair.origin, 60, 2), 2);
        this.move(2);
        // Settle into the pit as soon as it is at the bottom; no more steering, so no spinning.
        if (lair.distanceTo(this.location) < 4) {
          this.state = PREDATOR.HIDDEN;
          this.location.set(lair.origin);
          this.velocity.mult(0);
        }
        break;
    }
    if (this.isOnField) this.keepInside(bounds);
  }
  hunt(ants, bounds) {
    if (this.chew > 0) this.chew--;
    if (this.ignoreTimer > 0 && --this.ignoreTimer === 0) this.ignored = null;
    let prey = null, best = 300;
    for (const a of ants) {
      if (a.isDead || a.defending || a === this.ignored) continue;
      const d = this.location.dist(a.location);
      if (d < best) { best = d; prey = a; }
    }
    // Give up on an ant it can't catch, so no standoff can hold it in place.
    this.chaseTime = prey && prey === this.prey ? this.chaseTime + 1 : 0;
    if (this.chaseTime > CHASE_LIMIT) {
      this.ignored = prey;
      this.ignoreTimer = IGNORE_FRAMES;
      this.chaseTime = 0;
      prey = null;
    }
    this.prey = prey;
    const chasing = prey && this.chew === 0;
    if (chasing) {
      // No wall avoidance while chasing: it may press right up to the edge (keepInside stops it)
      // so it can reach ants hiding along a wall or in a corner.
      this.applyForce(this.seek(prey.location, 2.1), 1.2);
    } else {
      this.applyForce(this.wander());
      this.applyForce(this.contain(bounds), 2);
    }
    // Close to its prey it aims its jaws at it, even when pinned against a wall.
    const face = chasing && best < 80 ? Math.atan2(prey.location.y - this.location.y, prey.location.x - this.location.x) : null;
    this.move(this.chew > 0 ? 0.4 : prey ? 2.1 : 1.1, face);
    this.jawTarget = this.chew > 0 ? 0 : prey && best < 80 ? 1 : 0.35;
  }
  // Turn the body at a limited rate: toward `face` if given, otherwise toward the direction of
  // travel, and only while actually moving.
  move(limit, face = null) {
    this.velocity.add(this.acceleration).limit(limit);
    this.acceleration.mult(0);
    this.location.add(this.velocity);
    const speed = this.velocity.mag();
    const target = face ?? (speed > 0.25 ? this.velocity.heading() : null);
    if (target !== null) {
      const turn = Math.atan2(Math.sin(target - this.heading), Math.cos(target - this.heading));
      this.heading += constrain(turn, -0.08, 0.08);
    }
    this.gait += speed * 0.3;
  }
  // Stop at the edges (no bounce), so it can press into a wall or corner while chasing.
  keepInside(b) {
    const r = this.radius, p = this.location, v = this.velocity;
    if (p.x < b.left + r) { p.x = b.left + r; v.x = Math.max(v.x, 0); }
    else if (p.x > b.right - r) { p.x = b.right - r; v.x = Math.min(v.x, 0); }
    if (p.y < b.top + r) { p.y = b.top + r; v.y = Math.max(v.y, 0); }
    else if (p.y > b.bottom - r) { p.y = b.bottom - r; v.y = Math.min(v.y, 0); }
  }

  display() {
    if (this.state === PREDATOR.HIDDEN) { this.displayPeek(); return; }
    this.jaw = lerp(this.jaw, this.isHunting ? this.jawTarget : 0.4, 0.15);
    // Fade in and out while climbing up or down the funnel.
    const depth = Math.min(1, this.lair.distanceTo(this.location) / (this.lair.radius * 0.6));
    const alpha = this.isHunting ? 1 : depth;
    push();
    translate(this.location.x + 3, this.location.y + 4);
    rotate(this.heading);
    scale(SCALE);
    noStroke();
    fill(0, 0, 0, 45 * alpha);
    ellipse(-6, 0, 44, 28);
    pop();
    push();
    translate(this.location.x, this.location.y);
    rotate(this.heading);
    scale(SCALE * lerp(0.8, 1, alpha));
    this.drawBody(alpha * 255);
    pop();
  }
  // While in its pit only the tips of the jaws show above the sand.
  displayPeek() {
    push();
    translate(this.lair.origin.x, this.lair.origin.y);
    rotate(this.heading);
    scale(SCALE);
    noStroke();
    fill(BODY_DARK[0], BODY_DARK[1], BODY_DARK[2], 200);
    ellipse(-1, 0, 8, 9);
    this.drawJaws(0.55 + 0.3 * Math.sin(frameCount * 0.02), 220, -12);
    pop();
  }
  drawBody(a) {
    this.drawLegs(a);
    strokeWeight(0.6);
    for (const b of this.bristles) {
      stroke(BRISTLE[0], BRISTLE[1], BRISTLE[2], a * 0.85);
      line(b.x, b.y, b.x + Math.cos(b.a) * b.len, b.y + Math.sin(b.a) * b.len);
    }
    noStroke();
    fill(BODY[0], BODY[1], BODY[2], a);
    beginShape();
    for (const [x, y] of this.outline) vertex(x, y);
    endShape(CLOSE);
    fill(BODY_LIGHT[0], BODY_LIGHT[1], BODY_LIGHT[2], a * 0.18);
    ellipse(-12, 0, 22, 8);
    noFill();
    stroke(BODY_DARK[0], BODY_DARK[1], BODY_DARK[2], a * 0.5);
    strokeWeight(0.8);
    for (const x of [-4, -8.5, -13, -17.5, -21.5]) {
      const w = abdomenHalfWidth(x) * 0.92;
      bezier(x, -w, x - 3, -w * 0.4, x - 3, w * 0.4, x, w);
    }
    noStroke();
    for (const s of this.speckles) {
      const c = s.light ? BODY_LIGHT : BODY_DARK;
      fill(c[0], c[1], c[2], a * 0.8);
      circle(s.x, s.y, s.r);
    }
    // thorax and head
    fill(BODY[0] - 16, BODY[1] - 16, BODY[2] - 12, a);
    ellipse(5, 0, 10, 10);
    stroke(BRISTLE[0], BRISTLE[1], BRISTLE[2], a * 0.7);
    strokeWeight(0.5);
    for (let k = -2; k <= 2; k++) { line(4 + k, -5, 4 + k * 1.3, -7); line(4 + k, 5, 4 + k * 1.3, 7); }
    noStroke();
    fill(BODY[0] - 8, BODY[1] - 12, BODY[2] - 12, a);
    ellipse(11.5, 0, 7.5, 8.5);
    fill(30, 20, 12, a);
    circle(12.5, -3.6, 1.4);
    circle(12.5, 3.6, 1.4);
    this.drawJaws(this.jaw, a, 0);
  }
  drawLegs(a) {
    const moving = this.velocity.mag() > 0.1 || this.state === PREDATOR.EMERGING;
    for (let side = -1; side <= 1; side += 2) {
      LEGS.forEach((leg, k) => {
        const s = moving ? Math.sin(this.gait + (k % 2 ? PI : 0) + (side > 0 ? PI : 0)) * 2 : 0;
        const [hx, hy] = leg.hip, [kx, ky] = leg.knee, [fx, fy] = leg.foot;
        stroke(LEG[0], LEG[1], LEG[2], a);
        strokeWeight(1.6);
        line(hx, side * hy, kx + s * 0.5, side * ky);
        strokeWeight(1.1);
        line(kx + s * 0.5, side * ky, fx + s, side * fy);
        noStroke();
        fill(BODY_DARK[0], BODY_DARK[1], BODY_DARK[2], a);
        circle(kx + s * 0.5, side * ky, 1.8);
      });
    }
  }
  // Sickle jaws, thick and pale at the base, dark and fine at the curled tips.
  drawJaws(open, a, offsetX) {
    for (let side = -1; side <= 1; side += 2) {
      const p = [[14.5, 2.4], [19, 6 + open], [27, 6 + 2 * open], [29.5, 1.2 + 3.4 * open]]
        .map(([x, y]) => [x + offsetX, side * y]);
      const at = t => [bezierPoint(p[0][0], p[1][0], p[2][0], p[3][0], t), bezierPoint(p[0][1], p[1][1], p[2][1], p[3][1], t)];
      let prev = at(0);
      for (let i = 1; i <= 12; i++) {
        const t = i / 12, cur = at(t);
        stroke(lerp(JAW_BASE[0], JAW_TIP[0], t * t), lerp(JAW_BASE[1], JAW_TIP[1], t * t), lerp(JAW_BASE[2], JAW_TIP[2], t * t), a);
        strokeWeight(lerp(2.6, 0.8, t));
        line(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
      strokeWeight(0.7);
      stroke(JAW_TIP[0], JAW_TIP[1], JAW_TIP[2], a);
      for (const t of [0.45, 0.65]) {
        const [x, y] = at(t);
        line(x, y, x + 1.2, y - side * 2);
      }
    }
  }
}
