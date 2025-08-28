export class HUD {
  constructor(location, w, h, title = 'HUD') {
    this.location = location.copy();
    this.w = w;
    this.h = h;
    this.title = title;
  }
  displayBackground() {
    // Panel background (black, slightly transparent)
    noStroke();
    fill(0, 160);
    rectMode(CORNER);
    rect(this.location.x, this.location.y, this.w, this.h, 8);

    // Header strip
    fill(20, 20, 20, 220);
    rect(this.location.x, this.location.y - 30, this.w, 30, 8, 8, 0, 0);
    fill(220);
    textAlign(LEFT, CENTER);
    textSize(14);
    text(this.title, this.location.x + 12, this.location.y - 15);
  }
  displayMenu(menu) {
    // Draw all existing menu items inside the HUD area
    menu.displayPredator();
    menu.displayAnt();
    menu.displayFoodMenu();
    menu.reset();
  }
}
