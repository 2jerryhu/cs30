// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall(width/2, height/2);
}

function draw() {
  background(220);
  moveShapes();
  displayShapes();
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function moveShapes() {
  for (let i = 0; i < shapes.length; i++){
    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
    
  }
}

function displayShapes(){
  for (let i=0; i<shapes.length; i++){
    fill(shapes[i].theColor);
    circle(shapes[i].x, shapes[i].y, shapes[i].diameter); 
  }
}

function spawnBall(tempx, tempy) {
  let newBall = {
    x: tempx,
    y: tempy,
    dx: random(-5, 5),
    dy: random(-5, 5),
    diameter: random(25, 100),
    theColor: color(random(255), random(255), random(255))
  };
  shapes.push(newBall);
}