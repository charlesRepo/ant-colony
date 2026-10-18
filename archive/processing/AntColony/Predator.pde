/*
this class draws the predator, generates a predator icon for the menu, animate the  the walk of the predator, 
 makes it chase ants whenever possible and/or run away from ants back to its home.
 This predator is an Antlion.
 */
class Predator {
  //the x and y of the predator
  PVector location;
  //pushes the predator into moving
  PVector velocity;
  //pushes the predator into speeding
  PVector acceleration;
  //the width and height of the predator
  final float wSize;
  final float hSize;
  //the predator's mass
  final float mass;
  //the area of the predator (w*h)
  float predatorSize;
  //the maximum and minimum velocity
  float maxSpeed;
  final float minSpeed;
  //maximum steering force
  float maxForce;
  //the directional angle of the predator's movement
  float head;
  //the angle that determine the predator's wandering behavior
  float wandertheta;
  //stores the the opacity decrementation of the predator's color
  int lifeSpan;
  //controls the visibility of the predator when it enters its home
  int appear;
  //sets the borders of the window
  final int border;
  //the predator's RGB variables
  final int predatorR;
  final int predatorG;
  final int predatorB;
  //the RGB are stored in the predatorColor variable
  final color predatorColor;
  //if the predator enters its home it disapears
  boolean disappear;
  //is the predator being attacked?
  boolean isAttacked;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //location: detrmines the predator's initial location 
  Predator(PVector location) {
    //initial location
    this.location = location.get();
    //initial acceleration
    acceleration = new PVector(0, 0);
    //initial velocity with random values - 
    //the predator is not always moving with the same speed
    velocity = new PVector(random(-5, 5), random(-5, 5));
    //initial wandering angle
    wandertheta = 0;
    //the height is double the width
    wSize = 20;
    hSize = wSize *2;
    //area of the predator
    predatorSize = wSize * hSize;
    //maximum velocity
    maxSpeed = 3.5;
    //minimum velocity
    minSpeed = 2.5;
    //maximum force
    maxForce = 0.5;
    //the mass of the predator 
    //it can be between 3.5 and 5.5
    mass = 10;
    //an initial black color is given to the predator
    predatorR = 150;
    predatorG = 140;
    predatorB = 110;
    predatorColor = color(predatorR, predatorG, predatorB);
    //an initial value of full color is given 
    //and from there it will be decremented until it reaches 0 (transparent)
    lifeSpan = 255;
    //initial margin of 20 for the borders of the window
    border = -10;
    //initial value of the predator visibility
    appear = 0;
    //the is not attacked initially
    isAttacked = false;
    //if the predator is under attack 
    //and it enters its home, disappear will be true 
    disappear = false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method run the functionalities of the predator
  void run() {
    update();
    checkEdges();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method updates the acceleration, velocity and location of the predator
  //that are responsible for making it move 
  //and it makes the predator wander around
  void update() {
    velocity.add(acceleration);
    // Limit speed
    velocity.limit(maxSpeed);
    location.add(velocity);
    // Reset accelertion to 0 each cycle
    acceleration.mult(0);
    //does the predator have food? if not than display the home pheromone
    wander();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method receives outside forces and apply them to the predator movement
  //A = F/M
  void applyForce(PVector force) {
    PVector f =  force.get();
    f.div(mass);
    acceleration.add(f);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the predator seek a random target which gives it 
  //a random movement in looking for food 
  //it creates a random circular space around the predators with a vector circLeloc that has a random
  //angle wandertheta and a target that is randomly placed around the circumference of the circle
  void wander() {
    //radius for our "wander circle"
    float wanderR = 25;
    // Distance for our "wander circle"
    float wanderD = 10;
    float change = 3;
    //randomly change wander theta
    wandertheta += random(-change, change);
    //now we have to calculate the new location to steer towards on the wander circle
    //start with velocity
    PVector circleLoc = velocity.get(); 
    //normalize to get heading   
    circleLoc.normalize(); 
    //multiply by distance    
    circleLoc.mult(wanderD);
    //make it relative to boid's location    
    circleLoc.add(location);          
    //we need to know the heading to offset wandertheta
    float h = velocity.heading();   
    //polar to cartesian but we are also adding the heading to the theta
    PVector circleOffSet = new PVector(wanderR * cos(wandertheta + h), wanderR * sin(wandertheta + h));
    PVector target = PVector.add(circleLoc, circleOffSet);
    //apply this target to the seek method 
    seek(target);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //the seek method allows the predator to perceive a desired target 
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
  //the flee method allows the predator to perceive a  target 
  //and to direct its movement away from this target 
  void flee(PVector target) {
    //the fleed velocity is the diference between the current location and future location 
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
  //this method makes the predator chase ants whenever it is on a proximity form them
  void attackAnts(ArrayList <Ant> ants) {
    for (Ant a: ants) {
      //sets the distance between the location of the ant and the location of food
      PVector distance = PVector.sub(location, a.location);
      //sets the magnitude of the vector
      float d = distance.mag(); 
      //sets the food as the new target with initial 
      //location thesame as the food coordinates
      PVector target = new PVector(a.location.x, a.location.y);
      //if the predator was at a certain distance from the ant
      // then it will maximize it speed and seek the ant
      if (d < 300) {
        maxSpeed = 15;
        seek(target);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method makes the predator flee away from ants whenever they are attacking it
  //and it makes it goes back into its home and disappear  if it aproached its home
  //if it was under attack by the ants
  void fleeFromAnts(ArrayList <Ant> ants, Home home, Menu menu) {  
    for (Ant a: ants) {
      //sets the distance between the location predator of that of ant 
      PVector distance = PVector.sub(location, a.location);
      //sets the magnitude of the vector
      float d = distance.mag(); 
      //sets the location of ant as the new target with 
      //but a taarget to flee from
      PVector target = new PVector(a.location.x, a.location.y);
      //if the predator is at a certain distance from its home
      //it goes into its home using the method enterHome() 
      //and disappears
      if (d < 50 && a.attackPredator()) {
        isAttacked = true;
        flee(target);
        enterHome(home, menu);
      }
      else {
        isAttacked = false;
        disappear = false;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //if the predator was under attack from the ants and it was at a 
  //certain distance from it home, it seeks its home and slowly disappears and it will be hidden
  void enterHome(Home home, Menu menu) {
    //the distance vector between the ant's location and the home location
    PVector homeDist = PVector.sub(location, home.origin);
    //sets the magnitude of the vector
    float d = homeDist.mag();
    //sets the food as the new target with initial 
    //location thesame as the food coordinates
    PVector target = new PVector(home.origin.x, home.origin.y);
    //if it has food and it is inside the home
    if (isAttacked && d < 300 ) {
      seek(target);
      //if it is under attack and got really close to its home then 
      //its appearence start to fade and then 
      //the predator is hidden
      if (isAttacked && d < 40) {
        appear *= 0.99;
        disappear = true;
        menu.hidePredator();
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //the display method display the predator as a moving object
  //it uses animated rotation and random movement of legs
  //where they are passed to the displayPredator() method
  void display() {
    if (appear<250) {
      appear += 10;
    }
    head = velocity.heading() - PI/2;
    pushMatrix();
    translate(location.x, location.y + 20);
    //rotates the ants according to the angle
    rotate(head);
    displayPredator(appear, random(99.7, 100), random(-149.5, -150), random(-2, 2));
    popMatrix();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the icon of the predator
  //it is called called in the Menu calss 
  //the movement of the predator is static
  void displayPredatorIcon(int value, float x, float y) {
    head = HALF_PI+QUARTER_PI ;
    pushMatrix();
    translate(x, y);
    //rotates the ants according to the angle
    rotate(head);
    displayPredator(value, 100, -150, 2);
    popMatrix();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws the parts of the predator 
  void displayPredator(int lifeSpan, float rotation1, float rotation2, float r) {
    println(wSize);
    println(hSize);
    pushMatrix();
    //left legs
    stroke(predatorColor, lifeSpan);
    strokeWeight(wSize/6);
    line(0, 0, wSize/1.5, -hSize/2.5);
    line(0, -hSize/8, wSize/1.5, r);
    //right legs
    line(0, 0, -wSize/1.5, -hSize/2.5);
    line(0, -hSize/8, -wSize/1.5, r);
    fill(predatorR -80, predatorG -80, predatorB -80, lifeSpan);
    noStroke();
    //left horn
    rotate(rotation1);
    ellipse(0, hSize/4, wSize/3, hSize/2.5);
    triangle(0, hSize/4, 0, hSize/2, -wSize/4, hSize/2);
    //right horn
    rotate(rotation2);
    ellipse(0, hSize/4, wSize/3, hSize/2.5);
    triangle(0, hSize/4, 0, hSize/2, wSize/4, hSize/2);
    popMatrix();
    //body an head
    fill(predatorColor, lifeSpan);
    ellipse(0, 0, wSize/1.5, wSize/1.5);
    fill(predatorR -50, predatorG -50, predatorB -50, lifeSpan);
    ellipse(0, -hSize/2, wSize, hSize);
    fill(predatorColor, lifeSpan);
    ellipse(0, -hSize/1.8, wSize, hSize);
    //this for loop is to draw the skin stain on the back of the predator
    //it disapears when the predator enters home
    if (!disappear) {
      for (int i = 0; i < 30; i++) {
        fill(predatorR -50, predatorG -50, predatorB -50, i);
        ellipse(0, -hSize/2, (wSize - wSize/4) - i, hSize -i);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method checks whether the predator has surpassed 
  //the edges of the window
  void checkEdges() {
    //if the ant's x location went beyond the width
    //then  its x location becomes the width
    //and its velocity is invesed
    if (location.x >= width + border) {
      velocity.x--;
      location.x = width + border;
    } 
    //if it went less than the border size
    //then its x location becomes the border value
    //and its velocity is invesed
    else if (location.x <= - border) {
      velocity.x++;
      location.x = -border;
    }
    //if the ant's y location went beyond the height
    //then its y location becomes the width
    //and its velocity is invesed
    if (location.y >= height -200) {
      velocity.y--;
      location.y = (height-200);
    } 
    //if it went less than the border size
    //then its y location becomes the border value
    //and its velocity is invesed
    else if (location.y <= - border) {
      velocity.y++;      
      location.y =  - border;
    }
  }
}

