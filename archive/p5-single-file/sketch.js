/*
 Ant Colony simulation ported to p5.js from Processing (Java).
 Preserves look-and-feel and behaviors using ES6 classes.
*/

// Globals (mirroring the original sketch)
let antHome, predatorHome, land, colony, predator;
let biscuit, sugar, toxic;
let menu;

function setup() {
  const c = createCanvas(1200, 800);
  c.parent('app');

  antHome = new AntHome(createVector(100, 100), 30);
  predatorHome = new PredatorHome(createVector(width / 1.1, height / 1.7), 10);

  biscuit = new FoodSource(createVector(width / 2, height / 5), 25);
  sugar = new FoodSource(createVector(width / 2, height / 2), 25);
  toxic = new FoodSource(createVector(width / 2, height / 3), 25);

  predator = new Predator(createVector(predatorHome.origin.x, predatorHome.origin.y - 20));
  colony = new Colony(antHome, predator, predatorHome);
  menu = new Menu(createVector(0, height), predator, colony);
  land = new Land();
}

function draw() {
  // Background and land texture
  land.displayLand();
  land.texture();
  predatorHome.display();
  antHome.display();

  // Menu
  menu.displayBar();
  menu.displayPredator();
  menu.displayAnt();
  menu.displayFoodMenu();
  menu.addBiscuitFromMenu(mouseX, mouseY, biscuit);
  menu.addSugarFromMenu(mouseX, mouseY, sugar);
  menu.addToxicFromMenu(mouseX, mouseY, toxic);
  menu.reset();

  // Colony
  colony.run(menu, biscuit, sugar, toxic);
  colony.displayColony(menu);
  colony.eatenByPredator(predator);

  // Predator
  if (menu.showPredator) {
    predator.run();
    predator.attackAnts(colony.getAnts());
    predator.display();
  }
}

function mousePressed() {
  colony.addAntFromMenu(menu);
  menu.mousePressed(mouseX, mouseY, biscuit, sugar, toxic);
  if (mouseY < menu.location.y - 160) {
    if (menu.selectBiscuit) biscuit = new FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectSugar) sugar = new FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectToxic) toxic = new FoodSource(createVector(mouseX, mouseY), 25);
  }
}

// ---------------------------- Core Classes ----------------------------

class Home {
  constructor(origin, diameter) {
    this.origin = origin.copy();
    this.diameter = diameter;
  }
  getDiameter() { return this.diameter; }
  display() {
    noStroke();
    // Surrounding faded sand
    for (let i = 255; i > 0; i -= 10) {
      strokeWeight(0.5);
      fill(100, 70, 10, 150 - i);
      ellipse(this.origin.x, this.origin.y, this.diameter + i, this.diameter + i);
    }
    // The black hole
    fill(50, 30, 0);
    ellipse(this.origin.x, this.origin.y, this.diameter, this.diameter);
  }
}

class AntHome extends Home {}
class PredatorHome extends Home {}

class Land {
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
    // Approximate the noise-based sand with semi-transparent points
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

class Pheromone {
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

class PheromoneFood extends Pheromone {
  constructor(size) {
    super(size);
    this.pherFoodColor = color(255, 255, 0);
  }
  display() { stroke(this.pherFoodColor, this.lifeSpan); super.display(); }
}
class PheromoneHome extends Pheromone {
  constructor(size) { super(size); this.pherHomeColor = color(0, 0, 0); }
  display() { stroke(this.pherHomeColor, this.lifeSpan); super.display(); }
}
class PheromoneToxic extends Pheromone {
  constructor(size) { super(size); this.pherToxicColor = color(0, 255, 0); }
  display() { stroke(this.pherToxicColor, this.lifeSpan); super.display(); }
}

class Food {
  constructor(location) { this.location = location ? location.copy() : null; }
  setAlpha(selected) { return selected ? 255 : 100; }
  foodUnit(x, y, wSize, hSize, selected, foodType) {
    this.setFoodColor(selected, foodType);
    this.displayFoodUnit(x, y, wSize, hSize);
  }
  setFoodColor(selected, foodType) {
    if (foodType === 0) this.displayBiscuit(0);
    if (foodType === 1) this.displayBiscuit(this.setAlpha(false));
    if (foodType === 1 && selected) this.displayBiscuit(this.setAlpha(true));
    if (foodType === 2) this.displaySugar(this.setAlpha(false));
    if (foodType === 2 && selected) this.displaySugar(this.setAlpha(true));
    if (foodType === 3) this.displayToxic(this.setAlpha(false));
    if (foodType === 3 && selected) this.displayToxic(this.setAlpha(true));
  }
  displayFoodUnit(x, y, wSize, hSize) {
    stroke(100);
    strokeWeight(0.5);
    rectMode(CENTER);
    rect(x, y, wSize, hSize);
  }
  displayBiscuit(alpha) { fill(color(200, 190, 120), alpha); }
  displaySugar(alpha) { fill(color(255, 255, 255), alpha); }
  displayToxic(alpha) { fill(color(0, 255, 0), alpha); }
}

class FoodSource {
  constructor(location, gridSize) {
    this.location = location.copy();
    this.grid = [];
    this.rows = gridSize;
    this.cols = gridSize;
    this.unitW = this.unitH = this.rows / 5;
    this.unitSize = this.unitW * this.unitH;
    this.counter = 0; // set after grid built
    this.hasParticleFlag = false;
    this.addFood = false;
    this.foodStatus = false;
    this.setGrid();
    this.counter = this.grid.length;
  }
  setGrid() {
    for (let i = 0; i < this.rows; i += this.unitW) {
      for (let j = 0; j < this.cols; j += this.unitH) {
        this.grid.push(new Food(createVector(i + this.location.x, j + this.location.y)));
      }
    }
  }
  noFood() { return this.addFood; }
  getFoodStatus(status) { this.foodStatus = !!status; return this.foodStatus; }
  setFoodStatus() {
    if (this.getFoodStatus(this.foodStatus)) { this.addFood = true; return true; }
    this.addFood = false; return false;
  }
  addBiscuit() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 1);
      }
    }
  }
  addSugar() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 2);
      }
    }
  }
  addToxic() {
    if (this.setFoodStatus()) {
      for (let i = this.grid.length - 1; i >= 0; i--) {
        const f = this.grid[i];
        f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), this.unitW, this.unitH, true, 3);
      }
    }
  }
  addFoodIcon(x, y, size, selected, type) {
    const icon = [];
    for (let i = 0; i < this.rows; i += this.unitW) {
      for (let j = 0; j < this.cols; j += this.unitH) {
        icon.push(new Food(createVector(i + x, j + y)));
      }
    }
    for (let i = icon.length - 1; i >= 0; i--) {
      const f = icon[i];
      f.foodUnit(f.location.x - (this.rows / 2), f.location.y - (this.cols / 2), size, size, selected, type);
    }
  }
  setSelected(selected) { return !!selected; }
  hasParticle() { return this.hasParticleFlag; }
  eatFood(l) {
    for (let i = this.grid.length - this.counter; i >= 0; i--) {
      if (this.counter > 0) {
        const f = this.grid[i];
        if (this.counter >= 1) {
          this.counter--;
          if (l.x >= f.location.x - (this.unitSize - this.unitW) && l.y >= f.location.y - (this.unitSize - this.unitH)) {
            this.grid.splice(this.counter, 1);
            this.hasParticleFlag = true;
          }
        }
      }
    }
  }
}

class Predator {
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
        // hide predator
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
    // legs
    stroke(this.predatorColor, lifeSpan);
    strokeWeight(this.wSize / 6);
    line(0, 0, this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, this.wSize / 1.5, r);
    line(0, 0, -this.wSize / 1.5, -this.hSize / 2.5);
    line(0, -this.hSize / 8, -this.wSize / 1.5, r);
    fill(red(this.predatorColor) - 80, green(this.predatorColor) - 80, blue(this.predatorColor) - 80, lifeSpan);
    noStroke();
    // left horn
    rotate(rotation1);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, -this.wSize / 4, this.hSize / 2);
    // right horn
    rotate(rotation2);
    ellipse(0, this.hSize / 4, this.wSize / 3, this.hSize / 2.5);
    triangle(0, this.hSize / 4, 0, this.hSize / 2, this.wSize / 4, this.hSize / 2);
    pop();
    // body and head
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
    // Match original logic: use (width + border) with border = -10
    if (this.location.x >= width + (-10)) { this.velocity.x--; this.location.x = width + (-10); }
    else if (this.location.x <= -(-10)) { this.velocity.x++; this.location.x = -(-10); }
    if (this.location.y >= height - 200) { this.velocity.y--; this.location.y = height - 200; }
    else if (this.location.y <= -(-10)) { this.velocity.y++; this.location.y = -(-10); }
  }
}

class Ant {
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
  applyForce(force) {
    const f = force.copy().div(this.mass);
    this.acceleration.add(f);
  }
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

    // Biscuit
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
    // Sugar
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
    // Toxic
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

class Colony {
  constructor(antHome, predator, predatorHome) {
    this.antHome = antHome; this.predator = predator; this.predatorHome = predatorHome;
    this.location = antHome.origin.copy();
    this.ants = [];
    this.ant = new Ant(this.location);
    this.foodParticle = new Food();
    this.antNum = 30;
    this.pheromoneHome = new PheromoneHome(5000);
    this.pheromoneFood = new PheromoneFood(2000);
    this.pheromoneToxic = new PheromoneToxic(500);
    this.isToxicFood = false;
    this.addAnt();
  }
  addAnt() {
    for (let i = this.antNum - 1; i >= 0; i--) {
      this.ants.push(new Ant(this.location, this.pheromoneHome.getTrail(), this.pheromoneFood.getTrail(), this.pheromoneToxic.getTrail()));
    }
  }
  addAntN(num) {
    for (let i = 0; i < num; i++) {
      this.ants.push(new Ant(this.location, this.pheromoneHome.getTrail(), this.pheromoneFood.getTrail(), this.pheromoneToxic.getTrail()));
    }
  }
  getAnts() { return this.ants; }
  run(menu, biscuit, sugar, toxic) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      if (a.hasToxic()) a.addToxicPheromone();
      if (a.hasFood()) a.addFoodPheromone(); else a.addHomePheromone();
      a.update();
      this.pheromoneFood.evaporate();
      this.pheromoneHome.evaporate();
      this.pheromoneToxic.evaporate();
      a.checkEdges();
      a.wander();
      a.findFood(biscuit, sugar, toxic, this.isToxicFood);
      a.foodDelivery(this.antHome);
      a.findFoodPheromone(biscuit, sugar, toxic);
      a.findHomePheromone(this.antHome);
      a.findToxicPheromone();
      a.fleePredator(this.predator);
      a.attackPredator(this.predator, this.ants);
      this.predator.fleeFromAnts(this.ants, this.predatorHome, menu);
      a.reachHome(this.antHome);
      a.antTrapped(this.predatorHome);
      a.update();
      if (a.isIntoxicated()) { this.ants.splice(i, 1); this.isToxicFood = true; }
      if (a.antTrappedStatus() && menu.hidePredator()) { a.lifeSpan -= 20; this.ants.splice(i, 1); }
      if (a.reachHome(this.antHome)) {
        a.lifeSpan -= 20;
        if (a.lifeSpan <= 0) { this.ants.splice(i, 1); this.addAntN(1); }
      }
    }
  }
  eatenByPredator(predator) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      const d = p5.Vector.sub(a.location, predator.location).mag();
      if (d < 30 && !a.attackPredatorFlag) this.ants.splice(i, 1);
    }
  }
  addAntFromMenu(menu) { if (menu.addAnt() && this.ants.length < 40) this.addAntN(1); }
  displayColony(menu) {
    for (let i = this.ants.length - 1; i >= 0; i--) {
      const a = this.ants[i];
      a.display();
      if (a.hasBiscuit() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 1); a.displayCarriedFood(); }
      if (a.hasSugar() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 2); a.displayCarriedFood(); }
      if (a.hasToxic() && !a.reachHome(this.antHome)) { this.foodParticle.setFoodColor(true, 3); a.displayCarriedFood(); }
    }
    this.pheromoneHome.display();
    this.pheromoneFood.display();
    this.pheromoneToxic.display();
  }
}

class Menu {
  constructor(location, predator, colony) {
    this.location = location.copy();
    this.wSize = width; this.hSize = height - 150;
    this.predator = predator; this.colony = colony;
    this.ant = new Ant(createVector(location.x + 380, location.y - 100));
    this.yPosition = location.y - 100;
    this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = false;
    this.selected = false; this.showPredator = false; this.predatorPressed = false;
    this.resetPressed = false; this.antPressed = false;
    this.alpha1 = 50; this.alpha2 = 50; this.alpha3 = 50; this.typeCount = 0; this.value = 0;
    this.food = new Food();
    this.letter = null;
  }
  reset() {
    if (this.resetPressed) fill(255); else fill(100);
    textSize(15); textAlign(LEFT);
    text('RESET', this.ant.location.x + 100, this.ant.location.y + 5);
  }
  displayPredator() {
    this.value = this.predatorPressed ? 255 : 100;
    this.predator.displayPredatorIcon(this.value, this.location.x + 100, this.location.y - 100);
  }
  displayAnt() {
    this.value = this.antPressed ? 255 : 100;
    this.ant.displayAntIcon(this.ant.location.x, this.ant.location.y, this.value);
    fill(100); textSize(15); textAlign(LEFT);
    text(this.colony.ants.length + ' ants', this.ant.location.x + 20, this.ant.location.y + 5);
  }
  displayFoodMenu() {
    const f = new FoodSource(createVector(this.location.x, this.yPosition), 25);
    this.offset = 50; this.typeCount = 1;
    for (let i = 200; i <= 300; i += this.offset) {
      this.setToggleConditions();
      f.addFoodIcon(this.location.x + i, this.yPosition, f.unitW, this.selected, this.typeCount);
      this.typeCount++;
      textSize(10); textAlign(CENTER);
      fill(255, this.alpha1); text('BISCUIT', this.location.x + (this.offset * 4), this.location.y - 70);
      fill(255, this.alpha2); text('SUGAR', this.location.x + (this.offset * 5), this.location.y - 70);
      fill(255, this.alpha3); text('TOXIC', this.location.x + (this.offset * 6), this.location.y - 70);
    }
  }
  addBiscuitFromMenu(x, y, f) {
    f.addBiscuit();
    if (this.selectBiscuit) { f.getFoodStatus(true); if (y < this.location.y - 160) f.addFoodIcon(x, y, 5, true, 1); }
  }
  addSugarFromMenu(x, y, f) {
    f.addSugar();
    if (this.selectSugar) { f.getFoodStatus(true); if (y < this.location.y - 160) f.addFoodIcon(x, y, 5, true, 2); }
  }
  addToxicFromMenu(x, y, f) {
    f.addToxic();
    if (this.selectToxic) { f.getFoodStatus(true); if (y < this.location.y - 160) f.addFoodIcon(x, y, 5, true, 3); }
  }
  setToggleConditions() {
    if (this.typeCount < 4) {
      switch (this.letter) {
        case 'A':
          if (this.selectBiscuit && this.typeCount === 1) { this.selected = true; this.alpha1 = 255; }
          else if (this.typeCount !== 1) { this.selected = false; this.alpha1 = 50; }
          break;
        case 'B':
          if (this.selectSugar && this.typeCount === 2) { this.selected = true; this.alpha2 = 255; }
          else if (this.typeCount !== 2) { this.selected = false; this.alpha2 = 50; }
          break;
        case 'C':
          if (this.selectToxic && this.typeCount === 3) { this.selected = true; this.alpha3 = 255; }
          else if (this.typeCount < 3) { this.selected = false; this.alpha3 = 50; }
          break;
      }
    }
  }
  mousePressed(x, y, biscuit, sugar, toxic) {
    if (x > (this.location.x + 197) - biscuit.unitSize && x < (this.location.x + 197) + biscuit.unitSize && y > this.yPosition - biscuit.unitSize && y < this.yPosition + biscuit.unitSize) {
      this.selectBiscuit = !this.selectBiscuit; this.selectSugar = false; this.selectToxic = false; this.letter = 'A';
    }
    if (x > (this.location.x + 247) - sugar.unitSize && x < (this.location.x + 247) + sugar.unitSize && y > this.yPosition - sugar.unitSize && y < this.yPosition + sugar.unitSize) {
      this.selectBiscuit = false; this.selectSugar = !this.selectSugar; this.selectToxic = false; this.letter = 'B';
    }
    if (x > (this.location.x + 297) - toxic.unitSize && x < (this.location.x + 297) + toxic.unitSize && y > this.yPosition - toxic.unitSize && y < this.yPosition + toxic.unitSize) {
      this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = !this.selectToxic; this.letter = 'C';
    }
    if (x > (this.location.x + 100) - this.predator.wSize && x < (this.location.x + 100) + this.predator.wSize && y > this.yPosition - this.predator.hSize && y < this.yPosition + this.predator.hSize) {
      this.showPredator = !this.showPredator; this.predatorPressed = !this.predatorPressed;
    }
    if (x > (this.location.x + 380) - this.ant.wSize && x < (this.location.x + 380) + this.ant.wSize && y > this.yPosition - this.ant.hSize && y < this.yPosition + this.ant.hSize) {
      this.antPressed = true;
    }
    if (x > this.location.x + 480 && x < this.location.x + 530 && y > this.yPosition - 20 && y < this.yPosition + 20) {
      this.resetPressed = true;
      setup(); // reset
    }
  }
  addAnt() { return this.antPressed; }
  hidePredator() { return !this.showPredator; }
  displayBar() { fill(0); rectMode(CORNER); rect(this.location.x, this.location.y, this.wSize, this.hSize); }
}
