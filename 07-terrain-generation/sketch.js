// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangle();
}

function draw() {
  background(220);
  
  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += 5;
  }

  for (let i = xOffset; i < xOffset + width; i++) {
    rect(terrain[i].x - xOffset, height - terrain[i].height, 1, terrain[i].height);
  } 
}

function spawnRectangle() {
  let time = 0;
  for (let x = 0; x < 2000; x++){ 
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}