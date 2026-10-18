/*
  this class manages the food particle
 it places it inside an ArrayList forming a grid
 The grid is the food that the ant will eat from
 */
class FoodSource {
  //arraylist grid of type Food
  ArrayList<Food> grid;
  //location coordinates
  PVector location;
  //rows and coloumns of the grid
  final int rows;
  final int cols;
  //width and height of a particle inside the grid
  final int unitW;
  final int unitH;
  //the area size of the unit
  final int unitSize;
  //removes particles from the food arraylist
  //based on hom many ants are picking up the food
  //it is used in the eatFood() method
  int counter;
  //checks whether the ant has reached to the food
  //this will be called in the Ant class
  //in order to allow the ant carry the food
  boolean hasParticle;
  //check if the food is selected from the menu
  boolean addFood;
  //pass the status of adding or not adding food to the 
  //addBiscuit(), addSugar(), and addToxic() methods
  boolean foodStatus;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  //the constructor receives the location as a parameter
  //PVector location_: is used to position  the arraylist across the window
  //gridSize: specifies the number of rows and columns of the grid. the amount is the same for both
  //because grid should always remain square
  FoodSource(PVector location, int gridSize) {
    //gets the location from the constructor
    this.location = location.get();
    //initilize the grid as an arraylist of type Food 
    grid = new ArrayList<Food>();
    //the initial values for the rows and columns equal to the gridSize form the constructor
    rows = gridSize;
    cols = gridSize;
    //the width and height of every particle of the arraylist grid
    unitW = unitH = rows / 5;
    //the area of the particle
    unitSize = unitW * unitH;
    //no food is added at the start of the program
    addFood = false;
    //no food particle have been picked at the start
    hasParticle = false;
    //and the food status is false
    foodStatus = false;
    //calls the setGrid() method in the constructor becuase it doesn't need to be changed
    //IMPORTANT it is important to be placed before the counter variable
    setGrid();
    //the counter starts with same number of the array and decrements
    counter = grid.size();
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method builds the grid from a food particle inside the arraylist forming the food square
  void setGrid() {
    //a nested for loop for drawing the grid with the particles present in the arraylist
    for (int i = 0; i < rows; i += unitW) {
      for (int j = 0; j < cols; j += unitH) {
        //distribute the particles of grid based on the location and the nested for loops
        grid.add(new Food(new PVector(i + location.x, j + location.y)));
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //if noFood is true addFood is false 
  //this method is used to keep the food from appearing 
  //at the start of the program and from keeping the ant 
  //from foraging for food if no food was selected
  //it is called in the findFood method of the Ant class
  boolean noFood() {
    if (addFood) {
      return true;
    }
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //This method is called in the Menu class
  //in order to know whether the food was selected or not
  //it accepts a boolean argument and accordingly changes the 
  //the foodStatus variable
  boolean getFoodStatus(boolean status) {
    if (status) {
      foodStatus = true;
      return foodStatus;
    }
    else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //based on the information received from the 
  //getFoodStatus() method
  //if the status is true then food can be added 
  //if the status is false then the food cannot be added
  boolean setFoodStatus() {
    if (getFoodStatus(foodStatus)) {
      addFood = true;
      return addFood;
    }
    else {
      addFood = false;
      return addFood;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method adds the food particle to the grid arraylist
  //this food particle represents the biscuit because its id number is 1
  //so the whole arraylist will be filled with biscuit
  //this method is used in the Menu class in order to add food according to its type
  void addBiscuit() {
    if (setFoodStatus()) {
      for (int i = grid.size() -1; i >= 0 ; i--) {
        Food f = grid.get(i);
        //for every reserved space in the arraylist draw the food particle according 
        //to the x and y, width and height and food color and type. 
        f.foodUnit(f.location.x - (rows / 2), f.location.y - (cols / 2), unitW, unitH, true, 1);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method adds the food particle to the grid arraylist
  //this food particle represents the sugar because its id number is 2
  //so the whole arraylist will be filled with biscuit
  //this method is used in the Menu class in order to add food according to its type
  void addSugar() {
    if (setFoodStatus()) {
      for (int i = grid.size() -1; i >= 0 ; i--) {
        Food f = grid.get(i);
        //for every reserved space in the arraylist draw the food particle according 
        //to the x and y, width and height and food color and type. 
        f.foodUnit(f.location.x - (rows / 2), f.location.y - (cols / 2), unitW, unitH, true, 2);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method adds the food particle to the grid arraylist
  //this food particle represents the toxic because its id number is 3
  //so the whole arraylist will be filled with biscuit
  //this method is used in the Menu class in order to add food according to its type
  void addToxic() {
    if (setFoodStatus()) {
      //we are going backwards with the for loops because we might need to remove the food particles
      //whenever one of the ants touched them
      for (int i = grid.size() -1; i >= 0 ; i--) {
        Food f = grid.get(i);
        //for every reserved space in the arraylist draw the food particle according 
        //to the x and y, width and height and food color and type. 
        f.foodUnit(f.location.x - (rows / 2), f.location.y - (cols / 2), unitW, unitH, true, 3);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method adds the food grid arraylist whenever it is called
  //this method is to be displayed on the menu as an icon exclusivly
  void addFoodIcon(float x, float y, int size, boolean selected, int type) {
    ArrayList<Food> icon = new ArrayList<Food>();
    //a nested for loop for drawing the grid with the particles present in the arraylist
    for (int i = 0; i < rows; i += unitW) {
      for (int j = 0; j < cols; j += unitH) {
        //distribute the particles of grid based on the location and the nested for loops
        icon.add(new Food(new PVector(i + x, j + y)));
      }
    }
    //we are going backwards with the for loops because we might need to remove the food particles
    //whenever one of the ants touched them
    for (int i = icon.size() -1; i >= 0 ; i--) {
      Food f = icon.get(i);
      //for every reserved space in the arraylist draw the food particle according 
      //to the x and y, width and height and food color. 
      f.foodUnit(f.location.x - (rows / 2), f.location.y - (cols / 2), size, size, setSelected(selected), type);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method is called in the Menu class
  //it detrmines whether the food is selected or not
  //it passes its boolean value to the selected valiable
  //that in its turn returns true or false to the Food class method foodUnit
  boolean setSelected(boolean selected) {
    if (selected)
      return true;
    else
      return false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //checks whether the ant has touched the food
  //this method is called in the eatFood method
  //to determine whether the ant has touched to food
  //and it is also called in the Ant class in the findFood method
  boolean hasParticle() {
    if (hasParticle)
      return true;
    else 
      return false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method simulates the event that the ant is picking food particle from the food
  //in fact the when the ant comes to a proximity from the food
  //a food particle will be deleted according to it sequential positioning in the arraylist
    //and a new rectangle is drawn in Colony class creating the illusion of the ant picking up food
  //the l: is the location of the ant that will be passed to this method
  void eatFood(PVector l) {
    //the counter which is initially is equal to the number of food particles in the ArrayList
    //is subtracted from the the size of the ArrayList (grid.size() - grid.size())
    for (int i = grid.size() - counter; i >= 0 ; i--) {
      if (counter > 0) {
        //i now is equal to 0
        Food f = grid.get(i);
        //if the counter >= 1
        //we should keep it at one in order to reach the last particle
        if (counter >= 1) {
          //decrement each time this method is called
          //so if the counter start @ 25
          //when the ant find and arrive to the food
          //the counter is decremented by one 
          //it keep track how many times this method is accessed 
          //and decrement the results from the arraylist
          counter--;
          //when the ant is inside the food square
          //the fist particle is removed from the Arraylist and so on..
          if (l.x  >= f.location.x - (unitSize - unitW) && l.y >= f.location.y - (unitSize - unitH)) {
            grid.remove(counter);
            //the ant did touch the food
            hasParticle = true;
          }
        }
      }
    }
  }
}

