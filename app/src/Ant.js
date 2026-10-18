import { TRAIL } from './Pheromones.js';
import { FOOD_TYPES } from './Food.js';

export const ANT = { SEARCHING: 'searching', CARRYING: 'carrying', POISONED: 'poisoned', OLD: 'old', DEAD: 'dead' };

const SENSOR_ANGLE = 0.55;   // left / right antenna sensors, in radians from the heading
const SENSOR_DIST = 14;
const TRAIL_THRESHOLD = 0.25;
const POISON_GRACE = 80;     // frames an ant keeps walking normally after eating toxic food
const POISON_FADE = 300;     // frames over which it then slows to a stop
const POISON_TINT = [92, 108, 36];
const CALLOW_TINT = [172, 120, 72];  // newly hatched ants are pale and darken as they mature
const CALLOW_FRAMES = 900;
const EMERGE_FRAMES = 40;           // a newborn grows to full size as it climbs out of the nest
const LIFESPAN = 10800;             // an ant lives 3 minutes (at 60 fps)...
const LIFESPAN_SPREAD = 3600;       // ...plus up to 1 more, so ants that appeared together don't all die together
const OLD_AGE_FADE = 300;           // then slows to a stop over 5 s and dies
const AGED_TINT = [104, 92, 80];    // old ants grey a little
const STAIN = [44, 50, 14];
const CRUSH_STAIN = [62, 32, 16];
const CRUSH_TINT = [26, 14, 6];
const STARTLE_FRAMES = 45;   // how long an ant bolts after a foot comes down nearby
const BODY_FRAMES = 1800;    // a body lies there for 30 s...
const CRUMBLE_FRAMES = 240;  // ...then crumbles away over 4 s
const WARNED = 1.5;          // toxic-trail strength that warns an ant off toxic food
const WARY_FRAMES = 600;     // how long a warned ant keeps ignoring toxic piles
const GOAL_FRAMES = 150;     // how long an ant stays set on sugar after losing its scent
const SUGAR = FOOD_TYPES.sugar.value;
const ALARM_SMELL = 0.6;     // danger-trail strength (summed around the ant) that alarms it
const ALARM_FRAMES = 300;    // how long an alarmed ant stays ready to fight
const KNEE = [1.6, 0.2, -1.6];
const FOOT = [4.2, 0.6, -4.2];

export class Ant {
  // `newborn`: just hatched (pale at first). `mixedAge`: part of the starting colony, already
  // partway through its life, so the first generation doesn't all die at once.
  constructor(location, { newborn = false, mixedAge = false } = {}) {
    this.location = location.copy();
    this.previous = location.copy();
    this.heading = random(TWO_PI);
    this.velocity = p5.Vector.fromAngle(this.heading, random(1.5, 2.5));
    this.acceleration = createVector(0, 0);
    this.wandertheta = 0;
    this.cruiseSpeed = random(1.15, 1.55);
    this.maxForce = 0.08;
    this.radius = 7;
    this.state = ANT.SEARCHING;
    this.carrying = null;     // FOOD_TYPES key while bringing food home
    this.delivered = null;    // what it last brought home
    this.trailStrength = 1;   // fades with time since leaving the nest / the food
    this.poisonAge = 0;
    this.vitality = 1;        // 1 = healthy, drains to 0 after eating toxic food
    this.wary = 0;            // frames left ignoring toxic piles after crossing a warning trail
    this.goal = 0;            // least valuable food it will settle for (raised on catching the scent of sugar)
    this.goalTimer = 0;
    this.defending = false;
    this.fleeing = false;
    this.alarmed = 0;         // frames left answering a danger trail
    this.startled = 0;        // frames left bolting from a stomp at `startleFrom`
    this.startleFrom = null;
    this.danger = 0;          // how hard it is being chased (0..1); sets the danger trail it lays
    this.face = null;         // angle to turn toward instead of the direction of travel
    this.lunge = random(TWO_PI);
    this.gait = random(TWO_PI);
    this.newborn = newborn;
    this.lifespan = LIFESPAN + random(LIFESPAN_SPREAD);
    this.age = mixedAge ? random(this.lifespan * 0.7) : 0;   // frames alive
    this.oldAge = 0;          // frames spent dying of old age
    this.cause = null;        // 'poison' or 'old' once dead
    this.deathAge = 0;
    this.stain = null;
  }
  get isDead() { return this.state === ANT.DEAD; }
  // How far a body has crumbled: 0 intact, 1 gone.
  get decay() { return this.isDead ? constrain((this.deathAge - BODY_FRAMES) / CRUMBLE_FRAMES, 0, 1) : 0; }
  get crumbling() { return this.isDead && this.deathAge >= BODY_FRAMES; }
  get crumbled() { return this.decay >= 1; }
  get canFight() { return this.state === ANT.SEARCHING || this.state === ANT.CARRYING; }

  applyForce(force, weight = 1) { if (force) this.acceleration.add(force.mult(weight)); }
  steerTo(desired) { return p5.Vector.sub(desired, this.velocity).limit(this.maxForce * this.vitality); }
  seek(target, speed = this.cruiseSpeed) { return this.steerTo(p5.Vector.sub(target, this.location).setMag(speed)); }
  arrive(target, slowRadius = 30, speed = this.cruiseSpeed) {
    const desired = p5.Vector.sub(target, this.location);
    const d = desired.mag();
    desired.setMag(d < slowRadius ? map(d, 0, slowRadius, 0.5, speed) : speed);
    return this.steerTo(desired);
  }
  // Meander: `wandertheta` is a turning rate that drifts randomly but keeps being pulled back to
  // zero, so paths bend gently from side to side instead of curling into loops.
  wander(jitter = 0.015) {
    this.wandertheta = this.wandertheta * 0.94 + random(-jitter, jitter);
    return this.steerTo(p5.Vector.fromAngle(this.heading + this.wandertheta, this.cruiseSpeed));
  }
  // Three sensors ahead of the ant; steer toward the strongest. `prefer` nudges the choice toward
  // a direction (away from the nest when heading out, toward it when bringing food home).
  followTrail(field, layer, prefer, preferWeight) {
    let best = 0, bestAngle = 0;
    for (const off of [-SENSOR_ANGLE, 0, SENSOR_ANGLE]) {
      const a = this.heading + off;
      const v = field.sample(layer, this.location.x + Math.cos(a) * SENSOR_DIST, this.location.y + Math.sin(a) * SENSOR_DIST)
        * (1 + preferWeight * Math.cos(a - prefer));
      if (v > best) { best = v; bestAngle = a; }
    }
    return best < TRAIL_THRESHOLD ? null : this.steerTo(p5.Vector.fromAngle(bestAngle, this.cruiseSpeed));
  }
  avoidTrail(field, layer) {
    const sense = off => {
      const a = this.heading + off;
      return field.sample(layer, this.location.x + Math.cos(a) * SENSOR_DIST, this.location.y + Math.sin(a) * SENSOR_DIST);
    };
    const l = sense(-SENSOR_ANGLE), c = sense(0), r = sense(SENSOR_ANGLE);
    if (Math.max(l, c, r) < TRAIL_THRESHOLD) return null;
    const turn = l > r ? SENSOR_ANGLE * 1.8 : -SENSOR_ANGLE * 1.8;
    return this.steerTo(p5.Vector.fromAngle(this.heading + turn, this.cruiseSpeed));
  }
  // The most valuable pile within smelling range (nearest among equals), ignoring piles worth less
  // than `minValue`. An ant that has crossed a strong warning trail left by poisoned ants ignores
  // toxic piles for a while.
  smellFood(foods, field, minValue) {
    if (field.sample(TRAIL.TOXIC, this.location.x, this.location.y, 4) > WARNED) this.wary = WARY_FRAMES;
    else if (this.wary > 0) this.wary--;
    let best = null, bestD = Infinity;
    for (const f of foods) {
      if (f.isEmpty || f.kind.value < minValue || (this.wary > 0 && f.isToxic)) continue;
      const d = this.location.dist(f.location);
      if (d >= f.kind.sense) continue;
      if (!best || f.kind.value > best.kind.value || (f.kind.value === best.kind.value && d < bestD)) { best = f; bestD = d; }
    }
    return best;
  }
  setOnSugar() { this.goal = SUGAR; this.goalTimer = GOAL_FRAMES; }
  // Slide around the antlion pit rather than walking into it.
  avoidPit(pit) {
    const away = p5.Vector.sub(this.location, pit.origin);
    const d = away.mag();
    const zone = pit.radius + 24;
    if (d > zone || d === 0) return null;
    away.div(d);
    const tangent = createVector(-away.y, away.x);
    if (tangent.dot(this.velocity) < 0) tangent.mult(-1);
    return this.steerTo(away.mult(map(d, pit.radius, zone, 1.4, 0.2, true)).add(tangent).setMag(this.cruiseSpeed));
  }
  // Turn back before reaching the edges of the field.
  contain(b, margin = 26) {
    const desired = this.velocity.copy();
    let near = false;
    if (this.location.x < b.left + margin) { desired.x = this.cruiseSpeed; near = true; }
    else if (this.location.x > b.right - margin) { desired.x = -this.cruiseSpeed; near = true; }
    if (this.location.y < b.top + margin) { desired.y = this.cruiseSpeed; near = true; }
    else if (this.location.y > b.bottom - margin) { desired.y = -this.cruiseSpeed; near = true; }
    return near ? this.steerTo(desired.setMag(this.cruiseSpeed)) : null;
  }
  // Run from a threat, but slide along a wall instead of pressing into it, and break out sideways
  // when cornered rather than cowering there.
  escape(threat, b, speed) {
    const p = this.location, m = 30;
    const atLeft = p.x < b.left + m, atRight = p.x > b.right - m;
    const atTop = p.y < b.top + m, atBottom = p.y > b.bottom - m;
    const away = p5.Vector.sub(p, threat);
    if ((atLeft && away.x < 0) || (atRight && away.x > 0)) away.x = 0;
    if ((atTop && away.y < 0) || (atBottom && away.y > 0)) away.y = 0;
    if (away.magSq() < 0.01) {
      // Dash along the wall that leads away from the side the threat is mostly on.
      if (Math.abs(threat.x - p.x) > Math.abs(threat.y - p.y)) away.set(0, atTop ? 1 : -1);
      else away.set(atLeft ? 1 : -1, 0);
    }
    return this.steerTo(away.setMag(speed));
  }
  // Steer away from other ants closer than `radius`.
  separate(others, radius) {
    const push = createVector(0, 0);
    for (const o of others) {
      const dx = this.location.x - o.location.x, dy = this.location.y - o.location.y, d2 = dx * dx + dy * dy;
      if (o !== this && d2 > 0 && d2 < radius * radius) { push.x += dx / d2; push.y += dy / d2; }
    }
    return push.magSq() > 0 ? this.steerTo(push.setMag(2.4)) : null;
  }
  // Ants band together against the antlion when there are enough of them; a defender that finds
  // itself without support loses its nerve. An ant the antlion is chasing lays a danger trail;
  // ants that smell it follow it back and join the fight with just one nestmate beside them.
  // Defenders close in but hold station just outside the antlion's body, facing it and darting in
  // and out, so they are never underneath it.
  reactToPredator(predator, crowd, bounds, defenders, field) {
    const wasFleeing = this.fleeing;
    this.fleeing = false;
    this.danger = 0;
    this.face = null;
    if (!predator.isOnField || !this.canFight) { this.defending = false; this.alarmed = 0; return; }
    if (this.alarmed > 0) this.alarmed--;
    if (!wasFleeing && field.sample(TRAIL.ALARM, this.location.x, this.location.y, 3) > ALARM_SMELL) this.alarmed = ALARM_FRAMES;
    const d = this.location.dist(predator.location);
    const alarmed = this.alarmed > 0;
    if (this.defending) { if (d > 230 || crowd < (alarmed ? 1 : 2)) this.defending = false; }
    else if (d < 170 && crowd >= 4) this.defending = true;
    else if (alarmed && d < 140 && crowd >= 1) this.defending = true;
    if (this.defending) {
      const reach = 1.08 + 0.14 * (0.5 + 0.5 * Math.sin(frameCount * 0.16 + this.lunge));
      this.applyForce(this.arrive(predator.stationFor(this.location, reach), 14, 2.4), 2.5);
      this.applyForce(this.separate(defenders, 14), 1.5);
      this.face = Math.atan2(predator.location.y - this.location.y, predator.location.x - this.location.x);
    } else if (d < 95) {
      this.fleeing = true;
      if (predator.isHunting) this.danger = map(d, 25, 95, 1, 0.4, true);
      this.applyForce(this.escape(predator.location, bounds, 1.9), 2.2);
    } else if (alarmed) {
      const toPredator = Math.atan2(predator.location.y - this.location.y, predator.location.x - this.location.x);
      this.applyForce(this.followTrail(field, TRAIL.ALARM, toPredator, 0.6), 2);
    }
  }
  startle(x, y) {
    if (!this.canFight) return;
    this.startled = STARTLE_FRAMES;
    this.startleFrom = createVector(x, y);
  }
  turnAround() {
    this.velocity.mult(-1);
    this.heading += PI;
    this.wandertheta = 0;
  }

  // One simulation step. Returns 'delivered', 'poisoned', 'died', 'aged' or null.
  step(world, crowd) {
    if (this.isDead) { this.deathAge++; return null; }
    this.age++;
    const { field, nest, lair, foods, predator, bounds, defenders } = world;
    let event = null;
    // Past its lifespan an ant drops whatever it carries, slows to a stop and dies of old age
    // (unless the poison gets it first).
    if (this.age > this.lifespan && this.state !== ANT.POISONED && this.state !== ANT.OLD) {
      this.state = ANT.OLD;
      this.carrying = null;
    }

    if (this.state === ANT.OLD) {
      this.oldAge++;
      this.vitality = 0.5 + 0.5 * Math.cos(PI * Math.min(1, this.oldAge / OLD_AGE_FADE));
      if (this.oldAge >= OLD_AGE_FADE) { this.die('old'); return 'aged'; }
      this.applyForce(this.wander(0.01));
    } else if (this.state === ANT.POISONED) {
      this.poisonAge++;
      const t = constrain((this.poisonAge - POISON_GRACE) / POISON_FADE, 0, 1);
      this.vitality = 0.5 + 0.5 * Math.cos(PI * t);
      if (t >= 1) { this.die('poison'); return 'died'; }
      this.applyForce(this.wander(lerp(0.06, 0.015, this.vitality)));
      this.applyForce(this.seek(nest.origin), 0.25);
    } else if (this.state === ANT.CARRYING) {
      const d = nest.distanceTo(this.location);
      if (d < 110) {
        this.applyForce(this.arrive(nest.origin), 1.5);
      } else {
        const toNest = Math.atan2(nest.origin.y - this.location.y, nest.origin.x - this.location.x);
        this.applyForce(this.followTrail(field, TRAIL.HOME, toNest, 0.5));
        this.applyForce(this.seek(nest.origin), 0.35);
        this.applyForce(this.wander(0.01), 0.35);
      }
      if (d < nest.radius) {
        event = 'delivered';
        this.delivered = this.carrying;
        this.carrying = null;
        this.state = ANT.SEARCHING;
        this.trailStrength = 1;
        this.goal = 0;
        this.turnAround();
      }
    } else {
      // Sugar is worth more than biscuit. Priorities: a sugar pile it can smell, then a sugar trail
      // (an ant on its way to biscuit changes course as soon as it crosses one), then a biscuit pile,
      // then a biscuit trail. Once on the scent of sugar it won't settle for biscuit for a while.
      if (this.goalTimer > 0 && --this.goalTimer === 0) this.goal = 0;
      const fromNest = Math.atan2(this.location.y - nest.origin.y, this.location.x - nest.origin.x);
      let food = this.smellFood(foods, field, this.goal);
      let trail = null;
      if (!food || food.kind.value < SUGAR) {
        trail = this.followTrail(field, TRAIL.SUGAR, fromNest, 0.3);
        if (trail) { this.setOnSugar(); food = null; }
      }
      if (food) {
        this.applyForce(this.arrive(food.location, 20), 1.4);
        if (this.location.dist(food.location) < food.radius + 2 && food.take(this.location)) {
          this.goal = 0;
          if (food.isToxic) {
            this.state = ANT.POISONED;
            this.poisonAge = 0;
            event = 'poisoned';
          } else {
            this.state = ANT.CARRYING;
            this.carrying = food.type;
            this.trailStrength = 1;
            this.turnAround();
          }
        }
      } else {
        if (!trail && this.goal < SUGAR) trail = this.followTrail(field, TRAIL.BISCUIT, fromNest, 0.3);
        this.applyForce(trail);
        this.applyForce(this.wander(), trail ? 0.4 : 1);
        this.applyForce(this.avoidTrail(field, TRAIL.TOXIC), 1.2);
      }
      if (nest.distanceTo(this.location) < nest.radius * 2) this.trailStrength = 1;
    }

    this.reactToPredator(predator, crowd, bounds, defenders, field);
    if (this.startled > 0) {
      this.startled--;
      this.fleeing = true;
      this.applyForce(this.escape(this.startleFrom, bounds, 2.2), 2.5);
    }
    this.applyForce(this.avoidPit(lair), 2);
    this.applyForce(this.contain(bounds), 2);
    this.move();
    if (this.defending) predator.keepOutside(this.location);
    this.keepInside(bounds, lair);
    this.layTrail(field);
    return event;
  }
  move() {
    let limit = this.defending ? 2.4 : this.fleeing ? 1.9 : this.cruiseSpeed;
    limit *= this.vitality;
    this.velocity.add(this.acceleration).limit(limit);
    this.acceleration.mult(0);
    this.previous.set(this.location);
    this.location.add(this.velocity);
    const speed = this.velocity.mag();
    // Turn toward `face` when set; otherwise follow the direction of travel, but only while actually
    // moving, so a near-still ant can't spin in place.
    if (this.face !== null) this.heading += constrain(Math.atan2(Math.sin(this.face - this.heading), Math.cos(this.face - this.heading)), -0.15, 0.15);
    else if (speed > 0.15) this.heading = this.velocity.heading();
    this.gait += speed * 0.4;
  }
  // Hard limits: stay on the field and out of the antlion pit.
  keepInside(b, pit) {
    const r = this.radius, p = this.location, v = this.velocity;
    if (p.x < b.left + r) { p.x = b.left + r; v.x = Math.abs(v.x); }
    else if (p.x > b.right - r) { p.x = b.right - r; v.x = -Math.abs(v.x); }
    if (p.y < b.top + r) { p.y = b.top + r; v.y = Math.abs(v.y); }
    else if (p.y > b.bottom - r) { p.y = b.bottom - r; v.y = -Math.abs(v.y); }
    const out = p5.Vector.sub(p, pit.origin);
    if (out.mag() < pit.radius) {
      if (out.magSq() === 0) out.set(1, 0);
      p.set(p5.Vector.add(pit.origin, out.setMag(pit.radius)));
    }
  }
  // Searching ants mark the way home, ants carrying food mark the way to that kind of food, poisoned
  // ants leave a warning trail. The pheromone is laid along the centre line of the body.
  layTrail(field) {
    if (this.state === ANT.OLD) return;
    const layer = this.state === ANT.SEARCHING ? TRAIL.HOME
      : this.state === ANT.CARRYING ? (this.carrying === 'sugar' ? TRAIL.SUGAR : TRAIL.BISCUIT)
      : TRAIL.TOXIC;
    const amount = this.state === ANT.POISONED ? 0.35 + 0.65 * this.vitality : 0.3 + 0.7 * this.trailStrength;
    field.depositLine(layer, this.previous, this.location, amount);
    if (this.danger > 0) field.depositDisc(TRAIL.ALARM, this.location.x, this.location.y, 5, this.danger);
    this.trailStrength *= 0.9975;
  }
  // Poisoned ants leave a spreading stain and crushed ants a small smear; ants that die of old age
  // just lie where they stopped.
  die(cause) {
    this.state = ANT.DEAD;
    this.cause = cause;
    this.vitality = 0;
    this.velocity.mult(0);
    this.defending = false;
    if (cause === 'poison') {
      this.stain = [{ x: 0, y: 0, r: 18 }, ...Array.from({ length: 4 }, () => ({ x: random(-5, 5), y: random(-5, 5), r: random(10, 20) }))];
    } else if (cause === 'crushed') {
      this.stain = [{ x: 0, y: 0, r: 12 }, ...Array.from({ length: 3 }, () => ({ x: random(-4, 4), y: random(-4, 4), r: random(6, 11) }))];
    }
    // Specks the body breaks into when it crumbles.
    this.dust = Array.from({ length: 8 }, () => ({ x: random(-6, 5), y: random(-3, 3), dx: random(-1, 1), dy: random(-1, 1), r: random(0.8, 1.7) }));
  }

  // `pg` is where to draw: the main canvas by default, or an offscreen layer.
  displayStain(pg = window) {
    if (!this.stain) return;
    const crushed = this.cause === 'crushed';
    const grow = 1 - Math.pow(1 - Math.min(1, this.deathAge / (crushed ? 6 : 150)), 2);
    const c = crushed ? CRUSH_STAIN : STAIN;
    pg.noStroke();
    // Each blob is a few stacked discs, which gives it a soft, soaked-in edge.
    pg.fill(c[0], c[1], c[2], (crushed ? 22 : 14) * (1 - this.decay));
    for (const s of this.stain) {
      for (let k = 1; k >= 0.4; k -= 0.2) pg.circle(this.location.x + s.x * grow, this.location.y + s.y * grow, s.r * grow * k);
    }
  }
  display(theme, pg = window) {
    const dead = this.isDead;
    let [r, g, b] = theme.ant;
    if (this.newborn && this.age < CALLOW_FRAMES) {
      const k = 1 - this.age / CALLOW_FRAMES;
      r = lerp(r, CALLOW_TINT[0], k); g = lerp(g, CALLOW_TINT[1], k); b = lerp(b, CALLOW_TINT[2], k);
    }
    const poisoned = this.state === ANT.POISONED || this.cause === 'poison';
    const crushed = this.cause === 'crushed';
    if (crushed) {
      r = lerp(r, CRUSH_TINT[0], 0.4); g = lerp(g, CRUSH_TINT[1], 0.4); b = lerp(b, CRUSH_TINT[2], 0.4);
    } else if (poisoned || this.state === ANT.OLD || this.cause === 'old') {
      const tint = poisoned ? POISON_TINT : AGED_TINT;
      const k = (dead ? 1 : 1 - this.vitality) * (poisoned ? 0.35 : 0.4);
      r = lerp(r, tint[0], k); g = lerp(g, tint[1], k); b = lerp(b, tint[2], k);
    }
    pg.push();
    pg.translate(this.location.x, this.location.y);
    pg.rotate(this.heading);
    if (this.newborn && this.age < EMERGE_FRAMES) pg.scale(lerp(0.4, 1, this.age / EMERGE_FRAMES));
    // A crumbling body fades and shrinks as it breaks into dust.
    const decay = this.decay, alpha = 255 * (1 - decay);
    if (decay > 0) pg.scale(lerp(1, 0.7, decay));
    pg.stroke(r, g, b, alpha);
    pg.strokeWeight(0.7);
    const swing = dead ? 0 : Math.min(1, this.velocity.mag() / 1.5) * 1.3;
    for (let side = -1; side <= 1; side += 2) {
      for (let k = 0; k < 3; k++) {
        const hipX = 2 - k * 1.1;
        let kx, ky, fx, fy;
        if (crushed) {
          // Flattened: legs splayed out flat.
          kx = hipX + KNEE[k] * 1.3; ky = side * 3.8; fx = hipX + FOOT[k] * 1.35; fy = side * 6;
        } else if (dead) {
          kx = hipX + KNEE[k] * 0.6; ky = side * 2.6; fx = hipX + KNEE[k] * 0.2; fy = side * 1.6;
        } else {
          // Tripod gait: front and back legs of one side move with the middle leg of the other.
          const s = Math.sin(this.gait + (k % 2 ? PI : 0) + (side > 0 ? PI : 0)) * swing;
          kx = hipX + KNEE[k] + s * 0.4; ky = side * 3.1; fx = hipX + FOOT[k] + s; fy = side * 5.2;
        }
        pg.line(hipX, side * 0.8, kx, ky);
        pg.line(kx, ky, fx, fy);
      }
      const tw = crushed ? 1.2 : dead ? -0.6 : Math.sin(this.gait * 0.7 + side) * 0.4;
      pg.line(6.2, side * 0.8, 8.6, side * (2.6 + tw));
      pg.line(8.6, side * (2.6 + tw), 10.4, side * (2.1 + tw));
    }
    pg.noStroke();
    if (decay > 0) {
      pg.noStroke();
      pg.fill(lerp(r, 150, 0.5), lerp(g, 120, 0.5), lerp(b, 90, 0.5), 200 * (1 - decay));
      for (const d of this.dust) pg.circle(d.x + d.dx * decay * 8, d.y + d.dy * decay * 8, d.r);
    }
    pg.fill(r, g, b, alpha);
    if (crushed) pg.scale(0.95, 1.4);
    pg.ellipse(-4.4, 0, 6.8, 4.8);   // gaster
    pg.ellipse(-0.6, 0, 1.8, 1.4);   // petiole
    pg.ellipse(1.6, 0, 4.2, 2.6);    // thorax
    pg.ellipse(5.1, 0, 3.8, 3.6);    // head
    pg.fill(255, 255, 255, 34 * (1 - decay));
    pg.ellipse(-5, -1, 2.6, 1.3);
    pg.ellipse(5.4, -0.7, 1.6, 1);
    if (this.carrying) {
      const c = FOOD_TYPES[this.carrying];
      pg.fill(...c.fill);
      pg.stroke(...c.edge);
      pg.strokeWeight(0.4);
      pg.rectMode(CENTER);
      pg.rect(8.4, 0, 3.4, 3.4, 0.6);
    }
    pg.pop();
  }
}
