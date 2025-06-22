/*
 * Title: ANTS COLONY 
 * Name: CHARLES HANNA
 * Date: 15 APRIL 2014
 * Description: The ant colony is an autonomous ant simulation 
 * that mimics the ants foraging and attacking behaviors. 
 * It also highlights the impact of the interaction of humans 
 * with the natural order.
 *
 *
 ////////////////////////////////////////////////////////////////////////
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 /////////////////////////////////////////////////////////////////////////
 *
 *
 * This simulation was inspired by the Ant simulation by Forrest O. 
 * found on http://www.openprocessing.org/sketch/s15109
 * accessed on 07 February 2014, yet no code have been used from this simulation
 *
 * The wander(), arrive(), and seek() functions found in the a Ant and Predator class
 * were taken from the 
 * book Nature of Code, chapter 7, Steering Behavior by Daniel Shiffman 
 * accessed on 10 February 2014 
 *
 * the modified texture code found in the Land class  
 * was taken from the Nature of Code by Daniel Shiffman
 * http://natureofcode.com
 * accessed Saturday April 5 2014
 */

/////////////////////////////////////////////////////////////////////////////////////////////////
// ANTCOLONY PROGRAM ////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//
//instance of antHome - Home
Home antHome;
//instance for the Predator's home - PredatorHome
Home predatorHome;
//instance of type Land
Land land;
//instance of type Colony
Colony colony;
//instance of the Predator
Predator predator;
//biscuit instance of type FoodSource
FoodSource biscuit;
//sugar instance of type FoodSource
FoodSource sugar;
//toxic instance of type FoodSource
FoodSource toxic;
//instance of the Menu
Menu menu;

///////////////////////////////////////////////////////////
//intialization environment 
///////////////////////////////////////////////////////////
void setup() {
  size(1200, 800);
  //initial AntHome instance position & diameter
  antHome = new AntHome(new PVector(100, 100), 30);
  //initial PredatorHome instance position & diameter
  predatorHome = new PredatorHome(new PVector(width/1.1, height/1.7), 10);
  //there are 3 separate instances for FoodSource
  //initial FoodSource biscuit instance position and size
  biscuit = new FoodSource(new PVector(width/2, height/5), 25);
  //initial FoodSource sugar instance position and size
  sugar = new FoodSource(new PVector(width/2, height/2), 25);
  //initial FoodSource toxic instance position and size
  toxic = new FoodSource(new PVector(width/2, height/3), 25);
  //initial Predator instance position
  predator = new Predator(new PVector(predatorHome.origin.x, predatorHome.origin.y - 20));
  //initial ants colony position, which is the same as that of the Home
  colony = new Colony(antHome, predator, predatorHome);
  //initial menu position
  menu = new Menu(new PVector(0, height), predator, colony);
  //initializtion of the Land instance
  land = new Land();
}
///////////////////////////////////////////////////////////
//looping environment 
///////////////////////////////////////////////////////////
void draw() {
  ///////////////////////
  //Backgrounds
  //////////////////////
  //a function of the Land that draws the background
  land.displayLand();
  //a function that draws the texture of the soil
  land.texture();
  //displays the home of the predator at the bootom right of the screen
  predatorHome.display();
  //displays the home of the ants
  antHome.display();
  ///////////////////////
  //Menu functions
  //////////////////////
  //displays the menu bar
  menu.displayBar();
  //displays the predator icon
  menu.displayPredator();
  //displays the ant icon
  menu.displayAnt();
  //displays the food icons 
  menu.displayFoodMenu();
  //display biscuit when biscuit is selected
  menu.addBiscuitFromMenu(mouseX, mouseY, biscuit);
  //display sugar when biscuit is selected
  menu.addSugarFromMenu(mouseX, mouseY, sugar);
  //display toxic when biscuit is selected
  menu.addToxicFromMenu(mouseX, mouseY, toxic);
  //displays the reset menu button
  menu.reset();
  ///////////////////////
  //Colony functions
  //////////////////////
  //run all the functionalities of the ants
  colony.run(menu, biscuit, sugar, toxic);
  //display the ants colony
  colony.displayColony(menu);
  //lets the ant be eaten by the predator
  colony.eatenByPredator(predator);
  ///////////////////////
  //Predator functions
  //////////////////////
  //when the predator is released from the menu or hidden/unhidden
  if (menu.showPredator()) {
    //run the predator's functionalities
    predator.run();
    //makes the predator attack the ants
    predator.attackAnts(colony.getAnts());
    //displays the predator
    predator.display();
  }
}

///////////////////////
// mouse events function 
///////////////////////
void mousePressed() {
  //whenever the ant icon on the menu is clicked a new ant will be released from its home
  colony.addAnt(menu);
  //makes the food icons of the menu selectable
  menu.mousePressed(mouseX, mouseY, biscuit, sugar, toxic);
  //as long as the mouse y  position is above the menu
  //new foodsource can be added into the window.
  if (mouseY < menu.location.y - 160) {
    //create a new biscuit instance everytime the mouse is clicked
    //and if the the biscuit was selected from the menu
    if (menu.selectBiscuit) {
      biscuit = new FoodSource(new PVector(mouseX, mouseY), 25);
    }
    //create a new sugar instance everytime the mouse is clicked
    //and if the the biscuit was selected from the menu
    if (menu.selectSugar) {
      sugar = new FoodSource(new PVector(mouseX, mouseY), 25);
    }
    //create a new toxic instance everytime the mouse is clicked
    //and if the the biscuit was selected from the menu
    if (menu.selectToxic) {
      toxic = new FoodSource(new PVector(mouseX, mouseY), 25);
    }
  }
}

