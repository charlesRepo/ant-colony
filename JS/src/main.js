// Assemble the sketch using ES modules and global-mode p5.
import './styles.js';
import { AntHome, PredatorHome } from './Home.js';
import { Land } from './Land.js';
import { Predator } from './Predator.js';
import { Colony } from './Colony.js';
import { Menu } from './Menu.js';
import { HUD } from './HUD.js';
import { FoodSource } from './Food.js';

let antHome, predatorHome, land, colony, predator;
let biscuit, sugar, toxic;
let menu, hud;

// Expose p5 lifecycle functions to global (p5 global mode calls window.setup/draw)
window.setup = function () {
  const c = createCanvas(1200, 800);
  c.parent('app');

  antHome = new AntHome(createVector(100, 100), 30);
  predatorHome = new PredatorHome(createVector(width / 1.1, height / 1.7), 10);
  biscuit = new FoodSource(createVector(width / 2, height / 5), 25);
  sugar = new FoodSource(createVector(width / 2, height / 2), 25);
  toxic = new FoodSource(createVector(width / 2, height / 3), 25);
  predator = new Predator(createVector(predatorHome.origin.x, predatorHome.origin.y - 20));
  colony = new Colony(antHome, predator, predatorHome);
  // Place HUD as a 150px-tall panel at the bottom
  const hudTopLeft = createVector(0, height - 150);
  hud = new HUD(hudTopLeft, width, 150, 'Controls');
  // Align menu to HUD area
  menu = new Menu(hudTopLeft, predator, colony);
  land = new Land();
};

window.draw = function () {
  land.displayLand();
  land.texture();
  predatorHome.display();
  antHome.display();
  // HUD frame and menu items
  hud.displayBackground();
  hud.displayMenu(menu);
  menu.addBiscuitFromMenu(mouseX, mouseY, biscuit);
  menu.addSugarFromMenu(mouseX, mouseY, sugar);
  menu.addToxicFromMenu(mouseX, mouseY, toxic);
  colony.run(menu, biscuit, sugar, toxic);
  colony.displayColony(menu);
  colony.eatenByPredator(predator);
  if (menu.showPredator) { predator.run(); predator.attackAnts(colony.getAnts()); predator.display(); }
};

window.mousePressed = function () {
  colony.addAntFromMenu(menu);
  menu.mousePressed(mouseX, mouseY, biscuit, sugar, toxic);
  if (mouseY < menu.location.y) {
    if (menu.selectBiscuit) biscuit = new FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectSugar) sugar = new FoodSource(createVector(mouseX, mouseY), 25);
    if (menu.selectToxic) toxic = new FoodSource(createVector(mouseX, mouseY), 25);
  }
};
