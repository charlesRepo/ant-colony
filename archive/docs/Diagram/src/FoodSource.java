/**
 * this class manages the food particle
 it places it inside an ArrayList forming a grid
 The grid is the food that the ant will eat from
 * 
 * @author     CRHanna
 * @version    05/03/2014 16:33:53
 */
public class FoodSource {

	/** arraylist grid of type Food */
	public ArrayList<Food> grid;

	/** location vector */
	private PVector location;

	/** rows of the grid */
	private final int rows;

	/** columns of the grid */
	private final int cols;

	/** width of a particle inside the grid. */
	private final int unitW;

	/** width of a particle inside the grid. */
	private final int unitH;

	/** the area size of the unit. */
	private final int unitSize;

	/** keep track of how many ants accessed the eatFood()
	and decrement the number of particles in the arraylist accordingly. */
	private int counter;

	/** checks whether the ant has reached to the food. */
	private boolean hasParticle;

	/** check if the food is selected from the menu. */
	private boolean addFood;

	/** pass the status of adding or not adding food to the
	addBiscuit(), addSugar(), and addToxic() methods. */
	private boolean foodStatus;

	/**
	 * @param location    	is used to position  the arraylist across the window
	 * @param gridSize     	specifies the number of rows and columns of the grid. the amount is the same for both
	 * 					because grid should always remain square		
	 */
	public FoodSource(PVector location, int gridSize)
	{
	}

	/**
	 * this method builds the grid from a food particle inside the arraylist forming the food square
	 */
	public void setGrid()
	{
	}

	/**
	 * if noFood is true addFood is false. 
	 * this method is used to keep the food from appearing
	 * at the start of the program and from keeping the ant 
	 * from foraging for food if no food was selected
	 * it is called in the findFood method of the Ant class
	 */
	public boolean noFood() 
	{
	}
	
	/**
	 * This method is called in the Menu class
	 * in order to know whether the food was selected or not
	 * @param status	returns true if the food was selected from the food menu
	 * @return          returns tru if the status is true
	 */
	public boolean getFoodStatus(boolean status)
	{
	}

	/**
	 * based on the information received from the getFoodStatus() method
	 * if the status is true then food can be added 
	 * if the status is false then the food cannot be added
	 * @return        returns true if the getFoodStatus is true
	 */
	public boolean setFoodStatus()
	{
	}

	/**
	 * this method adds the food particle to the grid arraylist
	 * this food particle represents the biscuit because its id number is 1
	 * so the whole arraylist will be filled with biscuit
	 * this method is used in the Menu class in order to add food according to its type
	 */
	public void addBiscuit()
	{
	}

	/**
	 * this method adds the food particle to the grid arraylist
	 * this food particle represents the sugar because its id number is 2
	 * so the whole arraylist will be filled with biscuit
	 * this method is used in the Menu class in order to add food according to its type
	 */
	public void addSugar()
	{
	}

	/**
	 * this method adds the food particle to the grid arraylist
	 * this food particle represents the toxic because its id number is 3
	 * so the whole arraylist will be filled with biscuit
	 * this method is used in the Menu class in order to add food according to its type
	 */
	public void addToxic()
	{
	}

	/**
	 * this method adds the food grid arraylist whenever it is called
	 * this method is to be displayed on the menu as an icon exclusivly
	 * @param x		the x position
	 * @param y		the y position
	 * @param size		the size of the food icon
	 * @param selected	returns true if the food icon was selected
	 * @param type		either 1, 2 or 3
	 */
	public void addFoodIcon(float x, float y, int size, boolean selected, int type)
	{
	}

	/**
	 * this method is called in the Menu class
	 * it detrmines whether the food is selected or not
	 * it passes its boolean value to the selected valiable
	 * that in its turn returns true or false to the Food class method foodUnit
	 * @param selected    returns true if the food icon was selected
	 * @return             true if the food icon was selected
	 */
	public boolean setSelected(boolean selected)
	{
	}

	/**
	 * checks whether the ant has touched the food
	 * this method is called in the eatFood method
	 * to determine whether the ant has touched to food
	 * and it is also called in the Ant class in the findFood method
	 * @return           true if the ant has touched the food grid
	 */
	public boolean hasParticle()
	{
	}

	/**
	 *this method simulates the event that the ant is picking food particle from the food
	 *in fact the when the ant comes to a proximity from the food
	 *a food particle will be deleted according to it sequential positioning in the arraylist
	 *and a new rectangle is drawn in Colony class creating the illusion of the ant picking up food
	 * @param l    is the location of the ant that will be passed to this method
	 */
	public void eatFood(PVector l)
	{
	}
}