/*
  this class generates a number of ants based on the  Ant class
 it creates an ArrayList of Ants and adds and deletes ants as well as 
 it manages all the functions that belong to the Ant class
 */
class Colony {
  //instantiation of ants as an arraylist of type Ant
  ArrayList<Ant> ants;
  //declares a PVector for the araylist location
  PVector location;
  //manages the number of ants
  final int antNum;
  //the Home of the ant
  Home antHome;
  //the home of the Predator
  Home predatorHome;
  //the predator
  Predator predator;
  //home Pheromone
  Pheromone pheromoneHome;
  //food Pheromone
  Pheromone pheromoneFood;
  //toxic pheromone
  Pheromone pheromoneToxic;
  //the ant
  Ant ant;
  //a food particle an instance of the Food class
  Food foodParticle;
  //is the food is toxic
  boolean isToxicFood;


  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //antHome: where the ants start their initial position and the wander around foraging
  //when they find food they follow the home Pheromone to home
  //when they reach home the ant is removed and a new ant is created
  //predator: 1 methods that belong to the class predator are called in the colony class
  //the method: predator.fleeFromAnts(ants, predatorHome, m);
  //this method makes the predator flee from the ants when 
  //it is at proximity of more than 3
  //the predator is also linked to the 2 methods
  // attackPredator(predator, ants) & fleePredator(predator)
  //which make the ants attack the predator and flee from it
  //predatorHome: this method is called in this method:
  //predator.fleeFromAnts(ants, predatorHome, m);
  //where it is used to make the predator go back to its home when attacked by ants
  //and it is used in antTrapped(predatorHome) method
  //where the ant will be trapped if it gets into the predator home
  Colony(Home antHome, Predator predator, Home predatorHome) {
    //initial value determined by the constructor
    //the linked parameters will be used in the colony methods
    //links the colony to the home of ants
    this.antHome = antHome;
    //links the predator to the constructor
    this.predator = predator;
    //links the colony to the predator Home
    this.predatorHome = predatorHome;
    //the initial location of the colony has the 
    //same coordinates as those of the Home
    location = antHome.origin.get();
    //initialization of ants as an arraylist of type Ant
    ants = new ArrayList<Ant>();
    //1 new ant instance 
    ant = new Ant(location);
    foodParticle = new Food();
    //initial number of ants 
    //more ants can be added from the menu
    //the maximum number of ants that can be added is 10
    //the total is 40
    antNum = 30;
    //initialization of the home, food and toxic pheromones
    //and give them approprite lengths for each
    pheromoneHome = new PheromoneHome(5000);
    pheromoneFood = new PheromoneFood(2000);
    pheromoneToxic = new PheromoneToxic(500);
    //still the ant doesn't know whether the ant is toxic
    isToxicFood = false;
    //add all the ants at the setup() where the constructor is called
    addAnt();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method generates new ants based on the  
  //location of the class Ant which is added to the arraylist ants
  void addAnt() {
    for (int i = antNum - 1; i >= 0; i--) {
      ants.add(new Ant(location, pheromoneHome.getTrail(), pheromoneFood.getTrail(), pheromoneToxic.getTrail()));
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method generates new ants based on the  
  //location of the class Ant which is added to the arraylist ants
  //in addition this method offers the ability to specify the number of ants
  //that should be added. It is used to add ants from the menu
  void addAnt(int num) {
    for (int i = 0; i < num; i++) {
      ants.add(new Ant(location, pheromoneHome.getTrail(), pheromoneFood.getTrail(), pheromoneToxic.getTrail()));
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method returns the ArrayList Ants whenever called
  ArrayList<Ant> getAnts() {
    return ants;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method runs all the functions that are specific to the class Ant
  void run(Menu menu, FoodSource biscuit, FoodSource sugar, FoodSource toxic) {
    for (int i = ants.size() - 1; i >= 0; i--) {
      //for every instance of type Ant apply to all the arraylist instances
      //calls the method from the Ant class and apply 
      //them to every instance of the arraylist Ants
      Ant a = ants.get(i);
      //if the ant picked up the toxic phoromone
      //then add the toxic pheromone
      if (a.hasToxic()) {
        a.addToxicPheromone();
      }
      //adds a food Pheromone if the ant has food
      //if it doesn't than add a home pheromone
      if (a.hasFood()) {
        a.addFoodPheromone();
      }
      else {
        a.addHomePheromone();
      }
      //this function updates the ants 
      //velocity and acceleration
      //it is called here and at the end of this method
      //so that it speeds up the animation.
      a.update();
      //evaporate the food and the home pheromones
      pheromoneFood.evaporate();
      pheromoneHome.evaporate();
      pheromoneToxic.evaporate();
      //check the windows edges
      a.checkEdges();
      //wanders randomly
      a.wander();
      //lets every ant go foraging 
      a.findFood(biscuit, sugar, toxic, isToxicFood);
      //delivers the food to home
      a.foodDelivery(antHome);
      //if the ant is looking food lets it detect the food pheromone
      a.findFoodPheromone(biscuit, sugar, toxic);
      //if it has food (specified in the ant class) lets it detect the home pheromone
      a.findHomePheromone(antHome);
      //detect the toxic pheromone
      a.findToxicPheromone();
      //lets the ant flee the predator
      a.fleePredator(predator);
      //lets it attack the predato whenever possible
      a.attackPredator(predator, ants);
      //makes the predator flee from the ants
      predator.fleeFromAnts(ants, predatorHome, menu);
      //lets the enter its home when at proximity form it
      a.reachHome(antHome);
      //lets the ants be trapped if it enters the predator home
      a.antTrapped(predatorHome);
      //that is the second time that the update is called
      a.update();
      //if the ant is intoxicated
      //remove it from the arraylist
      //and change the pheromone color
      if (a.isIntoxicated()) {
        ants.remove(i);
        isToxicFood = true;
      }
      //if the ant is trapped and the predator still is unreleased
      //then the ant ant will die (be removed) because the predator will eat it 
      if (a.antTrapped() && menu.hidePredator()) {
        a.lifeSpan -= 20;
        ants.remove(i);
      }
      //if the and reaches home
      //it will be removed and another ant will relace it.
      if (a.reachHome(antHome)) {
        //decrement its opacity until it reaches 0 
        //and then remove it from the arraylist
        a.lifeSpan -= 20;
        if (a.lifeSpan <= 0) {
          ants.remove(i);
          addAnt(1);
        }
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant get eaten by the predator when it attacks it
  void eatenByPredator(Predator predator) {
    for (int  i = ants.size() -1; i >= 0; i--) {
      Ant a = ants.get(i); 
      //sets the distance between the location of the ant and the location of food
      PVector distance = PVector.sub(a.location, predator.location);
      //sets the magnitude of the vector
      float d = distance.mag(); 
      if (d < 30 && !a.attackPredator()) {
        ants.remove(i);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is related to the ant icon on the menu
  //when the ant icon is clicked 1 ant is added
  //the maximum number of ants that can exist is 40
  void addAnt(Menu menu) {
    if (menu.addAnt() && ants.size() < 40) {
      addAnt(1);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the colony 
  void displayColony(Menu menu) {
    for (int i = ants.size() - 1; i >= 0; i--) {
      Ant a = ants.get(i); 
      a.display();
      //when an ant picks up food the food unit will be removed from 
      //the FoodSource ArrayList and replaced with an independent food particle
      //if the ant picked the food and still haven't reached its home
      //then color the food particle as per the food that the ant picked
      //and display the food particle that the ant is carrying
      //if an ant picked up biscuit a particle with the biscuit color will replace it
      if (a.hasBiscuit() && !a.reachHome(antHome)) {
        foodParticle.setFoodColor(true, 1);
        a.displayCarriedFood();
      }
      //if an ant picked up sugar a particle with the sugar color will replace it
      if (a.hasSugar() && !a.reachHome(antHome)) {
        foodParticle.setFoodColor(true, 2);
        a.displayCarriedFood();
      }
      //if an ant picked up toxic a particle with the toxic color will replace it
      if (a.hasToxic() && !a.reachHome(antHome)) {
        foodParticle.setFoodColor(true, 3);
        a.displayCarriedFood();
      }
    }
    //displays the home pheromone, the food pheromone and toxic pheromone 
    pheromoneHome.display();    
    pheromoneFood.display();
    pheromoneToxic.display();
  }
}

