/*
This class draws the menu and the menu icons 
 and manages the ineractions of the user with the menu
 and exucute the commands accordingly based on the user interaction
 */
class Menu {
  //location 
  PVector location;
  //the width and height of the menu
  final int wSize;
  final int hSize;
  //used for the distribution of the food menu
  int offset;
  //the alpha channels for each type of food labels
  int alpha1;
  int alpha2;
  int alpha3;
  //used for distributing the count to each food type in a for loop
  int typeCount;
  //used for setting a color value to each icon
  int value;
  //for positioning the type beneath the icons
  final float yPosition;
  //is the biscuit selcted
  boolean selectBiscuit;
  //is the sugar selcted
  boolean selectSugar;
  //is the toxic selcted
  boolean selectToxic;
  //is the button selected
  boolean selected;
  //for showing and hiding the predator
  boolean showPredator;
  //is the predator icon is pressed
  boolean predatorPressed;
  //is the ant icon pressed
  boolean antPressed;
  //is the reset button pressed
  boolean resetPressed;
  //for switch case condition in the setConditions()
  char letter;
  //instance of the predator
  Predator predator;
  //instance of the colony
  Colony colony;
  //instance of a single ant used for the icon
  Ant ant;
  //instance of the food particle
  Food food;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //Location: used for positioning the menu and it element on the screen
  //Predato p: for callin the display function form the predator class
  //for displaying the predator icon
  //Colony c: for getting the updated number of ants and display next to the ant icon
  Menu(PVector location, Predator predator, Colony colony) {
    //the location of the menu
    this.location = location.get();
    //the width and height of the menu
    wSize = width;
    hSize = height-150;
    //the predator link
    this.predator = predator;
    //the colony link
    this.colony = colony;
    //initialization of the Ant instance with its position on the menu
    ant = new Ant(new PVector(location.x+380, location.y-100));
    //for positioning the labels under the icons
    yPosition = location.y - 100;
    //all booleans have an initial value of false
    //initially none are selected 
    selectBiscuit = false;
    selectSugar = false;
    selectToxic = false;
    selected = false;
    showPredator = false;
    predatorPressed = false;
    resetPressed = false;
    antPressed = false;
    //all alpha channels have an initial value of 50 - the text is dimmed;
    alpha1 = 50;
    alpha2 = 50;
    alpha3 = 50;
    //initial value of type is 0
    //1 is for biscuit/ 2 is for sugar/ 3 is for toxic
    typeCount = 0;
    //initial color value of the icons is 0
    value = 0;
    //initialization of the food instance
    food = new Food();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is used to dispaly the reset button on the menu and color it white 
  //whenever pressed however because it resets it turns back to its original color
  //on toggle
  void reset() {
    if (resetPressed) {
      fill(255);
    }
    else {
      fill(100);
    }
    textSize(15);
    textAlign(LEFT);
    //displays the reset button as text 
    text("RESET", ant.location.x + 100, ant.location.y + 5);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method diplays the image of the predator on the menu
  //and it creates a toggle effect
  //whenever the icon is pressed if it is selected it dims
  //if it is not selected it lits up
  void displayPredator() {
    if (predatorPressed) {
      value = 255;
    }
    else {
      value = 100;
    }
    //called from the predators class to display the predator icon
    //it accepts an alpha value and an x and y location 
    predator.displayPredatorIcon(value, location.x + 100, location.y - 100);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this icon displays the ant as an ican that can be toggled whenever pressed
  void displayAnt() {
    if (antPressed) {
      value = 255;
    }
    else {
      value = 100;
    }
    //this method is called from the Ant class it accepts the location and the alpha value
    ant.displayAntIcon(ant.location.x, ant.location.y, value);
    //next to the icon a text indicating an updated count of the ants
    //the arraylist ants is accessed through the colony link in order to get the number of ants
    fill(100);
    textSize(15);
    textAlign(LEFT);
    text(colony.ants.size() + " ants", ant.location.x + 20, ant.location.y + 5);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method displays the 3 types of food as icons on the menu
  //it uses the addFoodIcon() method from the FoodSource class which draws the food icon
  void displayFoodMenu() {
    FoodSource f = new FoodSource(new PVector(location.x, location.y), 25);
    //the offset initial value is 50
    //the offset is used to space out the icons from each others
    offset = 50;
    //starts with the type count as 1 - biscuit
    typeCount = 1;
    //this for loop will distribute the icons next to each others
    //starts with a position of 200 and ends with at 300
    //the x location will be offsseted bu 50 pixels
    for (int i = 200; i <= 300; i += offset) {
      setToggleConditions();
      //the addFoodIcon is called in order ot display the food icon 
      //and it is distributed and incremented according to this order
      //biscuit icon + //sugar icon + //toxic icon
      f.addFoodIcon(location.x + i, yPosition, f.unitW, selected, typeCount);
      //the type count will increment with every iteration setting the number from 
      //1 + 2 + 3 each number is for a type of food 
      typeCount++;
      //the labels that are shown under the icons
      textSize(10);
      textAlign(CENTER);
      fill(255, alpha1);
      text("BISCUIT", location.x + (offset * 4), location.y - 70);
      fill(255, alpha2);
      text("SUGAR", location.x + (offset * 5), location.y - 70);
      fill(255, alpha3);
      text("TOXIC", location.x + (offset * 6), location.y - 70);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //these method display/add food according to the selection of the user 
  //from the menu of which type of food to add

  //if biscuit was selected then add biscuit and display a biscuit cursor
  void addBiscuitFromMenu(float x, float y, FoodSource f) {
    //add biscuit
    f.addBiscuit();
    if (selectBiscuit) {
      //the biscuit is selected
      f.getFoodStatus(true);
      if (y < location.y - 160)
        //biscuit cursor
        f.addFoodIcon(x, y, 5, true, 1);
    }
  }

  //if sugar was selected then add sugar and display a sugar cursor
  void addSugarFromMenu(float x, float y, FoodSource f) {
    //add sugar
    f.addSugar();
    if (selectSugar) {
      //the sugar is selected
      f.getFoodStatus(true);
      if (y < location.y - 160)
        //sugar cursor
        f.addFoodIcon(x, y, 5, true, 2);
    }
  }

  //if toxic was selected then add toxic and display a toxic cursor
  void addToxicFromMenu(float x, float y, FoodSource f) {
    //add toxic
    f.addToxic();  
    if (selectToxic) {
      //the toxic is selected
      f.getFoodStatus(true);
      if (y < location.y - 160)
        //the toxic cursor
        f.addFoodIcon(x, y, 5, true, 3);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this methods sets 3 switch case conditions for controlling 
  //the toggling of the food icons on the menu
  //and for controlling the transparency of the text 
  //when the icon is selected or deselected
  void setToggleConditions() {
    if (typeCount < 4) {
      switch(letter) {
      case'A':
        //case A: if the biscuit is selected and the type count is 1
        //then lit the biscuit icon and dim the rest
        if (selectBiscuit && typeCount == 1) {
          selected = true;
          alpha1 = 255;
        } 
        else if (typeCount != 1) {
          selected = false;
          alpha1 = 50;
        }
        break;
      case'B':
        //case B: if the sugar is selected and the type count is 2
        //then lit the sugar icon and dim the rest
        if (selectSugar && typeCount == 2) {
          selected = true;
          alpha2 = 255;
        } 
        else if (typeCount > 2 || typeCount < 2) {
          selected = false;
          alpha2 = 50;
        }
        break;
      case'C':
        //case C: if the sugar is selected and the type count is 2
        //then lit the sugar icon and dim the rest
        if (selectToxic && typeCount == 3) {
          selected = true;
          alpha3 = 255;
        } 
        else if (typeCount < 3) {
          selected = false;
          alpha3 = 50;
        }
        break;
      }
    }
  }


  /////////////////////////////////////////////////////////////////////////////////
  //this method detedts the mouse position whether it is over a certain icon when pressed 
  //and executes a command accordingly
  void mousePressed(float x, float y, FoodSource biscuit, FoodSource sugar, FoodSource toxic) {
    //if the mouse is over the biscuit icon
    if (x > (location.x + 197) - biscuit.unitSize && x < (location.x + 197) + biscuit.unitSize && y > yPosition - biscuit.unitSize && y < yPosition + biscuit.unitSize) {
      //create a toggle for the biscuit button
      selectBiscuit = !selectBiscuit;
      //and unselect the other icons
      selectSugar = false;
      selectToxic = false;
      //A is the id character for the switch case in the setConditions() 
      letter = 'A';
    }
    //if the mouse is over the sugar icon
    if (x > (location.x + 247) - sugar.unitSize && x < (location.x + 247) + sugar.unitSize && y > yPosition - sugar.unitSize && y < yPosition + sugar.unitSize) {
      //unselect the biscuit and the toxic
      selectBiscuit = false;
      //create a toggle fotr the sugar
      selectSugar = !selectSugar;
      selectToxic = false;
      //B is the id character for the switch case in the setConditions() 
      letter = 'B';
    }
    //if the mouse is over the toxic icon
    if (x > (location.x + 297) - toxic.unitSize && x < (location.x + 297) + toxic.unitSize && y > yPosition - toxic.unitSize && y < yPosition + toxic.unitSize) {
      //unsellect the first two icons
      selectBiscuit = false;
      selectSugar = false;
      //set a toggle for the toxic
      selectToxic = !selectToxic;
      //C is the id character for the switch case in the setConditions()
      letter = 'C';
    }
    //if the mouse is over the predator icon
    if (x > (location.x + 100) - predator.wSize  && x < (location.x + 100) + predator.wSize && y > yPosition - predator.hSize && y < yPosition + predator.hSize) {
      //the predator will be hidden/unhidden with the toggle of the button
      showPredator = !showPredator;
      //create a toggle for the button
      predatorPressed = !predatorPressed;
    }
    //if the mouse was over the ant icon
    if (x > (location.x + 380) - ant.wSize  && x < (location.x + 380) + ant.wSize && y > yPosition - ant.hSize && y < yPosition + ant.hSize) {
      //once pressed the ant will still be on so the user can click on it to generate more ants
      antPressed = true;
    }
    //if the mouse is over the reset button
    if (x > location.x + 480  && x < location.x + 530 && y > yPosition - 20 && y < yPosition + 20) {
      //returns true when pressed
      resetPressed = true;
      //reset the setup function so everything will be reseted
      setup();
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is called in the ant class
  //it determines whether the ant was selected or not
  //if it was selected than the ant can be added 
  boolean addAnt() {
    if (antPressed)return true;
    else return false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this function returns the true result of showing the showPredator when it is 
  //selected from the menu. It is called in the main sketch in order to activate the 
  //Predator's functions
  Boolean showPredator() {
    return showPredator;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is called in the Ant class in order to set a condition that if the 
  //predator is hidden the ant will die if it enters the predator's home
  Boolean hidePredator() {
    return !showPredator;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this draws the menu background as a black rectangle
  void displayBar() {
    fill(0);
    rectMode(LEFT);
    rect(location.x, location.y, wSize, hSize);
  }
}

