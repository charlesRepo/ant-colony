import { TRAIL } from './Pheromones.js';

const STOMP_RADIUS = 13;    // ants this close to the click are stepped on
const STARTLE_RADIUS = 80;  // ants this close bolt away from the stomp
const IMPACT_FRAMES = 24;

// The human: while switched on in the panel, clicking the ground steps on whatever ant is there.
// Crushed ants release a burst of danger pheromone and nearby ants scatter.
export class Human {
  constructor() { this.impacts = []; }
  stomp(x, y, colony, field) {
    const crushed = colony.crush(x, y, STOMP_RADIUS, STARTLE_RADIUS);
    if (crushed > 0) field.depositDisc(TRAIL.ALARM, x, y, 12, 0.8);
    this.impacts.push({ x, y, age: 0 });
  }
  status(on) { return on ? 'Click an ant to step on it' : 'Off'; }
  update() {
    for (const i of this.impacts) i.age++;
    this.impacts = this.impacts.filter(i => i.age < IMPACT_FRAMES);
  }
  // A quick shadow and ring where the foot came down.
  display() {
    for (const { x, y, age } of this.impacts) {
      const t = age / IMPACT_FRAMES;
      noStroke();
      fill(0, 0, 0, 70 * (1 - t));
      circle(x + 2, y + 3, STOMP_RADIUS * 2 * (1.2 - 0.4 * t));
      noFill();
      stroke(0, 0, 0, 90 * (1 - t));
      strokeWeight(1.5);
      circle(x, y, STOMP_RADIUS * 2 + 30 * t);
    }
  }
  // Shows what a click would step on.
  displayCursor(x, y) {
    noStroke();
    fill(0, 0, 0, 22);
    circle(x + 2, y + 3, STOMP_RADIUS * 2);
    noFill();
    stroke(0, 0, 0, 110);
    strokeWeight(1.2);
    circle(x, y, STOMP_RADIUS * 2);
  }
}
