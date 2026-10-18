/*
  this class is a subclass of the parent class Pheromone
 it draws the pheromone trails phromoneToxic 
 it is used by the ant to leave it on the ground
 to warn other about the toxic food 
 */
class PheromoneToxic extends Pheromone {
  //the RGB values of the toxic pheromones
  final int pherToxicR;
  final int pherToxicG;
  final int pherToxicB;
  //stores the RGB values
  final color pherToxicColor;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //this subclass constructor only calls that of the parent class
  //which is the size
  PheromoneToxic(int size) {
    //gets the size of the parent
    super(size);
    //initial  values of the RGB stored in pherFoodColor
    pherToxicR = 0;
    pherToxicG = 255;
    pherToxicB = 0;
    pherToxicColor = color(pherToxicR, pherToxicG, pherToxicB);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the same pheromone as the parent class
  //but only overrides the stroke color 
  //which is taking the home pheromones color
  void display() {
    stroke(pherToxicColor, lifeSpan);
    super.display();
  }
}

