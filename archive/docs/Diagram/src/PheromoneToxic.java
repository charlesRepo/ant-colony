/**
 * this class is a subclass of the parent class Pheromone
 it draws the pheromone trails phromoneToxic 
 it is used by the ant to leave it on the ground
 to warn other about the toxic food 
 * 
 * @author     CRHanna
 * @version    15/04/2014 19:12:13
 */
public class PheromoneToxic extends Pheromone {

	/** Red channel. */
	private final int pherToxicR;

	/** Green channel. */
	private final int pherToxicG;

	/** Blue channel. */
	private final int pherToxicB;

	/** the color of the Toxic Pheromone. */
	private final color pherToxicColor;

	/**
	 * Write a description of this constructor here.
	 * @param size    determines the initial size of the toxic pheromone
	 */
	public PheromoneToxic(int size)
	{
	}

	/**
	 * this method displays the same pheromone as the parent class
	 * but only overrides the stroke color 
	 * which is taking the home pheromones color.
	 */
	public void display()
	{
	}
}