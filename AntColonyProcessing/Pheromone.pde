/*
  this class is amaster class for the two subclasses PherFood and PherHome
 this class is responsible for drawing the pheremone trails behind the ant
 it should also remembers origin and destination it traveled so that ican 
 serve as a guide to other ants to follow
 */
abstract class Pheromone {
  //instatiation of the trail as an arrylist of type PVector
  ArrayList<PVector> trail;
  //the size of the trail
  int pheromoneSize;
  //the location vector of the trail
  PVector location;
  //the opacity of the trail that can be decremented 
  //in order to make the pheromones disappear
  float lifeSpan;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //takes the size as a parameter
  //through the construnctor the size of the trail is determined
  Pheromone(int pheromoneSize) {
    //the size will be determined by the constructor
    this.pheromoneSize = pheromoneSize;
    //the trail is an arraylist of type PVector
    trail = new ArrayList<PVector>();
    //initial value of the trail opacity
    lifeSpan = 15;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //returns the ArrayList trail
  //this is used in the Ant class
  //in order to load the ant's location into the ArryList
  //and create the pheromones
  ArrayList<PVector> getTrail() {
    return trail;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method removes each trail from the arraylist
  void evaporate() {
    if (trail.size() > pheromoneSize) { 
      if (lifeSpan > 10) {
        lifeSpan *= 0.999;
        trail.remove(0);
      }
      lifeSpan += 0.01;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the trail as point (vertex) that is added one after the other
  //to form a trail
  void display() {
    //sets the stroke size
    strokeWeight(3);
    //for every particle of the arraylist draw the vertex to form a trail
    for (int i = 0; i < trail.size(); i++) {
      PVector v = trail.get(i);
      point(int(v.x), int(v.y));
    }
  }
}

