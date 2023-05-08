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
let squares = [0];

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
  beginGame();
}

function draw() {
  resetGrid()
}

function keyPressed(){
  if (keyCode === 40) {
    moveDown();
    spawnBlock();
  }
  if (keyCode === 39) {
    moveRight();
    spawnBlock();
  }
  if (keyCode === 38) {
    moveUp();
    spawnBlock();
  }
  if (keyCode === 37) {
    moveLeft();
    spawnBlock();
  }
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
      newGrid[y].push(0);  
    }
  }
  return newGrid;
}

function spawnBlock() {
  let notAllowedLocation;
  let badCoordinates = [];
  let coordinates = []
  let counter = 0;
  let theX;
  let theY;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        badCoordinates.push([y, x]);
        notAllowedLocation.push(badCoordinates);
        console.log(notAllowedLocation);
      }
    }
  }
 
  if (coordinates !== undefined) {
    while (counter !== notAllowedLocation.length) {
      coordinates.pop();
      coordinates.pop();
      coordinates.push(Math.floor(random(4)))
      coordinates.push(Math.floor(random(4)))
      console.log(coordinates);

      counter = 0;

      for (let w = 0; w < notAllowedLocation.length; w++) {
        if (notAllowedLocation[w][0] !== coordinates[0] || notAllowedLocation[w][1] !== coordinates[1]) {
          console.log(notAllowedLocation[w][0]);
          console.log(coordinates[0]);
          counter ++;
        }
      }
    }
  }

  if (coordinates[1] === undefined) {
    theX = Math.floor(random(4));
  }
  else {
    theX = coordinates[1];
  }

  if (coordinates[0] === undefined) {
    theY = Math.floor(random(4));
  }
  else {
    theY = coordinates[0];
  }

  console.log([theY, theX]);

  if (random(10) > 1) {
    image(squares[1], theX * (cellSize + cellGapX) + cellGapX, theY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[theY][theX] = 1;
  }
  else {
    image(squares[2], theX * (cellSize + cellGapX) + cellGapX, theY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[theY][theX] = 2;
  }
}

function beginGame() {
  spawnBlock();
  spawnBlock();
}

function resetGrid(){
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 0) {
        fill(168);
        rect(x * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
      }
    }
  }
}

function moveDown() {
  for (let y = ROWS - 1; y >= 0; y--) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        let i = y;
        let availableIndex = 3;

        while (i < 3) {
          availableIndex = i;
          if (grid[i+1][x] === 0) {
            availableIndex++;
          }
          i++;
        }
        
        if (grid[y][x] === grid[i][x] && i - availableIndex === 1) {
          mergeDown(y, x, i);
        }
        else if (availableIndex === i && y !== 3) {
          grid[i][x] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
        else if (i - availableIndex === 1 && i - y > 1 && grid[availableIndex][x] !== grid[i][x]){
          grid[availableIndex][x] = grid[y][x];
          grid[y][x] = 0; 
          image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
      } 
    }
  }
}

function mergeDown(y, x, i) {
  grid[y][x] = 0;
  grid[i][x] = (grid[i][x]) + 1;
  image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
}

function moveUp() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        let i = y;
        let availableIndex = 0;

        while (i > 0) {
          availableIndex = i;
          if (grid[i-1][x] === 0) {
            availableIndex--;
          }
          i--;
        }
        
        if (grid[y][x] === grid[i][x] && availableIndex - i === 1) {
          mergeUp(y, x, i);
        }
        else if (availableIndex === i && y !== 0) {
          grid[i][x] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
        else if (availableIndex - i === 1 && y - i > 1 && grid[availableIndex][x] !== grid[i][x]){
          grid[availableIndex][x] = grid[y][x];
          grid[y][x] = 0; 
          image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
      } 
    }
  }
}

function mergeUp(y, x, i) {
  grid[y][x] = 0;
  grid[i][x] = (grid[i][x]) + 1;
  image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
}

function moveRight() {
  for (let x = COLS - 1; x >= 0; x--) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[y][x] !== 0) {
        let i = x;
        let availableIndex = 3;

        while (i < 3) {
          availableIndex = i;
          if (grid[y][i+1] === 0) {
            availableIndex++;
          }
          i++;
        }
        
        if (grid[y][x] === grid[y][i] && i - availableIndex === 1) {
          mergeRight(y, x, i);
        }
        else if (availableIndex === i && x !== 3) {
          grid[y][i] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
        else if (i - availableIndex === 1 && i - x > 1 && grid[y][availableIndex] !== grid[y][i]){
          grid[y][availableIndex] = grid[y][x];
          grid[y][x] = 0; 
          image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
      } 
    }
  }
}

function mergeRight(y, x, i) {
  grid[y][x] = 0;
  grid[y][i] = (grid[y][i]) + 1;
  image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
}

function moveLeft() {
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[y][x] !== 0) {
        let i = x;
        let availableIndex = 0;

        while (i > 0) {
          availableIndex = i;
          if (grid[y][i-1] === 0) {
            availableIndex--;
          }
          i--;
        }
        
        if (grid[y][x] === grid[y][i] && availableIndex - i === 1) {
          mergeLeft(y, x, i);
        }
        else if (availableIndex === i && x !== 0) {
          grid[y][i] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
        else if (availableIndex - i === 1 && x - i > 1 && grid[y][availableIndex] !== grid[y][i]){
          grid[y][availableIndex] = grid[y][x];
          grid[y][x] = 0; 
          image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
        }
      } 
    }
  }
}

function mergeLeft(y, x, i) {
  grid[y][x] = 0;
  grid[y][i] = (grid[y][i]) + 1;
  image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
}

