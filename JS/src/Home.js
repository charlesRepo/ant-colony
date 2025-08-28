export class Home {
  constructor(origin, diameter) {
    this.origin = origin.copy();
    this.diameter = diameter;
  }
  getDiameter() { return this.diameter; }
  display() {
    noStroke();
    for (let i = 255; i > 0; i -= 10) {
      strokeWeight(0.5);
      fill(100, 70, 10, 150 - i);
      ellipse(this.origin.x, this.origin.y, this.diameter + i, this.diameter + i);
    }
    fill(50, 30, 0);
    ellipse(this.origin.x, this.origin.y, this.diameter, this.diameter);
  }
}

export class AntHome extends Home {}
export class PredatorHome extends Home {}

