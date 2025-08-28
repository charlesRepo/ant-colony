export class Land {
  constructor() {
    this.wSize = width;
    this.hSize = height;
    this.size = this.wSize * this.hSize;
    this.location = createVector(0, 0);
    this.landR = 120; this.landG = 90; this.landB = 60;
    this.backgroundColor = color(this.landR, this.landG, this.landB);
    this.increment = 0.5;
  }
  displayLand() {
    rectMode(CORNER);
    noStroke();
    fill(this.backgroundColor);
    rect(this.location.x, this.location.y, this.wSize, this.hSize);
  }
  texture() {
    strokeWeight(2);
    let xOffset = 2;
    for (let x = 0; x < width; x += 5) {
      xOffset += this.increment;
      let yOffset = 2;
      for (let y = 0; y < height; y += 5) {
        yOffset += this.increment;
        const bright = noise(xOffset + 255, yOffset) * 255;
        stroke(bright, bright - 20, 0, 100);
        point(x, y);
      }
    }
  }
}

