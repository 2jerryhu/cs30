// OOP Walker demo

let kevins = [];

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.color = "red";
    this.speed = 5;
    this.size = 5;
  }

  display() {
    noStroke;
    fill(this.color);
    circle(this.x, this.y, this.size); 
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else{
      // right
      this.x += this.speed;
    }
  }
}

let kevin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new Walker();
  kevin.color = "blue";
}

function draw() {
  background(220);

  for (let kev of kevins) {
    kev.move();
    kev.display();
    
  }
  kevin.move();
  kevin.display();
  kevins.push( new Walker());
}
