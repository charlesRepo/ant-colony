/*
This class is the subClass for the parent class Home
 it displays the home of the Ants
 according to a location and diameter determined in the constructor
 */
class AntHome extends Home {

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //the PVector location (x&y) and the diameter are determined 
  //by the constructor 
  AntHome(PVector origin, int diameter) {
    super(origin, diameter);
  }
  /////////////////////////////////////////////////////////////////////////////////
  //displays the home of the Ant
  //same as the parent class
  void display() {
    super.display();
  }
}

