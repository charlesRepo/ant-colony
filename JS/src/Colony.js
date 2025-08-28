import { PheromoneFood, PheromoneHome, PheromoneToxic } from './Pheromones.js';
import { Ant } from './Ant.js';
import { Food } from './Food.js';

export class Colony {
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

