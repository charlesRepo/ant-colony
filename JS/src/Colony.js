import { Ant } from './Ant.js';
import { MAX_ANTS } from './config.js';

const SWARM_SIZE = 5;          // defenders on the antlion that make it retreat
const SWARM_HIDE_FRAMES = 420;
const SPACING = 9;             // closest two ants fighting the antlion may stand
const BIRTH_FRAMES = [240, 840]; // a new ant hatches every 4-14 seconds, at random

export class Colony {
  constructor(nest) {
    this.nest = nest;
    this.ants = [];
    this.stats = { stored: 0, born: 0, poisoned: 0, eaten: 0 };
    this.nextBirth = random(...BIRTH_FRAMES);
  }
  get alive() { return this.ants.reduce((n, a) => n + (a.isDead ? 0 : 1), 0); }
  // Add up to `count` ants at the nest without going over MAX_ANTS living ants.
  spawn(count, newborn = false) {
    const n = Math.min(count, MAX_ANTS - this.alive);
    for (let i = 0; i < n; i++) {
      this.ants.push(new Ant(p5.Vector.add(this.nest.origin, p5.Vector.random2D().mult(random(this.nest.radius))), newborn));
    }
    return n;
  }
  // The colony keeps raising new ants at random intervals, even after losing all its foragers.
  breed() {
    if (--this.nextBirth > 0) return;
    this.nextBirth = random(...BIRTH_FRAMES);
    this.stats.born += this.spawn(1, true);
  }
  run(world) {
    const { predator } = world;
    this.breed();
    const defenders = this.ants.filter(a => a.defending);
    for (const a of this.ants) {
      const crowd = predator.isOnField && a.canFight ? this.neighbours(a, 50) : 0;
      const event = a.step({ ...world, defenders }, crowd);
      if (event === 'delivered') this.stats.stored++;
      else if (event === 'poisoned') this.stats.poisoned++;
    }
    if (predator.isOnField) this.spaceOut(world);
    if (predator.isHunting) this.feed(predator);
  }
  // Ants fighting the antlion crowd around it; push apart any that overlap, then put them back
  // outside its body and inside the field.
  spaceOut({ predator, bounds, lair }) {
    const fighters = this.ants.filter(a => a.defending);
    for (let i = 0; i < fighters.length; i++) {
      for (let j = i + 1; j < fighters.length; j++) {
        const a = fighters[i].location, b = fighters[j].location;
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
        if (d > 0 && d < SPACING) {
          const k = (SPACING - d) / d / 2;
          a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k;
        }
      }
    }
    for (const a of fighters) {
      predator.keepOutside(a.location);
      a.keepInside(bounds, lair);
    }
  }
  neighbours(ant, radius) {
    let n = 0;
    for (const o of this.ants) {
      if (o !== ant && o.canFight && Math.abs(o.location.x - ant.location.x) < radius && ant.location.dist(o.location) < radius) n++;
    }
    return n;
  }
  // The antlion eats any ant its jaws close on (dead bodies included), unless the ant is fighting
  // back; enough defenders on it at once drive it back into its pit.
  feed(predator) {
    let defenders = 0;
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      if (a.defending) {
        if (predator.bodyDistance(a.location) < 1.4) defenders++;
      } else if (predator.chew === 0 && predator.canBite(a.location)) {
        this.ants.splice(i, 1);
        this.stats.eaten++;
        predator.ate();
      }
    }
    if (defenders >= SWARM_SIZE) predator.retreat(SWARM_HIDE_FRAMES);
  }
  displayStains() { for (const a of this.ants) if (a.isDead) a.displayStain(); }
  display(theme) {
    for (const a of this.ants) if (a.isDead) a.display(theme);
    for (const a of this.ants) if (!a.isDead && !a.defending) a.display(theme);
  }
  // Drawn after the antlion so the ants attacking it are never hidden by it.
  displayDefenders(theme) { for (const a of this.ants) if (a.defending) a.display(theme); }
}
