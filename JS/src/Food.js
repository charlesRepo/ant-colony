export class Food {
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

export class FoodSource {
  constructor(location, gridSize) {
    this.location = location.copy();
    this.grid = [];
    this.rows = gridSize;
    this.cols = gridSize;
    this.unitW = this.unitH = this.rows / 5;
    this.unitSize = this.unitW * this.unitH;
    this.counter = 0;
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

