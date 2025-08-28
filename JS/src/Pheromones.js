export class Pheromone {
  constructor(pheromoneSize) {
    this.pheromoneSize = pheromoneSize;
    this.trail = [];
    this.lifeSpan = 15;
  }
  getTrail() { return this.trail; }
  evaporate() {
    if (this.trail.length > this.pheromoneSize) {
      if (this.lifeSpan > 10) {
        this.lifeSpan *= 0.999;
        this.trail.shift();
      }
      this.lifeSpan += 0.01;
    }
  }
  display() {
    strokeWeight(3);
    for (let i = 0; i < this.trail.length; i++) {
      const v = this.trail[i];
      point(int(v.x), int(v.y));
    }
  }
}

export class PheromoneFood extends Pheromone {
  constructor(size) { super(size); this.pherFoodColor = color(255, 255, 0); }
  display() { stroke(this.pherFoodColor, this.lifeSpan); super.display(); }
}

export class PheromoneHome extends Pheromone {
  constructor(size) { super(size); this.pherHomeColor = color(0, 0, 0); }
  display() { stroke(this.pherHomeColor, this.lifeSpan); super.display(); }
}

export class PheromoneToxic extends Pheromone {
  constructor(size) { super(size); this.pherToxicColor = color(0, 255, 0); }
  display() { stroke(this.pherToxicColor, this.lifeSpan); super.display(); }
}

