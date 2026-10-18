/**
 * this class is a subclass of the parent class Pheromone
 it draws the pheromone trails pheromoneFood specific to 
 when the ant finds food and returns Home
 this class should alert the other 
 ants about the source of food
 and the other ants should be able to follow it untill they reach Food
 * 
 * @author     CRHanna
 * @version    05/03/2014 16:19:37
 */
public class PheromoneFood extends Pheromone {

	/** Red channel. */
	private final int pherFoodR;

	/** Green channel. */
	private final int pherFoodG;

	/** Blue channel. */
	private final int pherFoodB;

	/** color of the Food Pheromone */
	public final color pherFoodColor;

	/**
	 * @param size    determines the initial size of the food pheromone
	 */
	public PheromoneFood(int size)
	{
	}

	/**
	 * this method displays the same pheromone as the paren class
	 * but only overrides the stroke color 
	 * which is taking the food pheromones color
	 */
	public void display()
	{
	}
}