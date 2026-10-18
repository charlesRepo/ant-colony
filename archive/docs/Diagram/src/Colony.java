/**
 * this class generates a number of ants based on the  Ant class
 it creates an ArrayList of Ants and adds and deletes ants as well as 
 it manages all the functions that belong to the Ant class
 * 
 * @author     CRHanna
 * @version    05/03/2014 15:23:03
 */
public class Colony{

	/** instantiation of ants as an arraylist of type Ant. */
	public ArrayList<Ant> ants;

	/** declares a PVector location. */
	private PVector location;

	/** manages the number of ants. */
	private final int antNum;

	/** instance of the Home of the ant. */
	public Home antHome;

	/** instance the home of the Predator. */
	private PredatorHome predatorHome;

	/** instance of type Predator. */
	private Predator predator;

	/** instance of type PheromoneHome. */
	private Pheromone pheromoneHome;

	/** instance of type PheromoneFood. */
	private Pheromone pheromoneFood;

	/** instance of type PheromoneToxic. */
	private Pheromone pheromoneToxic;

	/** instance of type Ant. */
	public Ant ant;

	/** instance of type Food. */
	public Food foodParticle;

	/** checks whether the food is toxic. */
	private boolean isToxicFood;

	/**
	 * Write a description of this constructor here.
	 * @param antHome		where the ants start their initial position and the wander around foraging
  	 *					when they find food they follow the home Pheromone to home
  	 *					when they reach home the ant is removed and a new ant is created
	 * @param predator		1 methods that belong to the class predator are called in the colony class
	 * 					the method: predator.fleeFromAnts(ants, predatorHome, m)
	 * 					this method makes the predator flee from the ants when 
	 * 					it is at proximity of more than 3
	 * 					the predator is also linked to the 2 methods
	 * 					attackPredator(predator, ants) & fleePredator(predator)
	 * 					which make the ants attack the predator and flee from it
	 * @param predatorHome	this method is called in this method:
	 * 					predator.fleeFromAnts(ants, predatorHome, m);
	 * 					where it is used to make the predator go back to its home when attacked by ants
	 * 					and it is used in antTrapped(predatorHome) method
	 * 					where the ant will be trapped if it gets into the predator home
	 */
	public Colony(Home antHome, Predator predator, Home predatorHome)
	{
	}

	/**
	 * this method generates new ants based on the  
	 * location of the class Ant which is added to the arraylist ants
	 */
	public void addAnt()
	{
	}
	
	/**
	 * this method generates new ants based on the
	 * location of the class Ant which is added to the arraylist ants
	 * in addition this method offers the ability to specify the number of ants
	 * that should be added. It is used to add ants from the menu
	 * @param num		specifies the number of ants to be added to the scene
	 * 				the maximium nimber f ants that can exist is 40
	 */
	public void addAnt(int num)
	{
	}

	/**
	 * @return     returns the ArrayList Ants whenever called
	 */
	public ArrayList<Ant> getAnts()
	{
	}

	/**
	 * this method runs all the functions that are specific to the class Ant
	 * @param menu       a description of the parameter "menu   "
	 * @param biscuit    a description of the parameter "biscuit"
	 * @param sugar      a description of the parameter "sugar  "
	 * @param toxic      a description of the parameter "toxic  "
	 */
	public void run(Menu menu, FoodSource biscuit, FoodSource sugar, FoodSource toxic)
	{
	}


	/**
	 * this method makes the ant get eaten by the predator when it attacks it.
	 * @param predator    the predator PVector location is accessed 
	 * 				in order to set the distance between the ant and the predator
	 */
	public void eatenByPredator(Predator p)
	{
	}

	/**
	 * this method is related to the ant icon on the menu
	 * when the ant icon is clicked 1 ant is added
	 * the maximum number of ants that can exist is 40.
	 * @param menu		the menu boolean condition is addAnt is accessed 
	 */
	public void addAnt(Menu menu)
	{
	}

	/**
	 * this method displays the colony .
	 */
	public void displayColony(Menu menu)
	{
	}

	
}