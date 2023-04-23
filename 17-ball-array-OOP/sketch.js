// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(5, 20);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.alpha = random(100, 255);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x <= 0 + this.radius || this.x >= width - this.radius) {
      this.dx *= -1;
    }
    if (this.y <= 0 + this.radius || this.y >= height - this.radius) {
      this.dy *= -1;
    }
  }

  collisionCheck(otherBall) {
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let radiiSum = this.radius + otherBall.radius;
    if (distanceApart < radiiSum) {
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      
      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  for (let someBall of ballArray) {
    someBall.update();
    for (let otherBall of ballArray) {
      if (someBall !== otherBall){
        someBall.collisionCheck(otherBall);
      }
    }
    someBall.display();

  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}