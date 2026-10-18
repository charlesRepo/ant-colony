/*
  This class creates a food particle that is added to the ArrayList in the FoodSouece class
 to create the food.
 There are 3 types of food particles presented in this class, each one of them
 has a different intensity and effect on the ants.
 */
class Food {
  //RGB of type integer
  int foodR;
  int foodG;
  int foodB;
  int alpha;
  //the color of biscuit
  color biscuitColor;
  //the color of sugarColor
  color sugarColor;
  //the color of toxic food
  color toxicColor;
  //the location of the food particle
  PVector location;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //the constructor only takes the location as a parameter
  //it will be used by the FoodSource class to position the food particle
  //in the ArrayList in the shape of the grid
  Food(PVector location) {
    this.location = location.get();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //SECOND CONSTRUCTOR
  //this constructor is used in the menu in order to access the methods of
  //the food particle
  Food() {
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is passed to the setFoodColor method 
  //in order to change the intesity 
  //of the alpha channel of the 3 particle types
  //according to their selection from the menu
  //if selected it returns the value of 255
  //if is not selected it returns keeps the food icon faded
  int setAlpha(boolean selected) {
    if (selected) {
      alpha = 255;
    }
    else {
      alpha = 100;
    }
    return alpha;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws the food particle as a rectangle 
  //Controls the intensity of the alpha channel of each food type
  //and colors it according to the selection of the icon which is equivelent to 
  //to the number of food type given to the argument
  //fooType is either 1 or 2 or 3
  //1 for the biscuit
  //2 for the sugar
  //3 for the toxic
  void foodUnit(float x, float y, int wSize, int hSize, boolean selected, int foodType) {
    setFoodColor(selected, foodType);
    displayFoodUnit(x, y, wSize, hSize);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this methods accepts 2 arguments
  //selected: is to determine whether the food is selected or not (in the menu)
  //foodtype: is to assign a certin number that corresponds to a particular foodType
  //E.g.: if selected is true and foodtype = 1 then the biscuit will be selected and displayed 
  void setFoodColor(boolean selected, int foodType) {
    //if 1 then show biscuit color
    if (foodType == 0) {
      displayBiscuit(0);
    }
    if (foodType == 1) {
      displayBiscuit(setAlpha(false));
    }
    if (foodType == 1 && selected) {
      displayBiscuit(setAlpha(true));
    }
    //if 2 then show sugar color
    if (foodType == 2) {
      displaySugar(setAlpha(false));
    }
    if (foodType == 2 && selected) {
      displaySugar(setAlpha(true));
    }
    //if 3 then show toxic color
    if (foodType == 3) {
      displayToxic(setAlpha(false));
    }
    if (foodType == 3 && selected) {
      displayToxic(setAlpha(true));
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method display the food unit without any specified type
  //just as a plain square with stroke but with no fill specified to it
  //the fill will be determined by the foodType
  void displayFoodUnit(float x, float y, int wSize, int hSize) {
    //sets the strokes color and weight
    stroke(100);
    strokeWeight(0.5);
    //sets the coordinates at the center and draws the rectangle
    rectMode(CENTER);
    rect(x, y, wSize, hSize);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method gives the food particle the color of biscuit
  void displayBiscuit(int alpha) {
    //intializes the RGB
    foodR = 200;
    foodG = 190;
    foodB = 120;
    //stores them in a variable of type color
    biscuitColor = color(foodR, foodG, foodB);
    //and applies them to the fill
    fill(biscuitColor, alpha);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method gives the food particle the color of sugar
  void displaySugar(int alpha) {
    //intializes the RGB
    foodR = 255;
    foodG = 255;
    foodB = 255;
    //stores them in a variable of type color
    sugarColor = color(foodR, foodG, foodB);
    //and applies them to the fill
    fill(sugarColor, alpha);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method gives the food particle a toxic color
  void displayToxic(int alpha) {
    //intializes the RGB
    foodR = 0;
    foodG = 255;
    foodB = 0;
    //stores them in a variable of type color
    toxicColor = color(foodR, foodG, foodB);
    //and applies them to the fill
    fill(toxicColor, alpha);
  }
}

