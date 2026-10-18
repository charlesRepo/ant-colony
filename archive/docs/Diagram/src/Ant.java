/**
 * This class is the major class of the project
 it defines the major element which is the ant and its functionalities.
 The Ant's location velocity and acceleration are PVectors. 
 It starts from an original location which is the same as that of the Home.
 It wanders around searching for food using the wander() and seek() methods.
 When searching for food it leaves behind it a Food Pheromone - foodPher.
 when it finds food it goes directly to and slowly aprroaches the food source 
 with the arrive()method,it picks up the food particle 
 and then goes directly back to Home using the findFood() method.
 when going back Home it releases food Pheromone - foodPher, in order to alert 
 other ants about the food source.
 it deposits the food at Home and then goes back foraging again.
 * 
 * @author     CRHanna
 * @version    05/03/2014 15:04:21
 */
public class Ant {

	/** the x and y position of the ant. */
	private PVector location;

	/** pushes the ant into moving the location. */
	private PVector velocity;

	/** pushes the ant into speeding the velocity. */
	private PVector acceleration;

	/** the width of the ant. */
	private final float wSize;

	/** the height of the ant. */
	private final float hSize;

	/** the area size of the - width*height. */
	private final float antSize;

	/** the maximum speed that the ant can move. */
	private float maxSpeed;

	/** the minimum speed that the ant can move. */
	private float minSpeed;

	/** the maximum steering force of the ant. */
	private float maxForce;

	/** the directional angle of the ant's movement. */
	private final float head;

	/** the angle that determine the ant's wandering behavior. */
	private float wandertheta;

	/** the ant's mass. */
	private final float mass;

	/** the ant's Red channel variable. */
	private final int antR;

	/** the ant's Green channel variable. */
	private final int antG;

	/** the ant's Blue channel variable. */
	private final int antB;

	/** The color of the ant - the 3 channels combined. */
	private final color antColor;

	/** stores the the opacity of the ant's color
	* that can be decremented to make the ant disappear. */
	private int lifeSpan;

	/** sets the borders of the window. */
	private final int border;

	/** stores the ant's location and passes it to the HomePheromone ArrayList trail. */
	private ArrayList<PVector> homeTrail;

	/** stores the ant's location and passes it to the FoodPheromone ArrayList trail. */
	private ArrayList<PVector> foodTrail;

	/** stores the ant's location and passes it to the ToxicPheromone ArrayList trail. */
	private ArrayList<PVector> toxicTrail;

	/** checks whether to attack the predator or not. */
	private boolean attackPredator;
	
	/** checks whether the ant is trapped. */
	private boolean antTrapped;

	/** checks whether the ant has food. */
	private boolean hasFood;

	/** checks whether the ant has picked up biscuit. */
	private boolean hasBiscuit;

	/** checks whether the ant has picked up sugar. */
	private boolean hasSugar;

	/** checks whether the ant has picked up sugar. */
	private boolean hasToxic;

	/** checks whether the ant is intoxicated. */
	private boolean intoxicated;

	/** checks whether the food is toxic. */
	private boolean isToxic;

	/**
	 * @param location		determines the initial location of the ant - it starts from its home
	 * @param homeTrail		lets the ant input its location when searching for food, to the arraylist trail borrowed from the pheromone class
	 * @param foodTrail		lets the ant input its location when it obtains food to the arraylist trail borrowed from the pheromone class
	 * @param toxicTrail	lets the ant input its location if it obtained a toxic food into to the arraylist trail borrowed from the pheromone class
	 */
	public Ant(PVector location, ArrayList<PVector>homeTrail, ArrayList<PVector>foodTrail, ArrayList<PVector>toxicTrail)
	{
	}

	/**
	 * This second constructor was created to be used in the menu class with only the location as a parameter
	 * @param location determines the initial location of the ant - it starts from its home
	 */
	public Ant(PVector location)
	{
	}

	/**
	 * this method controls the movement of the ant.
	 * acceleration is added to the velocity 
	 * and the velocity is added to the location creating movement.
	 */
	public void update()
	{
	}

	/**
	 * this method receives outside forces and apply them to the ants acceleration.
	 */
	public void applyForce(PVector force)
	{
	}

	/**
	 * this method gets the ant's location, 
	 * where its coordinates will be inserted into the ArrayList of home trail 
	 * and accordingly the home pheromone will be created.
	 */
	public void addHomePheromone()
	{
	}

	/**
	 * this method gets the ant's location, 
	 * where its coordinates will be inserted into the ArrayList of food trail 
	 * and accordingly the food pheromone will be created.
	 */
	public void addFoodPheromone()
	{
	}

	/**
	 * this method gets the ant's location, 
	 * where its coordinates will be inserted into the ArrayList of toxic trail 
	 * and accordingly the toxic pheromone will be created.
	 */
	public void addToxicPheromone()
	{
	}

	/**
	 * this method makes the ant seek a random target which gives it
	 * a random movement in looking for food.
	 * it creates a random circular space around the ants with a vector circLeloc that has a random
	 * angle wandertheta and a target that is randomly placed around the circumference of the circle.
	 */
	public void wander()
	{
	}

	/**
	 * the seek method allows the ant to perceive a desired target 
	 * and to direct its movement towards this target.
	 * @param target	it accepts a PVector target to base its desired velocity on
	 */
	public void seek(PVector target)
	{
	}

	/**
	 * the flee method lets the ant flee whenever a danger is around. 
	 * @param target	it accepts a PVector target to base its desired velocity on
	 * 				the target is usually the Predator
	 */
	public void flee(PVector target)
	{
	}

	/**
	 * this method lets the ant flee from the predator if the distance between the ant
	 * and the predator got too close.
	 */
	public void fleePredator(Predator p)
	{
	}

	/**
	 * this method lets the ant attack the predator when the number of ants is over 3.
	 * @param predator		is the target that is going to be attacked by the ant.
	 * 					the distance is measured from the ant's location to the predator
	 * 					and depending on this distance and on the number of ants available in this distance
	 * 					the ant will decide to attack the predator
	 * @param ants			is the arraylist of ants, this parpameter is introduced in order to make every ant recognize
	 * 					it is surrounding ants. if the average number of ants is greater than 3, then the ants will decide to
	 * 					attack the predator if it was at a proximity from them.
	 */
	public boolean attackPredator(Predator predator, ArrayList<Ant> ants)
	{
	}

	/**
	 * this method makes the ant be trapped if it enters the Predator home
	 * and eventually it will be removed in the Colony class.
	 * @param ph		instance of Home, it will be used to access the PredatorHome location
	 */
	public void antTrapped(Home ph)
	{
	}

	/**
	 * @return antTrapped	this method returns a true value if the ant was trapped
	 */
	public boolean antTrapped() 
	{
	}

	/**
	 * this method lets the ant detect the location of the food pheromone at a certain distance
	 * once detected the ant will be able to seek food as a target
	 * @param biscuit		sets the biscuit target
	 * @param sugar		sets the sugar target
	 * @param toxic		sets the toxic target
	 */
	public void findFoodPheromone(FoodSource biscuit, FoodSource sugar, FoodSource toxic)
	{
	}

	/**
	 * this method lets the ant detect the location of the home pheromone at a certain distance
	 * once detected the ant will be able to seek home as a target.
	 * @param home		sets the home target
	 */
	public void findHomePheromone(Home h)
	{
	}

	/**
	 * this method lets the ant detect the location of the toxic pheromone at a certain distance
	 * once detected the ant will flee from it
	 */
	public void findToxicPheromone()
	{
	}

	/**
	 * this method is called in the colony class and else where
	 * to check whether the ant has food or not
	 */
	public boolean hasFood()
	{
	}

	/**
	 * returns true if the ant has biscuit
	 */
	public boolean hasBiscuit()
	{
	}

	/**
	 * returns true if the ant has sugar
	 */
	public boolean hasSugar()
	{
	}

	/**
	 * returns true if the ant has toxic
	 */
	public boolean hasToxic()
	{
	}

	/**
	 * this method lets the ant detect the food when it approaches at a certain distance from it
	 * the ant wanders around looking for food if food is selected and the ant smells the food
	 * it arrive() to the food source. every food source has a certain smell intensity and effect that affect the ant.
	 * @param biscuit		sets the target for biscuit to be detected by the ant
	 * @param sugar		sets the target for sugar to be detected by the ant
	 * @param toxic		sets the target for toxic to be detected by the ant
	 * @return isToxicFood	returns true if the ant was intoxicated
	 */
	public void findFood(FoodSource biscuit, FoodSource sugar, FoodSource toxic, boolean isToxicFood)
	{
	}

	/**
	 *this method makes the ant deliver the food to its home.
	 *@param home	instance of the AntHome. accesses the home location
	 */
	public void foodDelivery(Home home)
	{
	}

	/**
	 * this method is called in order to simulate the death of the ant 
	 * when it dies it slows down and wander and then disapears
	 * and it will be removed in Colony class 
	 * after the boolean intoxicated is set to true
	 */
	public void die()
	{
	}

	/**
	 * returns true if intoxicated
	 */
	public boolean isIntoxicated()
	{
	}

	/**
	 * this method is the same as the seek method 
	 * while the seek method maintains the same velocity when it gets near to the target
	 * the arrive method makes the ant slows down before reaching the target
	 * @param target    the target is of type PVector where the its location will be accessed
	 */
	public void arrive(PVector target)
	{
	}

	/**
	 * this method checks if the ant has reached home
	 * @param home    	accesses the home location
	 * @return     	returns true if the ant entered its home
	 * 				if the distance between the ant and the home is less then the home diameter
	 */
	public boolean reachHome(Home home)
	{
	}

	/**
	 * this method draws and replaces the food particle that is deleted
	 * once the ant apprroaches and touches the FoodSource
	 * creating the illusion that the ant picked up the food
	 */
	public void displayCarriedFood()
	{
	}
	
	/**
	 * this method calls the displayAnt method to draw the ant and specifies a heading angle value
	 * in order to make the ant rotate at a certain direction
	 */
	public void display()
	{
	}

	/**
	 * this method calls the displayAnt method to draw the Ant and
	 * displays the ant as an icon 
	 * @param x        x location of icon
	 * @param y        y location of icon
	 * @param value    transparency value
	 */
	public void displayAntIcon(float x, float y, int value)
	{
	}

	/**
	 * this method is used in conjunction with the displayIcon method
	 * in order to set an alpha value to the ant icon
	 * whenever it is selected or unselected
	 */
	public int setLifeSpan(int value)
	{
	}

	/**
	 * this method draws the different parts of the ant
	 * just for the prototype
	 * @param c           a description of the parameter "c       "
	 * @param lifeSpan    a description of the parameter "lifeSpan"
	 * @param rotation    a description of the parameter "rotation"
	 * @param r1          a description of the parameter "r1      "
	 * @param r2          a description of the parameter "r2      "
	 * @param r3          a description of the parameter "r3      "
	 */
	public void displayAnt(color c, int lifeSpan, float rotation, float r1, float r2, float r3)
	{
	}

	/**
	 * this method checks whether the ant has surpassed 
	 * the edges of the window and reverces its velocity accordingly
	 * so it can go in the opposite direction if it hit the edge
	 */
	public void checkEdges()
	{
	}

	
}