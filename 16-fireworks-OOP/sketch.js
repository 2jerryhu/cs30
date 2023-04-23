// Fireworks OOP
// trig + gravity

class Spark {
  constructor(x, y, dx, dy, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.a--;
  }

  isDead() {
    return this.a <= 0;
  }
}

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background("black");
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();

    // remove if needed
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
  }
}

function spawnSpark(r, g, b, angle) {
  let theSpark = new Spark(mouseX, mouseY, cos(angle), sin(angle), r, g, b);
  fireworks.push(theSpark);
}

function mousePressed() {
  for (let i = 0; i < 360; i++) {
    spawnSpark(random(255), random(255), i);
  }
}