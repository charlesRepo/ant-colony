/**
 * this class is the draws the background
 and on top of the background it draws a noise texture simulating the sand
 * 
 * @author     CRHanna
 * @version    05/03/2014 16:02:53
 */
public class Land {

/** the location vector. */
	private final color backgroundColor;
	
	/** Red channel of the land. */
	private final int landR;

	/** Green channel of the land. */
	private final int landG;

	/** Blue channel of the land. */
	private final int landB;

	/** width of the land. */
	private final int wSize;

	/** height of the land. */
	private final int hSize;

	/** area of the land. */
	private final int size;

	/** increments the xoffset and the yoffset for creating the texture on the background. */
	private float increment;

	/**
	 */
	public Land()
	{
	}

	/**
	 * this method draws the background as a rectangle with no strokes
	 * and the color value set to backgroundColor
	 */
	public void displayLand()
	{
	}

	/**
	 * this method draws a noise map over the background
	 * this method was modified from the original code in order to better
	 * simulate the sand texture.
	 */
	public void texture()
	{
	}
}