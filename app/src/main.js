// Assemble the sketch using ES modules and global-mode p5.
import './styles.js';
import { WORLD, START_ANTS } from './config.js';
import { THEMES, DEFAULT_THEME } from './theme.js';
import { AntHome, PredatorHome } from './Home.js';
import { Land } from './Land.js';
import { PheromoneField } from './Pheromones.js';
import { Colony } from './Colony.js';
import { Predator } from './Predator.js';
import { FoodSource, FOOD_TYPES } from './Food.js';
import { ControlPanel } from './ControlPanel.js';
import { Human } from './Human.js';

let land, field, nest, lair, colony, predator, panel, theme, bounds;
const human = new Human();
let foods = [];
let hovering = false;

// Expose p5 lifecycle functions to global (p5 global mode calls window.setup/draw)
window.setup = function () {
  const c = createCanvas(WORLD.width, WORLD.height);
  c.parent('stage');
  c.mousePressed(handleClick);
  c.mouseOver(() => { hovering = true; });
  c.mouseOut(() => { hovering = false; });
  bounds = { left: 0, top: 0, right: width, bottom: height };
  nest = new AntHome(createVector(width * 0.11, height * 0.16));
  lair = new PredatorHome(createVector(width * 0.87, height * 0.62));
  land = new Land(width, height);
  field = new PheromoneField(width, height);
  panel = new ControlPanel({
    onAddAnts: n => colony.spawn(n),
    onPredator: on => predator.setEnabled(on),
    onReset: reset,
    onTheme: setTheme,
  });
  setTheme(panel.savedTheme || DEFAULT_THEME);
  reset();
};

function setTheme(name) {
  theme = THEMES[name];
  land.render(theme, [nest, lair]);
  field.setColors(theme.trails);
  panel.showTheme(name, theme);
}

function reset() {
  field.clear();
  foods = [];
  if (colony) colony.dispose();
  colony = new Colony(nest);
  colony.spawn(START_ANTS, { mixedAge: true });
  predator = new Predator(lair);
  panel.setPredator(false);
}

function handleClick() {
  if (panel.tool === 'human') human.stomp(mouseX, mouseY, colony, field);
  else if (panel.tool) placeFood();
}

// Drop a pile of the selected food where the ground was clicked, clear of the edges and the holes.
function placeFood() {
  const p = createVector(mouseX, mouseY);
  for (const home of [nest, lair]) {
    const away = p5.Vector.sub(p, home.origin);
    if (away.mag() < home.clearance) p.set(p5.Vector.add(home.origin, (away.magSq() ? away : createVector(1, 0)).setMag(home.clearance)));
  }
  p.set(constrain(p.x, 18, width - 18), constrain(p.y, 18, height - 18));
  foods.push(new FoodSource(panel.tool, p));
}

window.draw = function () {
  predator.update(colony.ants, bounds);
  colony.run({ bounds, nest, lair, foods, field, predator });
  foods = foods.filter(f => !f.isEmpty);
  field.update();
  human.update();

  land.display();
  field.display();
  colony.displayGround(theme);
  for (const f of foods) f.display();
  colony.display(theme);
  predator.display();
  colony.displayDefenders(theme);
  human.display();
  if (panel.tool && hovering) {
    if (panel.tool === 'human') human.displayCursor(mouseX, mouseY);
    else FoodSource.drawPreview(panel.tool, mouseX, mouseY);
  }

  const piles = Object.fromEntries(Object.keys(FOOD_TYPES).map(type => [type, foods.filter(f => f.type === type).length]));
  panel.render({
    alive: colony.alive, stats: colony.stats, piles, hatch: colony.hatchRate,
    predatorStatus: predator.status, humanStatus: human.status(panel.tool === 'human'),
  });
};
