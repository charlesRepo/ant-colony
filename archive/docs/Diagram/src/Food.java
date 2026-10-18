/**
 * This class creates a food particle that is added to the ArrayList in the FoodSouece class
 * to create the food.
 * There are 3 types of food particles presented in this class, each one of them
 * has a different intensity and effect on the ants.
 * 
 * @author     CRHanna
 * @version    05/03/2014 15:35:37
 */
public class Food {

	/** Red channel of the food particle. */
	public int foodR;

	/** Green channel of the food particle. */
	public int foodG;

	/** Blue channel of the food particle. */
	public int foodB;

	/** the color of biscuit. */
	public color biscuitColor;

	/** the color of sugarColor. */
	public int sugarColor;

	/** the color of toxic food. */
	public boolean toxicColor;

	/** the location of the food particle. */
	public PVector location;

	/**
	 * @param location    	the location of the single food particle
	 * 					it will be used by the FoodSource class to position the food particle
	 * 					in the ArrayList in the shape of the grid
	 */
	public Food(PVector location)
	{
	}

	/**
	 * a second constructor was created in order to be used in the menu 
	 * for accessing the methods of a single food particle 
	 */
	public Food()
	{
	}

	/**
	 * this method draws the food particle as a rectangle
	 * Controls the intensity of the alpha channel of each food type
	 * and colors it according to the selection of the icon which is equivelent to 
	 * to the number of food type given to the argument
	 * @param x           the x location of the food particle      "
	 * @param y           the y location of the food particle
	 * @param wSize       the width 
	 * @param hSize       the height
	 * @param selected    whether it was selected or unselected
	 * @param foodType    specifies which type of food the particle is
	 * 					1 is for biscuit 
	 * 					2 is for sugar 
	 * 					3 is for toxic
	 */
	public void foodUnit(float x, float y, int wSize, int hSize, boolean selected, int foodType)
	{
	}

	/**
	 * @param selected	is to determine whether the food is selected or not (in the menu).
	 * @param foodType	is to assign a certin number that corresponds to a particular foodType.
	 */
	public void setFoodColor(boolean selected, int foodType)
	{
	}

	/**
	 * this method display the food unit without any specified type
	 * just as a plain square with stroke but with no fill specified to it
	 * the fill will be determined by the foodType
	 */
	public void displayFoodUnit(float x, float y, int wSize, int hSize)
	{
	}

	/**
	 * this method gives the food particle the color of biscuit
	 */
	public void displayBiscuit()
	{
	}

	/**
	 * this method gives the food particle the color of sugar
	 */
	public void displaySugar()
	{
	}

	/**
	 * this method gives the food particle a toxic color
	 */
	public void displayToxic()
	{
	}

}