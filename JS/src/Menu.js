export class Menu {
  constructor(location, predator, colony) {
    this.location = location.copy();
    // Constrain menu to HUD panel at bottom: full width, fixed height 150
    this.wSize = width; this.hSize = 150;
    this.predator = predator; this.colony = colony;
    // Position icons centered vertically within HUD
    this.yPosition = this.location.y + (this.hSize / 2);
    this.ant = new Ant(createVector(this.location.x + 380, this.yPosition));
    this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = false;
    this.selected = false; this.showPredator = false; this.predatorPressed = false;
    this.resetPressed = false; this.antPressed = false;
    this.alpha1 = 50; this.alpha2 = 50; this.alpha3 = 50; this.typeCount = 0; this.value = 0;
    this.food = new Food();
    this.letter = null;
  }
  reset() { if (this.resetPressed) fill(255); else fill(100); textSize(15); textAlign(LEFT); text('RESET', this.ant.location.x + 100, this.ant.location.y + 5); }
  displayPredator() { this.value = this.predatorPressed ? 255 : 100; this.predator.displayPredatorIcon(this.value, this.location.x + 100, this.yPosition); }
  displayAnt() { this.value = this.antPressed ? 255 : 100; this.ant.displayAntIcon(this.location.x + 380, this.yPosition, this.value); fill(100); textSize(15); textAlign(LEFT); text(this.colony.ants.length + ' ants', this.location.x + 400, this.yPosition + 5); }
  displayFoodMenu() {
    const f = new FoodSource(createVector(this.location.x, this.yPosition), 25);
    this.offset = 50; this.typeCount = 1;
    for (let i = 200; i <= 300; i += this.offset) {
      this.setToggleConditions();
      f.addFoodIcon(this.location.x + i, this.yPosition, f.unitW, this.selected, this.typeCount);
      this.typeCount++;
      textSize(10); textAlign(CENTER);
      fill(255, this.alpha1); text('BISCUIT', this.location.x + (this.offset * 4), this.yPosition + 30);
      fill(255, this.alpha2); text('SUGAR', this.location.x + (this.offset * 5), this.yPosition + 30);
      fill(255, this.alpha3); text('TOXIC', this.location.x + (this.offset * 6), this.yPosition + 30);
    }
  }
  addBiscuitFromMenu(x, y, f) { f.addBiscuit(); if (this.selectBiscuit) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 1); } }
  addSugarFromMenu(x, y, f) { f.addSugar(); if (this.selectSugar) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 2); } }
  addToxicFromMenu(x, y, f) { f.addToxic(); if (this.selectToxic) { f.getFoodStatus(true); if (y < this.location.y) f.addFoodIcon(x, y, 5, true, 3); } }
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
    if (x > (this.location.x + 197) - biscuit.unitSize && x < (this.location.x + 197) + biscuit.unitSize && y > this.yPosition - biscuit.unitSize && y < this.yPosition + biscuit.unitSize) { this.selectBiscuit = !this.selectBiscuit; this.selectSugar = false; this.selectToxic = false; this.letter = 'A'; }
    if (x > (this.location.x + 247) - sugar.unitSize && x < (this.location.x + 247) + sugar.unitSize && y > this.yPosition - sugar.unitSize && y < this.yPosition + sugar.unitSize) { this.selectBiscuit = false; this.selectSugar = !this.selectSugar; this.selectToxic = false; this.letter = 'B'; }
    if (x > (this.location.x + 297) - toxic.unitSize && x < (this.location.x + 297) + toxic.unitSize && y > this.yPosition - toxic.unitSize && y < this.yPosition + toxic.unitSize) { this.selectBiscuit = false; this.selectSugar = false; this.selectToxic = !this.selectToxic; this.letter = 'C'; }
    if (x > (this.location.x + 100) - this.predator.wSize && x < (this.location.x + 100) + this.predator.wSize && y > this.yPosition - this.predator.hSize && y < this.yPosition + this.predator.hSize) { this.showPredator = !this.showPredator; this.predatorPressed = !this.predatorPressed; }
    if (x > (this.location.x + 380) - this.ant.wSize && x < (this.location.x + 380) + this.ant.wSize && y > this.yPosition - this.ant.hSize && y < this.yPosition + this.ant.hSize) { this.antPressed = true; }
    if (x > this.location.x + 480 && x < this.location.x + 530 && y > this.yPosition - 20 && y < this.yPosition + 20) { this.resetPressed = true; setup(); }
  }
  addAnt() { return this.antPressed; }
  hidePredator() { return !this.showPredator; }
  displayBar() { fill(0); rectMode(CORNER); rect(this.location.x, this.location.y, this.wSize, this.hSize); }
}

// Local imports needed by Menu class
import { Ant } from './Ant.js';
import { Food, FoodSource } from './Food.js';
