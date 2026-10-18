/**
 * Write a description of class "Predator" here.
 * 
 * @author     CRHanna
 * @version    05/03/2014 19:24:18
 */
class Predator {

	/**
	 * Write a description of this constructor here.
	 */
	public Predator(PVector location)
	{
	}
	
	/** Write a description of field "location" here. */
	private PVector location;

	/** Write a description of field "velocity" here. */
	private PVector velocity;

	/** Write a description of field "acceleration" here. */
	private PVector acceleration;
	
	/** Write a description of field "hSize" here. */
	private final float hSize;

	/** Write a description of field "wSize" here. */
	private final float wSize;

	/** Write a description of field "mass" here. */
	private final float mass;

	/** Write a description of field "predatorSize" here. */
	private float predatorSize;

	/** Write a description of field "maxSpeed" here. */
	private float maxSpeed;

	/** Write a description of field "maxForce" here. */
	private float maxForce;

	/** Write a description of field "head" here. */
	private float head;

	/** Write a description of field "wandertheta" here. */
	private float wandertheta;

	/** Write a description of field "border" here. */
	private int border;

	/** Write a description of field "appear" here. */
	private int appear;

	/** Write a description of field "lifeSpan" here. */
	private int lifeSpan;

	/** Write a description of field "predatorR" here. */
	private int predatorR;

	/** Write a description of field "predatorG" here. */
	private int predatorG;

	/** Write a description of field "predatorB" here. */
	private int predatorB;

	/** Write a description of field "predatorColor" here. */
	private color predatorColor;

	/** Write a description of field "hasFood" here. */
	private boolean disappear;
	
	/** Write a description of field "isAttacked" here. */
	private boolean isAttacked;


	/**
	 * Write a description of method "run" here.
	 */
	public void run()
	{
	}

	/**
	 * Write a description of method "update" here.
	 */
	public void update()
	{
	}

	/**
  	*this method receives outside forces and apply them to the predator movement
   	*/
  	public void applyForce(PVector force) 
  	{
  	}
	
	/**
	 * Write a description of method "wander" here.
	 */
	public void wander()
	{
	}

	/**
	 * Write a description of method "seek" here.
	 * @param targer    a description of the parameter "targer"
	 */
	public void seek(PVector target)
	{
	}

	/**
	 * Write a description of method "flee" here.
	 * @param target    a description of the parameter "target"
	 */
	public void flee(PVector target)
	{
	}

	/**
	 * Write a description of method "attackAnts" here.
	 * @param ants    a description of the parameter "ants"
	 */
	public void attackAnts(ArrayList <Ant> ants)
	{
	}

	/**
	 * Write a description of method "fleeFromAnts" here.
	 */
	public void fleeFromAnts(ArrayList <Ant> ants, PredatorHome home, Menu menu)
	{
	}

	/**
	 * Write a description of method "enterHome" here.
	 */
	public void enterHome(PredatorHome home, Menu menu)
	{
	}

	/**
	 * Write a description of method "display" here.
	 */
     public void display()
     {
     }

	/**
	 * Write a description of method "displayPredatorIcon" here.
	 */
	public void displayPredatorIcon(int value, float x, float y)
	{
	}

	/**
	 * Write a description of method "displayPredator" here.
	 */
	public void displayPredator(int lifeSpan, float rotation1, float rotation2, float r)
	{
	}

	/**
	 * Write a description of method "checkEdges" here.
	 */
	public void checkEdges()
	{
	}

	
     
}