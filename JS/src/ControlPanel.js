import { THEMES, rgba } from './theme.js';
import { FOOD_TYPES } from './Food.js';
import { MAX_ANTS } from './config.js';

const THEME_KEY = 'ant-colony.theme';
const TOOL_KEYS = { 1: 'biscuit', 2: 'sugar', 3: 'toxic' };
const $ = selector => document.querySelector(selector);
const byData = attr => {
  const key = attr.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  return Object.fromEntries([...document.querySelectorAll(`[data-${attr}]`)].map(el => [el.dataset[key], el]));
};

// Binds the HTML control panel (index.html) to the simulation.
export class ControlPanel {
  constructor({ onAddAnts, onPredator, onReset, onTheme }) {
    this.tool = null;
    this.shown = {};
    this.el = {
      count: $('#ant-count'), meter: $('#ant-meter'), add1: $('#add-1'), add10: $('#add-10'),
      stored: $('#stat-stored'), born: $('#stat-born'), poisoned: $('#stat-poisoned'), eaten: $('#stat-eaten'),
      tools: byData('tool'), piles: byData('piles'), legend: byData('trail'), themes: byData('theme-option'),
      predator: $('#predator-toggle'), predatorStatus: $('#predator-status'),
      hint: $('#place-hint'), hintFood: $('#place-hint-food'), reset: $('#reset'),
    };
    this.el.add1.addEventListener('click', () => onAddAnts(1));
    this.el.add10.addEventListener('click', () => onAddAnts(10));
    for (const [tool, button] of Object.entries(this.el.tools)) button.addEventListener('click', () => this.selectTool(tool));
    for (const [name, button] of Object.entries(this.el.themes)) button.addEventListener('click', () => onTheme(name));
    this.el.predator.addEventListener('change', () => onPredator(this.el.predator.checked));
    this.el.reset.addEventListener('click', onReset);
    document.addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (TOOL_KEYS[e.key]) this.selectTool(TOOL_KEYS[e.key]);
      else if (e.key === 'Escape') this.selectTool(null);
    });
  }
  get savedTheme() {
    try { const name = localStorage.getItem(THEME_KEY); return THEMES[name] ? name : null; } catch { return null; }
  }
  // Selecting the active tool again (or Escape) puts it away.
  selectTool(tool) {
    this.tool = tool && tool !== this.tool ? tool : null;
    for (const [name, button] of Object.entries(this.el.tools)) button.setAttribute('aria-pressed', String(name === this.tool));
    document.documentElement.classList.toggle('is-placing', !!this.tool);
    this.el.hint.hidden = !this.tool;
    if (this.tool) this.el.hintFood.textContent = FOOD_TYPES[this.tool].label.toLowerCase();
  }
  setPredator(on) { this.el.predator.checked = on; }
  showTheme(name, theme) {
    document.documentElement.dataset.theme = name;
    for (const [option, button] of Object.entries(this.el.themes)) button.setAttribute('aria-checked', String(option === name));
    for (const [trail, swatch] of Object.entries(this.el.legend)) {
      const [r, g, b, a] = theme.trails[trail];
      swatch.style.setProperty('--trail', `rgba(${r}, ${g}, ${b}, ${a})`);
      swatch.style.setProperty('--ground', rgba(theme.ground));
    }
    try { localStorage.setItem(THEME_KEY, name); } catch { /* storage unavailable: theme just won't persist */ }
  }
  // Called every frame; only touches the DOM when a value changed.
  render({ alive, stats, piles, predatorStatus }) {
    this.update('alive', alive, v => {
      this.el.count.textContent = v;
      this.el.meter.style.width = `${(v / MAX_ANTS) * 100}%`;
      this.el.add1.disabled = v >= MAX_ANTS;
      this.el.add10.disabled = v >= MAX_ANTS;
    });
    this.update('stored', stats.stored, v => { this.el.stored.textContent = v; });
    this.update('born', stats.born, v => { this.el.born.textContent = v; });
    this.update('poisoned', stats.poisoned, v => { this.el.poisoned.textContent = v; });
    this.update('eaten', stats.eaten, v => { this.el.eaten.textContent = v; });
    for (const type of Object.keys(FOOD_TYPES)) {
      this.update(`piles-${type}`, piles[type] || 0, v => { this.el.piles[type].textContent = `${v} ${v === 1 ? 'pile' : 'piles'}`; });
    }
    this.update('predator', predatorStatus, v => { this.el.predatorStatus.textContent = v; });
  }
  update(key, value, apply) {
    if (this.shown[key] === value) return;
    this.shown[key] = value;
    apply(value);
  }
}
