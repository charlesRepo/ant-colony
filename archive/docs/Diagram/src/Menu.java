/**
 *This class draws the menu and the menu icons 
 and manages the ineractions of the user with the menu
 and exucute the commands accordingly based on the user interaction
 * 
 * @author     CRHanna
 * @version    05/03/2014 19:25:28
 */
public class Menu {

	/** location vector. */
	private PVector location;

	/** width of the menu. */
	private int wSize;

	/** height of the menu. */
	private int hSize;

	/** the alpha channels for the biscuits. */
	private int alpha1;

	/** the alpha channels for the sugar. */
	private int alpha2;

	/** the alpha channels for the toxic. */
	private int alpha3;

	/** used for distributing the count to each food type in a for loop. */
	private int typeCount;

	/** used for setting a color value to each icon. */
	private int value;

	/** for positioning the type beneath the icons. */
	private float yPosition;

	/** used for the distribution of the food menu. */
	private int offset;

	/** checks if the biscuit is selcted. */
	private boolean selectBiscuit;

	/** checks if the sugar is selcted. */
	private boolean selectSugar;

	/** checks if the toxic is selcted. */
	private boolean selectToxic;

	/** checks if the button is selected. */
	private boolean selected;

	/** shows or hides the predator. */
	private boolean showPredator;

	/** checks if the predator icon is pressed. */
	private boolean predatorPressed;

	/** checks if the ant icon is pressed. */
	private boolean antPressed;

/** checks if the reset icon is pressed. */
	private boolean resetPressed;

	/** for switch case condition in the setConditions(). */
	private char letter;

	/** instance of type Predator. */
	private Predator predator;
	
	/** instance of type Colony. */
	private Colony colony;

	/** instance of type Ant. */
	private Ant ant;

	/** instance of type Food - a single food particle. */
	private Food food;

	/**
	 * @param location	used for positioning the menu and it element on the screen
	 * @param predator	for callin the display function form the predator class for displaying the predator icon
	 * @param colony	for getting the updated number of ants and display next to the ant icon
	 */
	public Menu(PVector location, Predator predator, Colony colony)
	{
	}

	/**
	 * this method is used to dispaly the reset button on the menu and color it white 
	 * whenever pressed however because it resets it turns back to its original color
	 * on toggle
	 */
	public void reset()
	{
	}

	/**
	 * this method diplays the image of the predator on the menu
	 * and it creates a toggle effect
	 * whenever the icon is pressed if it is selected it dims
	 * if it is not selected it lits up
	 */
	public void displayPredator()
	{
	}

	/**
	 * this icon displays the ant as an ican that can be toggled whenever pressed
	 */
	public void displayAnt()
	{
	}

	/**
	 * this method displays the 3 types of food as icons on the menu
	 * it uses the addFoodIcon() method from the FoodSource class which draws the food icon
	 */
	public void displayFoodMenu()
	{
	}

	/**
	 * add biscuit and display a biscuit cursor if biscuit was selected
	 */
	public void addBiscuitFromMenu(float x, float y, FoodSource f)
	{
	}

	/**
	 * add sugar and display a biscuit cursor if sugar was selected
	 */
	public void addSugarFromMenu(float x, float y, FoodSource f)
	{
	}

	/**
	 * add toxic and display a biscuit cursor if toxic was selected
	 */
	public void addToxicFromMenu(float x, float y, FoodSource f)
	{
	}

	/**
	 * this methods sets 3 switch case conditions for controlling
	 * the toggling of the food icons on the menu
	 * and for controlling the transparency of the text 
	 * when the icon is selected or deselected
	 */
	public void setToggleConditions()
	{
	}


	/**
	 * this method detedts the mouse position whether it is over a certain icon when pressed 
	 * and executes a command accordingly
	 */
	public void mousePressed(float x, float y, FoodSource biscuit, FoodSource sugar, FoodSource toxic)
	{
	}

	/**
	 * this method is called in the ant class
	 * @return     true if the ant was selected
	 */
	public boolean addAnt()
	{
	}
	
	/**
	 * It is called in the main sketch in order to activate the Predator's functions
	 * @return        returns true if the predator is unhidden
	 */
	public boolean showPredator()
	{
	}

	/**
	 * this method is called in the Ant class in order to set a condition that if the 
	 * predator is hidden the ant will die if it enters the predator's home
	 * @return            true if the predator was hidden	
	 */
	public boolean hidePredator()
	{
	}

	/**
	 * this draws the menu background as a black rectangle
	 */
	public void displayBar()
	{
	}

}