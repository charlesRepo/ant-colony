export class Predator {
  constructor(location) {
    this.location = location.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.wandertheta = 0;
    this.wSize = 20; this.hSize = this.wSize * 2;
    this.predatorSize = this.wSize * this.hSize;
    this.maxSpeed = 3.5; this.minSpeed = 2.5;
    this.maxForce = 0.5; this.mass = 10;
    this.predatorColor = color(150, 140, 110);
    this.lifeSpan = 255; this.border = -10; this.appear = 0;
    this.isAttacked = false; this.disappear = false;
  }
  run() { this.update(); this.checkEdges(); }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.wander();
  }
  applyForce(force) {
    const f = force.copy().div(this.mass);
    this.acceleration.add(f);
  }
  wander() {
    const wanderR = 25, wanderD = 10, change = 3;
    this.wandertheta += random(-change, change);
    const circleLoc = this.velocity.copy().normalize().mult(wanderD).add(this.location);
    const h = this.velocity.heading();
    const circleOffSet = createVector(wanderR * cos(this.wandertheta + h), wanderR * sin(this.wandertheta + h));
    const target = p5.Vector.add(circleLoc, circleOffSet);
    this.seek(target);
  }
  seek(target) {
    const desired = p5.Vector.sub(target, this.location).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  flee(target) {
    const desired = p5.Vector.sub(this.location, target).setMag(random(this.minSpeed, this.maxSpeed));
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  attackAnts(ants) {
    for (const a of ants) {
      const d = p5.Vector.sub(this.location, a.location).mag();
      const target = createVector(a.location.x, a.location.y);
      if (d < 300) { this.maxSpeed = 15; this.seek(target); }
    }
  }
  fleeFromAnts(ants, home, menu) {
    for (const a of ants) {
      const d = p5.Vector.sub(this.location, a.location).mag();
      const target = createVector(a.location.x, a.location.y);
      if (d < 50 && a.attackPredatorFlag) {
        this.isAttacked = true;
        this.flee(target);
        this.enterHome(home, menu);
      } else {
        this.isAttacked = false;
        this.disappear = false;
      }
    }
  }
  enterHome(home, menu) {
    const homeDist = p5.Vector.sub(this.location, home.origin);
    const d = homeDist.mag();
    const target = createVector(home.origin.x, home.origin.y);
    if (this.isAttacked && d < 300) {
      this.seek(target);
      if (this.isAttacked && d < 40) {
        this.appear *= 0.99;
        this.disappear = true;
        menu.hidePredator();
      }
    }
  }
  display() {
    if (this.appear < 250) this.appear += 10;
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + 20);
    rotate(head);
    this.displayPredator(this.appear, random(99.7, 100), random(-149.5, -150), random(-2, 2));
    pop();
  }
  displayPredatorIcon(value, x, y) {
    const head = HALF_PI + QUARTER_PI;
    push();
    translate(x, y);
    rotate(head);
    this.displayPredator(value, 100, -150, 2);
    pop();
  }
  displayPredator(lifeSpan, rotation1, rotation2, r) {
    push();
    stroke(this.predatorColor, lifeSpan);
    strokeWeight(this.wSize / 6);
    line(0, 0, this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, this.wSize / 1.5, r);
    line(0, 0, -this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, -this.wSize / 1.5, r);
    fill(red(this.predatorColor) - 80, green(this.predatorColor) - 80, blue(this.predatorColor) - 80, lifeSpan);
    noStroke();
    rotate(rotation1);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, -this.wSize / 4, this.hSize / 2);
    rotate(rotation2);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, this.wSize / 4, this.hSize / 2);
    pop();
    fill(this.predatorColor, lifeSpan);
    ellipse(0, 0, this.wSize / 1.5, this.wSize / 1.5);
    fill(red(this.predatorColor) - 50, green(this.predatorColor) - 50, blue(this.predatorColor) - 50, lifeSpan);
    ellipse(0, -this.hSize / 2, this.wSize, this.hSize);
    fill(this.predatorColor, lifeSpan);
    ellipse(0, -this.hSize / 1.8, this.wSize, this.hSize);
    if (!this.disappear) {
      for (let i = 0; i < 30; i++) {
        fill(red(this.predatorColor) - 50, green(this.predatorColor) - 50, blue(this.predatorColor) - 50, i);
        ellipse(0, -this.hSize / 2, (this.wSize - this.wSize / 4) - i, this.hSize - i);
      }
    }
  }
  checkEdges() {
    if (this.location.x >= width + (-10)) { this.velocity.x--; this.location.x = width + (-10); }
    else if (this.location.x <= -(-10)) { this.velocity.x++; this.location.x = -(-10); }
    if (this.location.y >= height - 200) { this.velocity.y--; this.location.y = height - 200; }
    else if (this.location.y <= -(-10)) { this.velocity.y++; this.location.y = -(-10); }
  }
}

