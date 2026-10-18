/**
 * this class is amaster class for the two subclasses PherFood and PherHome
 this class is responsible for drawing the pheremone trails behind the ant
 it should also remembers origin and destination it traveled so that ican 
 serve as a guide to other ants to follow
 * 
 * @author     CRHanna
 * @version    05/03/2014 16:07:56
 */
abstract class Pheromone {

	/** instatiation of the trail as an arrylist of type PVector. */
	public ArrayList<PVector> trail;

	/** the size of the trail. */
	public int pheromoneSize;

	/** the location vector of the trail */
	public PVector location;

	/** the opacity of the trail that can be decremented in order to make the pheromones evaporate. */
	public float lifeSpan;

	/**
	 * Write a description of this constructor here.
	 * @param pheromoneSize    the initial size of the trail
	 */
	public Pheromone(int pheromoneSize)
	{
	}

	/**
	 * used in the Ant class in order to load the ant's location into the ArryList and create the pheromones
	 * @return            returns the ArrayList trail
	 */
	public ArrayList<PVector> getTrail()
	{
	}

	/**
	 * this method removes each trail point from the arraylist when the number of points gests more then the initial pheromoneSize
	 */
	public void evaporate()
	{
	}

	/**
	 * this method displays the trail as point (vertex) that is added one after the other to form a trail
	 */
	public void display()
	{
	}

}