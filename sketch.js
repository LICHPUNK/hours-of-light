// This function runs once when the page loads
function setup() {
  // Set up the canvas
  var size = 1000;                           // Define the size of the canvas
  var dpr = window.devicePixelRatio;        // Get the device pixel ratio
  var canvas = createCanvas(size * dpr, size * dpr);     // Create the canvas element
  canvas.style('border-width', '40px');
  canvas.style('border-style', 'solid');
  canvas.style('border-image-slice', '300');
  canvas.style('border-image-source', 'linear-gradient(to right, black, rgb(88,88,88), black)');
  canvas.style('box-shadow', 'inset 0 0 30px rgba(0, 0, 0, 0.8)');
  pixelDensity(dpr);                        // Set the pixel density

  // Define the grid properties
  var cols = 23;                            // Define the number of columns in the grid
  var rows = 16;                            // Define the number of rows in the grid
  var days = 365;                           // Define the number of days to loop over
  var latitude = 30; // latitude of the observer in degrees
  var phi, theta, scaleValue;
  
  var gridw = size * 0.9;                   // Define the width of the grid
  var gridh = size * 0.7;                   // Define the height of the grid
  var cellw = gridw / cols;                 // Calculate the width of each cell in the grid
  var cellh = gridh / rows;                 // Calculate the height of each cell in the grid
  var margx = (size - gridw) * 0.5;          // Calculate the x margin for the grid
  var margy = (size - gridh) * 0.5;          // Calculate the y margin for the grid

  // Loop over each day
  for (let i = 0; i < days; i++) {
    var col = Math.floor(i / rows);         // Calculate the column index for this cell
    var row = i % rows;                     // Calculate the row index for this cell

    var x = margx + col * cellw;            // Calculate the x position for this cell
    var y = margy + row * cellh;            // Calculate the y position for this cell
    var w = 4;                              // Define the width of the rectangle
    var h = 30;                             // Define the height of the rectangle

    // Save the current canvas state
    push();
    
    // Translate to the center of the cell
    translate(x, y);
    
    // Translate to the center of the rectangle
    translate(cellw * 0.5, cellh * 0.5);

    // Calculate the angle of sunrise based on the day of the year and the latitude of the observer
    phi = (i - 1) * 2 * Math.PI / 365;
    theta = Math.acos(-Math.tan(latitude * Math.PI / 180) * Math.tan(0.4093 * Math.cos(phi)));
    theta = -theta + Math.PI / 2;

    rotate(theta);

    // Scale the rectangle based on the day number
    var scaleValue = Math.abs(Math.sin(phi)) * 2 + 1;
    scale(scaleValue, 1.12);
    
    fill(0);

    // Draw the rectangle
    rectMode(CENTER);
    rect(0, 0, w, h);

    // Restore the canvas state
    pop();
  }
}
