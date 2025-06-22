/*
  this class is the draws the background
 and on top of the background it draws a noise texture simulating the sand
 */
class Land {

  //the x and y position
  PVector location;
  //the rGB are stored in the backgroundColor of type color
  final color backgroundColor;
  //RGB values of the background or soil color
  final int landR;
  final int landG;
  final int landB;
  //width and height
  final int wSize;
  final int hSize;
  final int size;
  //increments the xoffset and the yoffset 
  //creating the texture on the background
  float increment;

  /////////////////////////////////////////////////////////////////////////////////
  //CONSTRUCTOR
  Land() {
    //initial width and height values;
    wSize = width;
    hSize = height;
    size = wSize * hSize;
    //initial location value, at the top left corner of the window
    location = new PVector(0, 0);
    //initial RGB values - grey
    landR = 120;
    landG = 90;
    landB = 60;
    backgroundColor = color(landR, landG, landB);
    //innitial valu e of the incrementation
    increment = 0.5;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws the background as a rectangle with no strokes
  //and the color value set to backgroundColor 
  void displayLand() {
    rectMode(CORNER);
    noStroke();
    fill(backgroundColor);
    rect(location.x, location.y, size, size);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //this method draws a noise map over the background
  //this method was modified from the original code in order to better
  //simulate the sand texture.
  void texture() {
    //this code was taken from the Nature of Code by Daniel Shiffman
    //http://natureofcode.com
    //accessed Saturday April 5 2014
    loadPixels();
    //Start xOffset at 2
    float xOffset = 2; 
    // For every x,y coordinate in a 2D space, 
    //calculate a noise value and produce a brightness value
    for (int x = 0; x < width ; x += 5) {
      //Increment xoff
      xOffset += increment;
      // For every xoff, start yOffset at 0    
      float yOffset = 2;   
      for (int y = 0; y < height ; y += 5) {
        //increment yOffset
        yOffset += increment; 
        // Calculate noise and scale by 255
        float bright = noise(xOffset + 255, yOffset + 0) * 255;
        // Set each pixel onscreen to a grayscale value
        pixels[x + (y * width)] = color(bright, bright - 20, 0, 100);
      }
    }
    updatePixels();
  }
}

