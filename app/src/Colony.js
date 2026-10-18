import { Ant } from './Ant.js';
import { MAX_ANTS } from './config.js';
import { FOOD_TYPES } from './Food.js';
import { TRAIL } from './Pheromones.js';

const SWARM_SIZE = 5;          // defenders on the antlion that make it retreat
const SWARM_HIDE_FRAMES = 420;
const SPACING = 9;             // closest two ants fighting the antlion may stand
// Hatching: with an empty nest a new ant hatches every 3-9 s, at random, which holds an unfed colony
// near its starting size. Food brought home goes into a reserve (sugar counts double); the bigger
// the reserve, the more often ants hatch and the more hatch at once. Newborns eat from the reserve,
// so the boom fades once food stops coming in.
const BIRTH_FRAMES = [180, 540];
const RESERVE_PER_SPEEDUP = 8;  // each 8 units in reserve adds the base hatching rate again...
const MAX_SPEEDUP = 6;          // ...up to 6x as often
const RESERVE_PER_EXTRA = 10;   // each 10 units in reserve adds one more ant per hatching...
const MAX_BROOD = 5;            // ...up to 5 at once
const NEWBORN_MEAL = 1.5;       // reserve each newborn eats
const MAX_RESERVE = 60;
const SETTLED_FRAMES = 150;     // by then a body's stain has stopped spreading

export class Colony {
  constructor(nest) {
    this.nest = nest;
    this.ants = [];
    this.stats = { stored: 0, born: 0, aged: 0, poisoned: 0, eaten: 0, crushed: 0 };
    this.reserve = 0;
    this.birthWait = random(...BIRTH_FRAMES);
    this.birthProgress = 0;
    this.corpses = null;           // offscreen layer holding settled bodies
    this.baked = new Set();        // bodies already drawn into it
    this.corpsesTheme = null;
    this.corpsesDirty = false;
  }
  dispose() { if (this.corpses) this.corpses.remove(); }
  get alive() { return this.ants.reduce((n, a) => n + (a.isDead ? 0 : 1), 0); }
  // Add up to `count` ants at the nest without going over MAX_ANTS living ants. `options` are
  // passed to each Ant ({ newborn } for hatchlings, { mixedAge } for the starting colony).
  spawn(count, options = {}) {
    const n = Math.min(count, MAX_ANTS - this.alive);
    for (let i = 0; i < n; i++) {
      this.ants.push(new Ant(p5.Vector.add(this.nest.origin, p5.Vector.random2D().mult(random(this.nest.radius))), options));
    }
    return n;
  }
  get speedup() { return Math.min(MAX_SPEEDUP, 1 + this.reserve / RESERVE_PER_SPEEDUP); }
  get broodSize() { return Math.min(MAX_BROOD, 1 + Math.floor(this.reserve / RESERVE_PER_EXTRA)); }
  // Expected hatching for the panel: how many ants at a time, and about how often (seconds).
  get hatchRate() {
    return { brood: this.broodSize, every: (BIRTH_FRAMES[0] + BIRTH_FRAMES[1]) / 2 / this.speedup / 60 };
  }
  // The colony keeps raising new ants at random intervals, even after losing all its foragers.
  // Progress runs faster with a bigger reserve, so new food speeds up the very next hatching.
  breed() {
    this.birthProgress += this.speedup / this.birthWait;
    if (this.birthProgress < 1) return;
    this.birthProgress = 0;
    this.birthWait = random(...BIRTH_FRAMES);
    const born = this.spawn(this.broodSize, { newborn: true });
    this.stats.born += born;
    this.reserve = Math.max(0, this.reserve - born * NEWBORN_MEAL);
  }
  run(world) {
    const { predator } = world;
    this.breed();
    const defenders = this.ants.filter(a => a.defending);
    for (const a of this.ants) {
      const crowd = predator.isOnField && a.canFight ? this.neighbours(a, 50) : 0;
      const event = a.step({ ...world, defenders }, crowd);
      if (event === 'delivered') {
        this.stats.stored++;
        this.reserve = Math.min(MAX_RESERVE, this.reserve + FOOD_TYPES[a.delivered].value);
      }
      else if (event === 'poisoned') this.stats.poisoned++;
      else if (event === 'aged') this.stats.aged++;
    }
    if (predator.isOnField) this.spaceOut(world);
    if (predator.isHunting) this.feed(predator, world.field);
    // Bodies that have crumbled away are gone.
    if (this.ants.some(a => a.crumbled)) this.ants = this.ants.filter(a => !a.crumbled);
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
  // A foot comes down at (x, y): living ants under it die, ants nearby bolt. Returns how many died.
  crush(x, y, radius, startleRadius) {
    let crushed = 0;
    for (const a of this.ants) {
      if (a.isDead) continue;
      const d = dist(x, y, a.location.x, a.location.y);
      if (d < radius) { a.die('crushed'); crushed++; }
      else if (d < startleRadius) a.startle(x, y);
    }
    this.stats.crushed += crushed;
    return crushed;
  }
  // The antlion eats any ant its jaws close on (dead bodies included), unless the ant is fighting
  // back; enough defenders on it at once drive it back into its pit.
  feed(predator, field) {
    let defenders = 0;
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      if (a.defending) {
        if (predator.bodyDistance(a.location) < 1.4) defenders++;
      } else if (predator.chew === 0 && predator.canBite(a.location)) {
        this.ants.splice(i, 1);
        if (this.baked.delete(a)) this.corpsesDirty = true;
        this.stats.eaten++;
        if (!a.isDead) field.depositDisc(TRAIL.ALARM, a.location.x, a.location.y, 22, 1);
        predator.ate();
      }
    }
    if (defenders >= SWARM_SIZE) predator.retreat(SWARM_HIDE_FRAMES);
  }
  // Bodies never move, so once settled each is drawn once into an offscreen layer instead of every
  // frame; the layer is only redrawn when a body is eaten, starts crumbling, or the palette changes.
  displayGround(theme) {
    // A body that starts crumbling leaves the layer and is drawn live while it fades.
    for (const a of this.baked) if (a.crumbling) { this.baked.delete(a); this.corpsesDirty = true; }
    if (this.corpses && (this.corpsesTheme !== theme || this.corpsesDirty)) {
      this.corpses.clear();
      for (const a of this.baked) a.displayStain(this.corpses);
      for (const a of this.baked) a.display(theme, this.corpses);
      this.corpsesDirty = false;
    }
    this.corpsesTheme = theme;
    for (const a of this.ants) {
      if (!a.isDead || this.baked.has(a)) continue;
      if (a.deathAge < SETTLED_FRAMES || a.crumbling) { a.displayStain(); continue; }
      if (!this.corpses) this.corpses = createGraphics(width, height);
      a.displayStain(this.corpses);
      a.display(theme, this.corpses);
      this.baked.add(a);
    }
    if (this.corpses) image(this.corpses, 0, 0);
  }
  display(theme) {
    for (const a of this.ants) if (a.isDead && !this.baked.has(a)) a.display(theme);
    for (const a of this.ants) if (!a.isDead && !a.defending) a.display(theme);
  }
  // Drawn after the antlion so the ants attacking it are never hidden by it.
  displayDefenders(theme) { for (const a of this.ants) if (a.defending) a.display(theme); }
}
