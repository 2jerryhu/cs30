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
let action = 0;

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
    if (action !== 0) {
      spawnBlock();
    }
  }
  if (keyCode === 39) {
    moveRight();
    if (action !== 0) {
      spawnBlock();
    }
  }
  if (keyCode === 38) {
    moveUp();
    if (action !== 0) {
      spawnBlock();
    }
  }
  if (keyCode === 37) {
    moveLeft();
    if (action !== 0) {
      spawnBlock();
    }
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
  let notAllowedLocation = [];
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
      }
    }
  }
  
  if (notAllowedLocation !== []) {
    while (counter !== notAllowedLocation.length) {
      coordinates.pop();
      coordinates.pop();
      coordinates.push(Math.floor(random(4)))
      coordinates.push(Math.floor(random(4)))
  
      counter = 0;
  
      for (let w = 0; w < notAllowedLocation.length; w++) {
        if (notAllowedLocation[0][w][0] !== coordinates[0] || notAllowedLocation[0][w][1] !== coordinates[1]) {
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
  let alreadyMerged = [];
  action = 0;

  for (let y = ROWS - 1; y >= 0; y--) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        let i = y;
        let availableIndex;

        if (y === 3) {
          availableIndex = 3;
        }
        else {
          availableIndex = i;
        }

        while (i < 3) {
          if (grid[i+1][x] === 0) {
            availableIndex++;
          }
          i++;
        }

        if (availableIndex !== 3) {
          if (grid[y][x] === grid[availableIndex + 1][x]) {
            mergeUpDown(y, x, availableIndex, alreadyMerged, 1);
            action++;
          }
          else if (grid[availableIndex][x] !== grid[availableIndex + 1][x] && availableIndex !== y) {
            grid[availableIndex][x] = grid[y][x];
            grid[y][x] = 0;
            image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
            action++
          }
        }

        else if (availableIndex === 3 && y !== 3) {
          grid[availableIndex][x] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
          action++;
        }
      }
    }
  }
}

function moveUp() {
  let alreadyMerged = [];
  action = 0;
  
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        let i = y;
        let availableIndex;

        if (y === 0) {
          availableIndex = 0;
        }
        else {
          availableIndex = i;
        }

        while (i > 0) {
          if (grid[i - 1][x] === 0) {
            availableIndex--;
          }
          i--;
        }

        if (availableIndex !== 0) {
          if (grid[y][x] === grid[availableIndex - 1][x]) {
            mergeUpDown(y, x, availableIndex, alreadyMerged, -1);
            action++;
          }
          else if (grid[availableIndex][x] !== grid[availableIndex - 1][x] && availableIndex !== y) {
            grid[availableIndex][x] = grid[y][x];
            grid[y][x] = 0;
            image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
            action++
          }
        }

        else if (availableIndex === 0 && y !== 0) {
          grid[availableIndex][x] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
          action++;
        }
      } 
    }
  }
}

function mergeUpDown(y, x, i, array, oneSign) {
  let proceed = false;
  if (array.length === 0) {
    proceed = true;
  }
  else {
    for (let nums in array) {
      if (array[nums][0] !== i + oneSign && array[nums][1] !== x) {
        proceed = true;  
      }
    }
  }
  if (proceed === true) {
    grid[i + oneSign][x] = (grid[i + oneSign][x]) + 1;
    grid[y][x] = 0;
    image(squares[grid[i + oneSign][x]], x * (cellSize + cellGapX) + cellGapX, (i + oneSign) * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    array.push([i + oneSign, x]);
  }
  else {
    grid[i][x] = grid[y][x];
    image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[y][x] = 0;
    console.log(grid[i][x]);
  }
}

function moveRight() {
  let alreadyMerged = [];
  action = 0;

  for (let x = COLS - 1; x >= 0; x--) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[y][x] !== 0) {
        let i = x;
        let availableIndex;

        if (x === 3) {
          availableIndex = 3;
        }
        else {
          availableIndex = i;
        }

        while (i < 3) {
          if (grid[y][i + 1] === 0) {
            availableIndex++;
          }
          i++;
        }

        if (availableIndex !== 3) {
          if (grid[y][x] === grid[y][availableIndex + 1]) {
            mergeLeftRight(y, x, availableIndex, alreadyMerged, 1);
            action++;
          }
          else if (grid[y][availableIndex] !== grid[y][availableIndex + 1] && availableIndex !== x) {
            grid[y][availableIndex] = grid[y][x];
            grid[y][x] = 0;
            image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
            action++
          }
        }

        else if (availableIndex === 3 && x !== 3) {
          grid[y][availableIndex] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
          action++;
        }
      }
    }
  }
}

function moveLeft() {
  let alreadyMerged = [];
  action = 0;

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[y][x] !== 0) {
        let i = x;
        let availableIndex;

        if (x === 0) {
          availableIndex = 0;
        }
        else {
          availableIndex = i;
        }

        while (i > 0) {
          if (grid[y][i - 1] === 0) {
            availableIndex--;
          }
          i--;
        }

        if (availableIndex !== 0) {
          if (grid[y][x] === grid[y][availableIndex - 1]) {
            mergeLeftRight(y, x, availableIndex, alreadyMerged, -1);
            action++;
          }
          else if (grid[y][availableIndex] !== grid[y][availableIndex - 1] && availableIndex !== x) {
            grid[y][availableIndex] = grid[y][x];
            grid[y][x] = 0;
            image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
            action++
          }
        }

        else if (availableIndex === 0 && x !== 0) {
          grid[y][availableIndex] = grid[y][x];
          grid[y][x] = 0;
          image(squares[grid[y][availableIndex]], availableIndex * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
          action++;
        }
      }
    }
  }
}

function mergeLeftRight(y, x, i, array, oneSign) {
  let proceed = false;
  if (array.length === 0) {
    proceed = true;
  }
  else {
    for (let nums in array) {
      if (array[nums][0] !== i + oneSign && array[nums][1] !== x) {
        proceed = true;  
      }
    }
  }
  if (proceed === true) {
    grid[y][i + oneSign] = (grid[y][i + oneSign]) + 1;
    grid[y][x] = 0;
    image(squares[grid[y][i + oneSign]], (i + oneSign) * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    array.push([y, i + oneSign]);
  }
  else {
    grid[y][i] = grid[y][x];
    image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[y][x] = 0;
  }
}