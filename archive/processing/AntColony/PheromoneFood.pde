/*
  this class is a subclass of the parent class Pheromone
 it draws the pheromone trails pheromoneFood specific to 
 when the ant finds food and returns Home
 this class should alert the other 
 ants about the source of food
 and the other ants should be able to follow it untill they reach Food
 */
class PheromoneFood extends Pheromone {
  //the RGB values of the food pheromones
  final int pherFoodR;
  final int pherFoodG;
  final int pherFoodB;
  //stores the RGB values
  final color pherFoodColor;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //this subclass constructor only calls that of the parent class
  //which is the size
  PheromoneFood(int size) {
    //gets the size of the parent
    super(size);
    //initial  values of the RGB stored in pherFoodColor
    pherFoodR = 255;
    pherFoodG = 255;
    pherFoodB = 0;
    pherFoodColor = color(pherFoodR, pherFoodG, pherFoodB);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the same pheromone as the paren class
  //but only overrides the stroke color 
  //which is taking the food pheromones color
  void display() {
    stroke(pherFoodColor, lifeSpan);
    super.display();
  }
}

