/*
  this class is a subclass of the parent class Pheromone
 it draws the pheromone trails pheromoneHome specific to 
 the ant's foraging behavior that starts from Home
 */
class PheromoneHome extends Pheromone {
  //the RGB values of the home pheromones
  final int pherHomeR;
  final int pherHomeG;
  final int pherHomeB;
  //stores the RGB values
  final color pherHomeColor;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //this subclass constructor only calls that of the parent class
  //which is the size
  PheromoneHome(int size) {
    //gets the size of the parent
    super(size);
    //initial  values of the RGB stored in pherFoodColor
    pherHomeR = 0;
    pherHomeG = 0;
    pherHomeB = 0;
    pherHomeColor = color(pherHomeR, pherHomeG, pherHomeB);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the same pheromone as the parent class
  //but only overrides the stroke color 
  //which is taking the home pheromones color
  void display() {
    stroke(pherHomeColor, lifeSpan);
    super.display();
  }
}

