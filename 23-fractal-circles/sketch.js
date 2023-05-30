// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  let theDepth = 8;
  // map(mouseX, 0, width, 0, 10);
  fractalCircle(width/2, width, theDepth);
}

function fractalCircle(x, diameter, depth) {
  // base case
  push();

  fill(255 * depth - mouseX % 255 * depth);
  circle(x, height/2, diameter);
  pop();
  if (depth > 0) {
    depth--;
    fractalCircle(x - diameter/4, diameter/2, depth);
    fractalCircle(x + diameter/4, diameter/2, depth);
  }
}