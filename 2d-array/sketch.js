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
let cellGapX = 20;
let cellGapY = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createGrid(ROWS, COLS);
  if (width < height) {
    cellSize = width/COLS - cellGapX;
  }
  if (width > height) {
    cellSize = height/ROWS - cellGapY;
  }
  background(95);
  displayGrid();
}

function draw() {
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      fill(168);
      rect(x * cellSize + cellGapX, y * cellSize + cellGapY, cellSize, cellSize);
      cellGapX += 20;
    }
    cellGapY += 20;
    cellGapX += - 80;
  }
}

function createGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push();  
    }
  }
  return newGrid;
}