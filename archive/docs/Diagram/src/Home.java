/**
 *  this class draws the home or the origin point 
 it is the parent to two subclasses: 
 PredatorHome and AntHome
 * 
 * @author     CRHanna
 * @version    05/03/2014 15:50:14
 */
 private abstract class Home {

	/** the x and y coordinates. */
	public PVector origin;

	/** the size of the home. */
	private final int diameter;

	/**
	 * @param origin    location vector of the home
	 * @param diameter	width and height of the home 
	 */
	public Home(PVector origin, int diameter)
	{
	}

	/**
	 * @return       the diameter of the home
	 */
	public int getDiameter()
	{
	}

	/**
	 * this method draws the home as a black ellipse
	 */
	public void display()
	{
	}
}