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
let two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, tentwentyfour, twentyfortyeight, fortynintysix, eightyonenintytwo;

let squares = [1];

function preload() {
  for (let i = 1; i <= 13; i++) {
    let num = 2 ** i;
    num = String(num).concat(".png");
    squares.push(loadImage("assets/".concat(num)));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  grid = createGrid(ROWS, COLS);
  if (width < height) {
    cellSize = width/COLS - cellGapX * 1.2;
  }
  if (width > height) {
    cellSize = height/ROWS - cellGapY * 1.2;
  }
  background(95);
  displayGrid();
  spawnBlock();
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
    cellGapX += -80;
  }
  cellGapX = 20;
  cellGapY = 20;
}

function createGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push([0]);  
    }
  }
  return newGrid;
}

function spawnBlock() {
  let randomX = [0, 1, 2, 3];
  let randomY = [0, 1, 2, 3];
  for (let y = 0; y < ROWS; y++) {
    console.log(y);
    for (let x = 0; x < COLS; x++) {
      console.log(x);
      console.log(grid[y][x]);
      if (grid[y][x] !== 0 ) {
        randomX.remove(x);
        console.log(randomX);
        // randomY.splice(y, 1);
      }
    }
  }
  console.log(randomX);
  if (random(10) > 1) {
    image(squares[1], randomX * (cellSize + cellGapX) + cellGapX, randomY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    // grid[randomX][randomY] = 1;
  }
  else {
    image(squares[2], randomX * (cellSize + cellGapX) + cellGapX, randomY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[randomX][randomY] = 2;
  }
}

function beginGame() {

}