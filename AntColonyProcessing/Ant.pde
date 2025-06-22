/*
  This class is the major class of the project
 it defines the major element which is the ant and its functionalities.
 The Ant's location velocity and acceleration are PVectors. 
 It starts from an original location which is the same as that of the Home.
 It wanders around searching for food using the wander() and seek() methods.
 When searching for food it leaves behind it a Food Pheromone - foodPher.
 when it finds food it goes directly to and slowly aprroaches the food source 
 with the arrive()method,it picks up the food particle 
 and then goes directly back to Home using the findFood() method.
 when going back Home it releases food Pheromone - foodPher, in order to alert 
 other ants about the food source.
 it deposits the food at Home and then goes back foraging again.
 */
class Ant {
  //the x and y position of the ant
  PVector location;
  //pushes the ant into moving the location
  PVector velocity;
  //pushes the ant into speeding the velocity
  PVector acceleration;
  //the width and height of the ant
  final float wSize;
  final float hSize;
  final float offset;
  //the area of the ant (w*h)
  final float antSize;
  //the maximum and minimum velocity
  float maxSpeed;
  float minSpeed;
  //the maximum steering force of the ant
  float maxForce;
  //the directional angle of the ant's movement
  float head;
  //the angle that determine the ant's wandering behavior
  float wandertheta;
  //the ant's mass
  final float mass;
  //the ant's RGB variables
  final int antR;
  final int antG;
  final int antB;
  //the RGB are stored in the antColor variable
  final color antColor;
  //stores the the opacity of the ant's color 
  //that can be decremented to make the ant disappear
  int lifeSpan;
  //sets the borders of the window
  final int border;
  //radius of the desired location
  int r;
  //homeTrail, foodTrail, and toxicTrail instances of the type ArrayList PVector
  //they will store the ants location that will be passed to the pheromones
  ArrayList<PVector> homeTrail;
  ArrayList<PVector> foodTrail;
  ArrayList<PVector> toxicTrail;
  //checks whether to attack the predator or not
  boolean attackPredator;
  //checks whether the ant is trapped
  boolean antTrapped;
  //checks whether the ant has food
  boolean hasFood;
  //checks whether the ant has picked up biscuit
  boolean hasBiscuit;
  //checks whether the ant has picked up sugar
  boolean hasSugar;
  //checks whether the ant has picked up sugar
  boolean hasToxic;
  //checks whether the ant is intoxicated
  boolean intoxicated;
  //checks whether the food is toxic
  boolean isToxic;
  
  ////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //location: determines the initial location of the ant - it starts from its home
  //the homeTrail: lets the ant input its location when searching for food, to the arraylist trail borrowed from the pheromone class
  //foodTrail: lets the ant input its location when it obtains food to the arraylist trail borrowed from the pheromone class
  //toxicTrail: lets the ant input its location if it obtained a toxic food into to the arraylist trail borrowed from the pheromone class
  Ant(PVector location, ArrayList<PVector>homeTrail, ArrayList<PVector>foodTrail, ArrayList<PVector>toxicTrail) {
    //values received through the constructor
    //initial location  
    this.location = location.get();
    //the initial value of the homeTrail, foodTrail and toxicTrail arraylists
    this.homeTrail = homeTrail;
    this.foodTrail = foodTrail;
    this.toxicTrail = toxicTrail;
    //initial acceleration
    acceleration = new PVector(0, 0);
    //initial velocity with random values - 
    //the ant is not always moving with the same speed
    velocity = new PVector(random(-5, 5), random(-5, 5));
    //initial wandering angle
    wandertheta = 0;
    //the height is double the width
    wSize = 4;
    hSize = wSize * 2;
    offset = wSize / 2.5;
    antSize = wSize * hSize;
    //maximum velocity
    maxSpeed = 3;
    //minimum velocity
    minSpeed = 2.5;
    //maximum force
    maxForce = 0.6;
    //the mass of the ant 
    //it can be between 3.5 and 5.5
    mass = 3;
    //an initial black color is given to the ant
    antR = 40;
    antG = 10;
    antB = 0;
    antColor = color(antR, antG, antB);
    //an initial value of full color is given 
    //and from there it will be decremented until it reaches 0 (transparent)
    lifeSpan = 255;
    //initial margin of 20 for the borders of the window
    border = -10;
    //initial desired velocity radius
    r = 50;
    //the ant doesn't attack the predator at the start
    attackPredator = false;
    //is the ant intoxicated
    intoxicated = false;
    isToxic = false;
    //is the ant trapped
    antTrapped = false;
    //initially the ant doesn't have any food
    //so all food are false
    hasFood = false;
    hasBiscuit = false;
    hasSugar = false;
    hasToxic = false;
  }

  //SECOND CONSTRUCTOR
  //the constructor takes a location PVector as a variable
  //this value determines the initial position of the ant
  //it was created to be used in the menu class with only the location as a parameter
  Ant(PVector location) {
    //values received through the constructor
    //initial location  
    this.location = location.get();
    //the initial value of the homeTrail and foodTrail arraylists
    this.homeTrail = homeTrail;
    this.foodTrail = foodTrail;
    //initial acceleration
    acceleration = new PVector(0, 0);
    //initial velocity with random values - 
    //the ant is not always moving with the same speed
    velocity = new PVector(random(-5, 5), random(-5, 5));
    //initial wandering angle
    wandertheta = 0;
    //the height is double the width
    wSize = 4;
    hSize = wSize * 2;
    offset = wSize / 2.5;
    antSize = wSize * hSize;
    //maximum velocity
    maxSpeed = 3;
    //minimum velocity
    minSpeed = 2.5;
    //maximum force
    maxForce = 0.4;
    //the mass of the ant 
    //it can be between 3.5 and 5.5
    mass = 3;
    //an initial black color is given to the ant
    antR = 40;
    antG = 10;
    antB = 0;
    antColor = color(antR, antG, antB);
    //an initial value of full color is given 
    //and from there it will be decremented until it reaches 0 (transparent)
    lifeSpan = 255;
    //initial margin of 20 for the borders of the window
    border = -10;
    //initial noise value
    //the ant doesn't have food at the beginning 
    hasFood = false;
    //initial desired velocity radius
    r = 50;
    //the ant doesn't attack the predator at the start
    attackPredator = false;
    //is the ant intoxicated
    intoxicated = false;
    //is the ant trapped
    antTrapped = false;
    hasBiscuit = false;
    hasSugar = false;
    hasToxic = false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //METHODS////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  //this method controls the movement of the ant 
  //according to the maximum velocity
  void update() {
    //add the acceleration to the velocity
    velocity.add(acceleration);
    //limit speed
    velocity.limit(maxSpeed);
    location.add(velocity);
    //reeset accelertion to 0 each cycle
    acceleration.mult(0);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method receives outside forces and apply them to the ants movement
  //A = F/M
  void applyForce(PVector force) {
    PVector f =  force.get();
    f.div(mass);
    acceleration.add(f);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant deposit its location where its coordinates
  //will be inserted into the ArrayList of home trail and 
  //accordingly the home pheromone will be created
  void addHomePheromone() {
    PVector v = location.get();
    homeTrail.add(v);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant deposit its location where its coordinates
  //will be inserted into the ArrayList of Food trail and 
  //accordingly the food pheromone will be created
  void addFoodPheromone() {
    PVector v = location.get();
    foodTrail.add(v);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant deposit its location where its coordinates
  //will be inserted into the ArrayList of Food trail and 
  //accordingly the toxic pheromone will be created when the ant picks up toxic food
  void addToxicPheromone() {
    PVector v = location.get();
    toxicTrail.add(v);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant seek a random target which gives it 
  //a random movement in looking for food 
  //it creates a random circular space around the ants with a vector circLeloc that has a random
  //angle wandertheta and a target that is randomly placed around the circumference of the circle
  void wander() {
    // Radius for our "wander circle"
    float wanderR = 25;
    // Distance for our "wander circle"
    float wanderD = 10;
    float change = 3;
    // Randomly change wander theta
    wandertheta += random(-change, change);
    // Now we have to calculate the new location to steer towards on the wander circle
    // Start with velocity
    PVector circleLoc = velocity.get(); 
    // Normalize to get heading   
    circleLoc.normalize(); 
    // Multiply by distance    
    circleLoc.mult(wanderD);
    // Make it relative to boid's location    
    circleLoc.add(location);          
    // We need to know the heading to offset wandertheta
    float h = velocity.heading();   
    //polar to cartesian but we are also adding the heading to the theta
    PVector circleOffSet = new PVector(wanderR * cos(wandertheta + h), wanderR * sin(wandertheta + h));
    PVector target = PVector.add(circleLoc, circleOffSet);
    //apply this target to the seek method 
    seek(target);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //the seek method allows the ant to perceive a desired target 
  //and to direct its movement towards this target 
  void seek(PVector target) {
    //the desired velocity is the diference between future location and the current location
    PVector desired = PVector.sub(target, location);
    float r = random(minSpeed, maxSpeed);
    //normalized and multiplied by a normal value
    desired.setMag(r);
    //the steering is simply the difference between desired and current velocity
    PVector steer = PVector.sub(desired, velocity);
    //limits the steering force
    steer.limit(maxForce);
    //the steering force is applied to the applyForce method
    applyForce(steer);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //the flee method lets the ant flee whenever a danger is around
  //it accepts the target as an argument
  //the target is usually the predator
  void flee(PVector target) {
    //the desired velocity is the diference between future location and the current location
    PVector desired = PVector.sub(location, target);
    float r = random(minSpeed, maxSpeed);
    //normalized and multiplied by a normal value
    desired.setMag(r);
    //the steering is simply the difference between desired and current velocity
    PVector steer = PVector.sub(desired, velocity);
    //limits the steering force
    steer.limit(maxForce);
    //the steering force is applied to the applyForce method
    applyForce(steer);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant flee from the predator if the distance between the ant
  //and the predator got too close.
  void fleePredator(Predator p) {
    //sets the distance between the location of the ant and the location of food
    PVector distance = PVector.sub(location, p.location);
    //sets the magnitude of the vector
    float d = distance.mag(); 
    //sets the food as the new target with initial 
    //location thesame as the food coordinates
    PVector target = new PVector(p.location.x, p.location.y);
    //does the ant have food and how far awy is it from the target?
    //if it doesn't have food and its position is less than 100 px from the target
    // then fetch and approach slowly the target
    if (d < 100) {
      flee(target);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method checks whether the predator can be attacked or not
  boolean attackPredator() {
    if (attackPredator) {
      return true;
    }
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant attack the predator when
  //the number of ants is over 3
  //predator predator: is the target that is going to be attacked by the ant
  //the distance is measured from the ant's location to the predator 
  //and depending on this distance and on the number of ants available in this distance
  //the ant will decide to attack the predator 
  //ants: is the arraylist of ants, this parpameter is introduced in order to make every ant recognize
  //it is surrounding ants. if the average number of ants is greater than 3, then the ants will decide to
  //attack the predator if it was at a proximity from them
  //this code was taken from the Nature of Code by David Shiffman
  //and it was further modified in order to better suite this project
  //accessed on the 29 March 2014
  void attackPredator(Predator predator, ArrayList<Ant> ants) {
    float desiredseparation = r * 2;
    PVector sum = new PVector();
    int count = 0;
    //sets the distance between the location of the ant and the location of food
    PVector distance = PVector.sub(location, predator.location);
    //sets the magnitude of the vector
    float distanceFromTarget = distance.mag(); 
    //sets the food as the new target with initial 
    //location thesame as the food coordinates
    PVector target = new PVector(predator.location.x, predator.location.y);
    //does the ant have food and how far awy is it from the target?
    //if it doesn't have food and its position is less than 100 px from the target
    // then fetch and approach slowly the target
    for (Ant other : ants) {
      float d = PVector.dist(location, other.location);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        //calculate vector pointing away from neighbor
        PVector diff = PVector.sub(location, other.location);
        diff.normalize();
        //weight by distance
        diff.div(d);        
        sum.add(diff);
        //keep track of how many
        count++;
      }
    }
    //if the number of ants around the predator is larger than 3
    //and the distance is less than 300 
    //then the ant can attack the predator 
    if (count > 3 && distanceFromTarget < 300) {
      attackPredator = true;
      seek(target);
      maxSpeed = 5;
      fill(255, 0, 0, 50);
    }
    else {
      attackPredator = false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant be trapped if it enters the Predator home
  //and eventually it will be removed in the Colony class
  void antTrapped(Home ph) {
    //sets the distance between the location of the ant and the location of food
    PVector distance = PVector.sub(location, ph.origin);
    //sets the magnitude of the vector
    float d = distance.mag(); 
    //sets the food as the new target with initial 
    //location thesame as the food coordinates
    PVector target = new PVector(ph.origin.x, ph.origin.y);
    //if the position of the ant is less than 30 px from the target
    //it will be tempted to enter the predator home
    //once there its speed will decrease and it will be trapped 
    if (d < 30) {
      arrive(target);
      if (d < 10) {
        antTrapped = true;
        maxForce *= 0.99;
      }
    }
    else {
      //nothing happens
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method returns a true value if the ant was trapped
  boolean antTrapped() {
    return antTrapped;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant detect the location of the food pheromone at a certain distance
  //every type of food has its pheromone
  //once detected the ant will be able to seek food as a target
  //PS:this is not the best accurate solution
  void findFoodPheromone(FoodSource biscuit, FoodSource sugar, FoodSource toxic) {
    for (int i = foodTrail.size() -1; i >= 0; i--) {
      PVector v = foodTrail.get(i);
      //sets the distance between the location of the ant and the location of food
      PVector distance = PVector.sub(location, v);
      //sets the magnitude of the vector
      float d = distance.mag();
      //set 3 different targets
      //a target fo every kind of pheromone
      PVector targetBiscuit = new PVector(biscuit.location.x, biscuit.location.y);
      PVector targetSugar = new PVector(sugar.location.x, sugar.location.y);
      PVector targetToxic = new PVector(toxic.location.x, toxic.location.y);
      //if it is close to a pheromone fetch biscuits 
      if (!hasFood && d < 10 && biscuit.grid.size() > 0) {
        arrive(targetBiscuit);
        //resets the arraylist of the foodTrail
        //so that the ants will ignore its proximity 
        //and focus on the target
        i = 0;
      }
      //if it is close to a pheromone fetch sugar 
      if (!hasFood && d < 10 && sugar.grid.size() > 0) {
        arrive(targetSugar);
        //resets the arraylist of the foodTrail
        //so that the ants will ignore its proximity 
        //and focus on the target
        i = 0;
      }
      //if it is close to a pheromone fetch toxic
      //but if an ant has been intoxicated then flee target 
      if (!hasFood && d < 10 && toxic.grid.size() > 0) {
        if (intoxicated) {
          flee(targetToxic);
        }
        else {
          arrive(targetToxic);
        }
        //resets the arraylist of the foodTrail
        //so that the ants will ignore its proximity 
        //and focus on the target
        i = 0;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant detect the location of the home pheromone at a certain distance
  //once detected the ant will be able to seek home as a target
  //although this is not the best accurate solution, but it immitates the ants behavior
  void findHomePheromone(Home home) {
    for (int i = homeTrail.size() -1; i >= 0; i--) {
      PVector v = homeTrail.get(i);
      //sets the distance between the location of the ant and the location of food
      PVector distance = PVector.sub(location, v);
      //sets the magnitude of the vector
      float d = distance.mag();
      PVector target = new PVector(home.origin.x, home.origin.y);
      //PVector target = new PVector(v.x, v.y);//folows the trail in the wrong direction :)
      if (hasFood && d < 10) {
        arrive(target);
        //resets the arraylist of the homeTrail
        //so that the ants will ignore its proximity 
        //and focus on the target
        i = 0;
      }
    }
  }


  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant detect the location of the toxic pheromone at a certain distance
  //once detected the ant will flee from it
  void findToxicPheromone() {
    for (int i = toxicTrail.size() -1 ; i >= 0; i--) {
      PVector v = toxicTrail.get(i);
      //sets the distance between the location of the ant and the location of food
      PVector distance = PVector.sub(location, v);
      //sets the magnitude of the vector
      float d = distance.mag();
      PVector target = new PVector(v.x, v.y);
      //PVector target = new PVector(v.x, v.y);//folows the trail in the wrong direction :)
      if (hasFood && d < 10) {
        flee(target);
        //resets the arraylist of the homeTrail
        //so that the ants will ignore its proximity 
        //and focus on the target
        i = 0;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //does the ant has food?
  //this method is called in the colony class and else where
  //to check whether the ant has food or not
  boolean hasFood() {
    if (hasFood) {
      return true;
    }
    else {
      return false;
    }
  }
  //The following methods are used in the colony class for 
  //detecting which type of food the ant is carrying
  //returns true if the ant has biscuit
  boolean hasBiscuit() {
    if (hasBiscuit) {
      return true;
    }
    else {
      return false;
    }
  }
  //returns true if the ant has sugar
  boolean hasSugar() {
    if (hasSugar) {
      return true;
    }
    else {
      return false;
    }
  }
  //returns true if the ant has toxic
  boolean hasToxic() {
    if (hasToxic) {
      return true;
    }
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method lets the ant detect the food when it approaches at a certain distance from it
  //the ant wanders around looking for food
  //if food is selected and the ant smells the food
  //it arrive() to the food source
  //every food source has a certain smell intensity and effect that affect the ant
  //biscuit, sugar, toxic: are instances of the FoodSource class. The ant will be able to destect each kind of food 
  //and react according to ech kind of food differently
  //it can detect the sugar from a longer distance than the biscuit
  //and the toxic food will kill the ant if it carries it
  //isToxicFood: is the food toxic? this will be determined in the Colony class
  //based on whether the ant was intoxicated upon picking it up
  void findFood(FoodSource biscuit, FoodSource sugar, FoodSource toxic, boolean isToxicFood) {
    //sets the distance between the location of the ant and the location of the 3 different kind of foods
    PVector distanceToBiscuit = PVector.sub(location, biscuit.location);
    PVector distanceToSugar = PVector.sub(location, sugar.location);
    PVector distanceToToxic = PVector.sub(location, toxic.location);
    //sets the magnitude of the vector between the ant and the food types
    float db = distanceToBiscuit.mag(); 
    float ds = distanceToSugar.mag();
    float dt = distanceToToxic.mag();
    //sets the biscuit as a target
    PVector targetBiscuit = new PVector(biscuit.location.x, biscuit.location.y);
    //sets the sugar as a target
    PVector targetSugar = new PVector(sugar.location.x, sugar.location.y);
    //sets the toxic as a target
    PVector targetToxic = new PVector(toxic.location.x, toxic.location.y);

    ///////////////Biscuit///////////////
    //if biscuit was selected from the menu
    //and if the ant does't have food then the ant will fetch the target
    if (biscuit.noFood()) {
      if (biscuit.grid.size() > 0) {
        //does the ant have food and how far away is it from the target?
        //if it doesn't have food and its position is less than 100 px from the target
        // then fetch and approach slowly the target
        if (!hasFood && db < 100) {
          arrive(targetBiscuit);
        }
        //when the ant gets really close to the target 
        //it picks up the target
        if (db < 20 && !hasFood) {
          biscuit.eatFood(location);
          if (biscuit.hasParticle()) {
            hasBiscuit = true;
            hasFood = true;
          }
        }
      }
    }
    ///////////////Sugar///////////////
    //if sugar was selected from the menu
    //and if the ant does't have food then the ant will fetch the target
    if (sugar.noFood()) {
      if (sugar.grid.size() > 0) {
        //does the ant have food and how far away is it from the target?
        //if it doesn't have food and its position is less than 200 px from the target
        //then fetch and approach slowly the target
        if (!hasFood && ds < 200) {
          arrive(targetSugar);
        }
        //when the ant gets really close to the target 
        //it picks up the target
        if (ds < 20 && !hasFood) {
          sugar.eatFood(location);
          if (sugar.hasParticle()) {
            hasSugar = true;
            hasFood = true;
          }
        }
      }
    }
    ///////////////Toxic///////////////
    //if toxic was selected from the menu
    //and if the ant does't have food then the ant will fetch the target
    if (toxic.noFood()) {
      //if the grid is not empty
      if (toxic.grid.size() > 0) {
        //if it doesn't have food and its position is less than 100 px from the target
        //then fetch and approach slowly the target
        if (!hasFood && dt < 100) {
          arrive(targetToxic);
          if (isToxicFood) {
            //after knowing that the food is toxic flee the target
            flee(targetToxic);
          }
          //when the ant gets really close to the target 
          //it picks up the target
          if (dt < 20 && !hasFood) {
            //when the ant carries the food it realizes that it is toxic
            toxic.eatFood(location);
            if (toxic.hasParticle()) {
              hasToxic = true;
              isToxic = true;
              hasFood = true;
            }
          }
        }
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the ant deliver the food to its home
  void foodDelivery(Home home) {
    PVector distanceToHome = PVector.sub(location, home.origin);
    float dh = distanceToHome.mag(); 
    //if the ant has food it wanders
    if (hasFood) {
      wander();
      //if the food it carries is toxic 
      //it will be intoxicated and die
      if (isToxic) {
        wander();
        die();
      }         
      //if the ant is close to home 
      //arrive() at home
      if (dh < 300) {
        arrive(home.origin);
      }
    }
    else {
      wander();
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is called in order to simulate the death of the ant 
  //when it dies it slows down and wander and then disapears
  //and it will be removed in Colony class 
  //after the boolean intoxicated is set to true
  void die() {
    if (maxSpeed > 0) {
      maxSpeed *= 0.95;
      maxForce *= 0.95;
      wander();
    }
    if (lifeSpan > 0 && maxSpeed < 0.1) {
      lifeSpan *= 0.95;
      if (lifeSpan == 0)
        intoxicated = true;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //did the ant eat form the toxic food
  //if yes then the ant is intoxicated
  //returns true if intoxicated
  //this will make other ants know that the food is toxic
  //and they won't pickit up
  boolean isIntoxicated() {
    if (intoxicated) {
      return true;
    }
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is the same as the seek method 
  //while the seek method maintains the same velocity when it gets near to the target
  //the arrive method makes the ant slows down before reaching the target
  void arrive(PVector target) { 
    //first we start by subtracting the target location from the 
    //the actual location in order to know the desired PVector 
    PVector desired = PVector.sub(target, location);
    float d = desired.mag();
    //so here we are making the object think
    //that when its approaching the target it should slow down
    //and thatis by mapping the surrounding envi. around the target 
    //and affecting the setMag function of the desired velocity of the object.
    if (d < 100) {
      float m = map(d, 0, 100, 0, maxSpeed);
      desired.setMag(m);
    }
    //else maintain the same speed
    else {
      desired.setMag(maxSpeed);
    }
    //here we apply the formula where we subtract the actual velocity 
    //from the desired one
    PVector steer = PVector.sub(desired, velocity);
    //so after the Force of steering has been made
    //we introduce a maximum force so that we can control that force
    steer.limit(maxForce); 
    //we apply it to the applyforce function
    applyForce(steer);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method checks if the ant has reached home
  //it takes an instance of type Home as an argument
  //if it reached home then it is opacity will fade untill it disapears
  boolean reachHome(Home home) {
    //the distance vector between the ant's location and the home location
    PVector homeDist = PVector.sub(location, home.origin);
    //sets the magnitude of the vector
    float d = homeDist.mag();
    //if it has food and it is inside the home
    if (hasFood && d < home.getDiameter() - (antSize/3)) {
      //then return true
      return true;
    }
    //else return false
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws and replaces the food particle that is deleted
  //once the ant apprroaches and touches the FoodSource
  //creating the illusion that the ant picked up the food
  void displayCarriedFood() {
    //same rtational angle as that of the ant
    head = velocity.heading() - PI/2;
    pushMatrix();
    translate(location.x, location.y + wSize);
    rotate(head);
    rect(0, 0 + 10, 5, 5);
    popMatrix();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method calls the displayAnt method to draw the ant and specifies a heading angle value
  //in order to make the ant rotate at a certain direction
  void display() {
    //sets the heading angle
    head = velocity.heading() - PI/2;
    pushMatrix();
    translate(location.x, location.y + wSize);
    displayAnt(antColor, lifeSpan, head, random(wSize - (offset*offset), wSize), random(offset - wSize, wSize), random(-wSize - offset, offset - wSize));
    popMatrix();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method calls the displayAnt method to draw the Ant and 
  //displays the ant as an icon 
  //with a tilted angle
  void displayAntIcon(float x, float y, int value) {
    head = PI+QUARTER_PI;
    pushMatrix();
    translate(x, y);
    noStroke();
    displayAnt(color(150, 110, 40), setLifeSpan(value), head, 1, 0, -5);
    popMatrix();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is used in conjunction with the displayIcon method 
  //in order to set an alpha value to the ant icon 
  //whenever it is selected or unselected
  int setLifeSpan(int value) {
    lifeSpan = value;
    return lifeSpan;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws the different parts of the ant
  void displayAnt(color c, int lifeSpan, float rotation, float r1, float r2, float r3 ) {
    //sets the strokes
    strokeWeight(0.2);
    //sets the stroke and fill color and opacity
    stroke(c, lifeSpan);
    fill(c, lifeSpan);
    //rotates the ants according to the angle
    rotate(rotation);
    rectMode(CENTER);
    //draws left legs
    strokeWeight(wSize * 0.1);
    line(0, 0, wSize, r1);
    line(0, -offset, wSize, r2);
    line(0, offset - wSize, wSize, r3);
    //draws right legs
    strokeWeight(wSize * 0.1);
    line(0, 0, -wSize, r1);
    line(0, -offset, -wSize, r2);
    line(0, offset - wSize, -wSize, r3);
    //draws the antenas
    strokeWeight(offset*0.1);
    line(0, wSize, wSize - offset, wSize * offset + offset);
    line(0, wSize, offset - wSize, wSize * offset + offset);
    //draws the head
    ellipse(0, wSize, wSize * 1.2, wSize * 1.2);
    //draws the body
    ellipse(0, 0, wSize / (offset - 0.1), wSize / (offset - 0.1));
    ellipse(0, 0, wSize / offset, wSize / offset);
    ellipse(0, -wSize - offset, wSize, hSize);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method checks whether the ant has surpassed 
  //the edges of the window
  void checkEdges() {
    //if the ant's x location went beyond the width
    //then  its x location becomes the width
    //and its velocity is invesed
    if (location.x > width + border) {
      velocity.x--;
      location.x = width + border;
    }
    //if it went less than the border size
    //then its x location becomes the border value
    //and its velocity is invesed
    if (location.x < 0 - border) {
      velocity.x++;
      location.x = -border ;
    }
    //if the ant's y location went beyond the height
    //then its y location becomes the width
    //and its velocity is invesed
    if (location.y > height - 180) {
      velocity.y--;
      location.y = height - 180;
    } 
    //if it went less than the border size
    //then its y location becomes the border value
    //and its velocity is invesed
    else if (location.y < - border) {
      velocity.y++;
      location.y =  - border;
    }
  }
}

