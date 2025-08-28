export class Ant {
  constructor(location, homeTrail, foodTrail, toxicTrail) {
    this.location = location.copy();
    this.homeTrail = homeTrail || [];
    this.foodTrail = foodTrail || [];
    this.toxicTrail = toxicTrail || [];
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.wandertheta = 0;
    this.wSize = 4; this.hSize = this.wSize * 2; this.offset = this.wSize / 2.5;
    this.antSize = this.wSize * this.hSize;
    this.maxSpeed = 3; this.minSpeed = 2.5; this.maxForce = 0.6;
    this.mass = 3;
    this.antColor = color(40, 10, 0);
    this.lifeSpan = 255; this.border = -10; this.r = 50;
    this.attackPredatorFlag = false;
    this.antTrappedFlag = false;
    this.hasFoodFlag = false; this.hasBiscuitFlag = false; this.hasSugarFlag = false; this.hasToxicFlag = false;
    this.intoxicated = false; this.isToxic = false;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force) { const f = force.copy().div(this.mass); this.acceleration.add(f); }
  addHomePheromone() { this.homeTrail.push(this.location.copy()); }
  addFoodPheromone() { this.foodTrail.push(this.location.copy()); }
  addToxicPheromone() { this.toxicTrail.push(this.location.copy()); }
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
  arrive(target) {
    const desired = p5.Vector.sub(target, this.location);
    const d = desired.mag();
    const speed = (d < this.r) ? map(d, 0, this.r, 0, this.maxSpeed) : this.maxSpeed;
    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    this.applyForce(steer);
  }
  findFoodPheromone(biscuit, sugar, toxic) {
    for (let i = this.foodTrail.length - 1; i >= 0; i--) {
      const v = this.foodTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const targetBiscuit = createVector(biscuit.location.x, biscuit.location.y);
      const targetSugar = createVector(sugar.location.x, sugar.location.y);
      const targetToxic = createVector(toxic.location.x, toxic.location.y);
      if (!this.hasFoodFlag && d < 10 && biscuit.grid.length > 0) { this.arrive(targetBiscuit); i = 0; }
      if (!this.hasFoodFlag && d < 10 && sugar.grid.length > 0) { this.arrive(targetSugar); i = 0; }
      if (!this.hasFoodFlag && d < 10 && toxic.grid.length > 0) {
        if (this.intoxicated) this.flee(targetToxic); else this.arrive(targetToxic);
        i = 0;
      }
    }
  }
  findHomePheromone(home) {
    for (let i = this.homeTrail.length - 1; i >= 0; i--) {
      const v = this.homeTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const target = createVector(home.origin.x, home.origin.y);
      if (this.hasFoodFlag && d < 10) { this.arrive(target); i = 0; }
    }
  }
  findToxicPheromone() {
    for (let i = this.toxicTrail.length - 1; i >= 0; i--) {
      const v = this.toxicTrail[i];
      const d = p5.Vector.sub(this.location, v).mag();
      const target = createVector(v.x, v.y);
      if (this.hasFoodFlag && d < 10) { this.flee(target); i = 0; }
    }
  }
  findFood(biscuit, sugar, toxic, isToxicFood) {
    const db = p5.Vector.sub(this.location, biscuit.location).mag();
    const ds = p5.Vector.sub(this.location, sugar.location).mag();
    const dt = p5.Vector.sub(this.location, toxic.location).mag();
    const targetBiscuit = createVector(biscuit.location.x, biscuit.location.y);
    const targetSugar = createVector(sugar.location.x, sugar.location.y);
    const targetToxic = createVector(toxic.location.x, toxic.location.y);
    if (biscuit.noFood()) {
      if (biscuit.grid.length > 0) {
        if (!this.hasFoodFlag && db < 100) this.arrive(targetBiscuit);
        if (db < 20 && !this.hasFoodFlag) {
          biscuit.eatFood(this.location);
          this.hasFoodFlag = biscuit.hasParticle();
          this.hasBiscuitFlag = this.hasFoodFlag;
          this.hasSugarFlag = false; this.hasToxicFlag = false;
        }
      }
    }
    if (sugar.noFood()) {
      if (sugar.grid.length > 0) {
        if (!this.hasFoodFlag && ds < 150) this.arrive(targetSugar);
        if (ds < 20 && !this.hasFoodFlag) {
          sugar.eatFood(this.location);
          this.hasFoodFlag = sugar.hasParticle();
          this.hasSugarFlag = this.hasFoodFlag;
          this.hasBiscuitFlag = false; this.hasToxicFlag = false;
        }
      }
    }
    if (toxic.noFood()) {
      if (toxic.grid.length > 0) {
        if (!this.hasFoodFlag && dt < 100) this.arrive(targetToxic);
        if (dt < 20 && !this.hasFoodFlag) {
          toxic.eatFood(this.location);
          this.hasFoodFlag = toxic.hasParticle();
          this.hasToxicFlag = this.hasFoodFlag;
          this.hasBiscuitFlag = false; this.hasSugarFlag = false;
          if (!this.intoxicated) this.intoxicated = true;
          if (isToxicFood) this.flee(targetToxic);
        }
      }
    }
  }
  foodDelivery(home) {
    if (this.hasFoodFlag) {
      const d = p5.Vector.sub(this.location, home.origin).mag();
      const target = createVector(home.origin.x, home.origin.y);
      if (d < 200) this.arrive(target); else this.seek(target);
    }
  }
  reachHome(home) {
    const d = p5.Vector.sub(this.location, home.origin).mag();
    if (this.hasFoodFlag && d < home.getDiameter() - (this.antSize / 3)) return true;
    return false;
  }
  fleePredator(p) {
    const distance = p5.Vector.sub(this.location, p.location);
    const d = distance.mag();
    const target = createVector(p.location.x, p.location.y);
    if (d < 100) this.flee(target);
  }
  attackPredator(predator, ants) {
    const desiredseparation = this.r * 2; let count = 0;
    const distance = p5.Vector.sub(this.location, predator.location);
    const distanceFromTarget = distance.mag();
    const target = createVector(predator.location.x, predator.location.y);
    for (const other of ants) {
      const d = p5.Vector.dist(this.location, other.location);
      if ((d > 0) && (d < desiredseparation)) count++;
    }
    if (count > 3 && distanceFromTarget < 300) {
      this.attackPredatorFlag = true;
      this.seek(target);
      this.maxSpeed = 5;
      fill(255, 0, 0, 50);
    } else {
      this.attackPredatorFlag = false;
    }
  }
  antTrapped(home) {
    const d = p5.Vector.sub(this.location, home.origin).mag();
    const target = createVector(home.origin.x, home.origin.y);
    if (d < 30) {
      this.arrive(target);
      if (d < 10) { this.antTrappedFlag = true; this.maxForce *= 0.99; }
    }
  }
  antTrappedStatus() { return this.antTrappedFlag; }
  isIntoxicated() { return this.intoxicated; }
  hasFood() { return this.hasFoodFlag; }
  hasBiscuit() { return this.hasBiscuitFlag; }
  hasSugar() { return this.hasSugarFlag; }
  hasToxic() { return this.hasToxicFlag; }
  displayCarriedFood() {
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + this.wSize);
    rotate(head);
    rect(0, 10, 5, 5);
    pop();
  }
  display() {
    const head = this.velocity.heading() - PI / 2;
    push();
    translate(this.location.x, this.location.y + this.wSize);
    this.displayAnt(this.antColor, this.lifeSpan, head, random(this.wSize - (this.offset * this.offset), this.wSize), random(this.offset - this.wSize, this.wSize), random(-this.wSize - this.offset, this.offset - this.wSize));
    pop();
  }
  displayAntIcon(x, y, value) {
    const head = PI + QUARTER_PI;
    push();
    translate(x, y);
    noStroke();
    this.setLifeSpan(value);
    this.displayAnt(color(150, 110, 40), this.lifeSpan, head, 1, 0, -5);
    pop();
  }
  setLifeSpan(value) { this.lifeSpan = value; return this.lifeSpan; }
  displayAnt(c, lifeSpan, rotation, r1, r2, r3) {
    strokeWeight(0.2);
    stroke(c, lifeSpan); fill(c, lifeSpan);
    rotate(rotation);
    rectMode(CENTER);
    strokeWeight(this.wSize * 0.1);
    line(0, 0, this.wSize, r1);
    line(0, -this.offset, this.wSize, r2);
    line(0, this.offset - this.wSize, this.wSize, r3);
    strokeWeight(this.wSize * 0.1);
    line(0, 0, -this.wSize, r1);
    line(0, -this.offset, -this.wSize, r2);
    line(0, this.offset - this.wSize, -this.wSize, r3);
    strokeWeight(this.offset * 0.1);
    line(0, this.wSize, this.wSize - this.offset, this.wSize * this.offset + this.offset);
    line(0, this.wSize, this.offset - this.wSize, this.wSize * this.offset + this.offset);
    ellipse(0, this.wSize, this.wSize * 1.2, this.wSize * 1.2);
    ellipse(0, 0, this.wSize / (this.offset - 0.1), this.wSize / (this.offset - 0.1));
    ellipse(0, 0, this.wSize / this.offset, this.wSize / this.offset);
    ellipse(0, -this.wSize - this.offset, this.wSize, this.hSize);
  }
  checkEdges() {
    if (this.location.x > width - this.border) { this.velocity.x--; this.location.x = width - this.border; }
    if (this.location.x < 0 - this.border) { this.velocity.x++; this.location.x = -this.border; }
    if (this.location.y > height - 180) { this.velocity.y--; this.location.y = height - 180; }
    else if (this.location.y < -this.border) { this.velocity.y++; this.location.y = -this.border; }
  }
}

