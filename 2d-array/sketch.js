// 2d Array
// Jerry Hu
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 4;
const COLS = 4;
let grid;
let cellSize; 
let cellGap; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createGrid(ROWS, COLS);
  if (width < height) {
    cellSize = width/COLS;
  }
  if (width > height) {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function createGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push([]);
    }
  }
  return newGrid();
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      fill("grey");
      rect(x * cellSize, y * cellSize, cellSize. cellSize);
    }
  }
}