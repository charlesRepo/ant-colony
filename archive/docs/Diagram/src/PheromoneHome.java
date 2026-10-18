/**
 * this class is a subclass of the parent class Pheromone
 it draws the pheromone trails pheromoneHome specific to 
 the ant's foraging behavior that starts from Home
 * 
 * @author     CRHanna
 * @version    05/03/2014 16:20:15
 */
public class PheromoneHome extends Pheromone {

	/** Red channel. */
	private final int pherHomeR;

	/** Green channel. */
	private final int pherHomeG;

	/** Blue channel. */
	private final int pherHomeB;

	/** the color of the Home Pheromone. */
	public final int pherHomeColor;

	/**
	 * @param size    determines the initial size of the home pheromone
	 */
	public PheromoneHome(int size)
	{
	}

	/**
	 * this method displays the same pheromone as the parent class
	 * but only overrides the stroke color 
	 * which is taking the home pheromones color
	 */
	public void display()
	{
	}
}