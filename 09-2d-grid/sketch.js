// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];

// let grid = [[0, 0, 1, 1],
//            [1, 1, 0, 0],
//            [0, 1, 0, 1],
//            [1, 1, 1, 1]];

const ROWS = 4;
const COLS = 4;
let cellSize; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  if (width < height){
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
  background(220);
  displayGrid();
}

function keyTyped() {
  grid = createRandomGrid(ROWS, COLS);
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1){
    grid[y][x] = 0;
  }
}

function displayGrid(){
  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < COLS; x++){
      if (grid[y][x] === 1){
        fill("black");
      }
      else if (grid[y][x] === 0){
        fill("white");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createRandomGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++){
    newGrid.push([]);
    for (let x = 0; x < COLS; x++){
      if (random(2) < 1){
        newGrid[y][x].push([0]);
      }
      if (random(2) < 1){
        newGrid[y][x].push([0]);
      }
    }
  }
  return newGrid;
}