// donut
let donut = [];
// function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);
//   describe('a rotating white torus');
// }

// function draw() {
//   background(205, 102, 94);
//   rotateX(frameCount * 0.05);
//   rotateY(frameCount * 0.01);
//   torus(50, 55);
// }

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){

}

function spawnBubble() {
  let donut_properties = {
    x: random(width),
    y: random(height),
    size: random(5, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
  donut.push(donut_properties);
}