/*
  this class draws the home or the origin point 
 it is the parent to two subclasses: 
 PredatorHome and AntHome
 */
abstract class Home {
  //the x and y coordinates
  PVector origin;
  //the size of the home
  final int diameter;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //it takes as a parameter an x and y position
  //the Colony class borrow these coordinates 
  //so that the ants will be generated from home
  //and return home after finding food
  Home(PVector origin, int diameter) {
    //initial x and y position point
    this.origin = origin.get();
    //initial circle size
    this.diameter = diameter;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //the method returns the diameter of the home whenever called
  int getDiameter() {
    return diameter;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws the home as a black ellipse
  void display() {
    //the surrounding faded sand 
    for (int i = 255; i>0; i-=10) {
      strokeWeight(0.5);
      fill(100, 70, 10, 150 - i);
      ellipse(origin.x, origin.y, diameter + i, diameter + i);
    }
    //the black hole
    fill(50, 30, 0);
    ellipse(origin.x, origin.y, diameter, diameter);
  }
}

