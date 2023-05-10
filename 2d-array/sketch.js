// 2d Array
// Jerry Hu
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// defining variables that will be used later on
const ROWS = 4;
const COLS = 4;
let grid;
let cellSize; 
let cellGapX = 20;
let cellGapY = 20;
let squares = [0];
let action = 0;

// this function preloads an image for each value and pushes them into an array. The index of the array needs to be raised to the
// power of 2 to determine the value of each image (square).
function preload() {
  for (let i = 1; i <= 13; i++) {
    let num = 2 ** i;
    num = String(num).concat(".png");
    squares.push(loadImage("assets/".concat(num)));
  }
}

// the setup function creates a grid for the numbers to be stored in, displays the grid, and begins the game
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

// the only thing in the draw function is a function that resets the displayed blocks every time blocks are shifted around
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
  // setting and defining variables
  let notAllowedLocation = [];
  let badCoordinates = [];
  let coordinates = []
  let counter = 0;
  let theX;
  let theY;
  
  // this for loop checks each number in the grid. If the value at a grid location is not equal to 0, its coordinates will be pushed to an array.
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        badCoordinates.push([y, x]);
        notAllowedLocation.push(badCoordinates);
      }
    }
  }
  
  // The first time a block is spawned, the notAllowedLocation array will be empty because there are no values in the grid. The if statement
  // tells the code to skip this while loop the first time blocks are spawned.
  if (notAllowedLocation !== []) {

    // The goal of this while loop is to generate random coordinates for a new block to be spawned at a non zero location. A random 
    // coordinate will be generated and checked with each coordinate in the notAllowedLocation array. 
    // If it equals a coordinate in the array, a new coordinate is generated. The while loop will be completed once a coordinate is
    // generated that does not equal any other coordinate in the notAllowedLocation array.
    while (counter !== notAllowedLocation.length) {
      coordinates.pop();
      coordinates.pop();
      coordinates.push(Math.floor(random(4)))
      coordinates.push(Math.floor(random(4)))
  
      counter = 0;
      
      // This is the for loop that checks each coordinate value with the randomly generated coordinate value. 
      for (let w = 0; w < notAllowedLocation.length; w++) {
        if (notAllowedLocation[0][w][0] !== coordinates[0] || notAllowedLocation[0][w][1] !== coordinates[1]) {
          counter ++;
        }
      }
    }
  }

  // The first time this code runs, the while loop above will not run. If the coordinate array is undefined, a coordinate will be generated randomly.
  // If the while loop above runs, the X and Y locations will be assigned to the randomly generated coordinates above.
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

  // This randomness makes it so that there is a 10% a "4" block spawns.
  if (random(10) > 1) {
    // The image that will be displayed will be a "2" block, because the index value in the squares array is 1 (and 2 to the power of 1 is 2).
    // The image will be spawned at the coordinates generated above, and will be offset to account for the gaps between cells.
    image(squares[1], theX * (cellSize + cellGapX) + cellGapX, theY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[theY][theX] = 1;
  }
  else {
    image(squares[2], theX * (cellSize + cellGapX) + cellGapX, theY * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    grid[theY][theX] = 2;
  }
}

// to begin 2048, 2 blocks must be spawned
function beginGame() {
  spawnBlock();
  spawnBlock();
}

// After moving the grid around, the grid must be reset so that the grid values that are 0 don't display images.
function resetGrid(){
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      // if the grid value is 0, display an empty square.
      if (grid[y][x] === 0) {
        fill(168);
        rect(x * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
      }
    }
  }
}

function moveDown() {
  // the alreadyMerged array checks which grid values have already merged (ex 2 and 2 make 4, that 4 block cannot combine again).
  let alreadyMerged = [];
  // the action variable counts how many squares have been moved. if no squares are moved a new block is not spawned
  action = 0;

  // the for loop counts from the bottom x row to the top y row because the blocks will be moving down. 
  for (let y = ROWS - 1; y >= 0; y--) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== 0) {
        let i = y;
        // the availableIndex variable's goal is to return the availible grid index that the square can move to.
        let availableIndex;

        // if the y value is 3, then availibleIndex is already at its max. If it's not, it's set to the square's current y position
        if (y === 3) {
          availableIndex = 3;
        }
        else {
          availableIndex = i;
        }

        // if the y value below the current availible index is availible (equal to 0), then the next square will be remembered as available.
        while (i < 3) {
          if (grid[i+1][x] === 0) {
            availableIndex++;
          }
          i++;
        }

        // if the availible index is not 3 (meaning not on the bottom row), then run the following lines
        if (availableIndex !== 3) {
          // If the value of the original location of the square is equal to the value of the square below the availible index, then merge
          // the 2 values 
          if (grid[y][x] === grid[availableIndex + 1][x]) {
            mergeUpDown(y, x, availableIndex, alreadyMerged, 1);
            action++;
          }
          // if the value of the current grid location is not equalto the value of the square below the availible index, AND the availible index
          // is not equal to y, then the availible index location takes the value of the original (y, x), AND the original location is set to
          // value zero. 
          else if (grid[availableIndex][x] !== grid[availableIndex + 1][x] && availableIndex !== y) {
            grid[availableIndex][x] = grid[y][x];
            grid[y][x] = 0;
            image(squares[grid[availableIndex][x]], x * (cellSize + cellGapX) + cellGapX, availableIndex * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
            action++
          }
        }
        // if the availible index is equal to 3 and the square isn't already at 3, then move the square to the availible index and set
        // its original location to the value zero.
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

// same as moveDown function, but it counts from the top y row to the bottom y row.
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

// this function controls merging squares in the up/down direction. The onesign changes + 1 into - 1, so this function can be used for 
// both the up and down directions.
function mergeUpDown(y, x, i, array, oneSign) {
  // The array that is passed into this function is the alreadyMerged array. This array stores the location of a square if it has already
  // been merged with another square. The same square cannot merge twice, so this array is used to prevent that. 

  let proceed = false;

  // If there are no squares that have already been merged, then proceed on
  if (array.length === 0) {
    proceed = true;
  }
  // If there are elements in the array, then the for loop compares the square that wants to be merged and the squares that have already been merged
  // Also, if i + 1 is equal to 0 or 3, then the function can proceed on.
  else {
    for (let nums in array) {
      if (array[nums][0] !== (i + oneSign) && array[nums][1] !== x || (i + oneSign) === 3 || (i + oneSign) === 0) {
        proceed = true;  
      }
    }
  }

  // if the function is allowed to proceed, then the 2 blocks will merge. One of the blocks will be set to 0, while the other block will have
  // its value increased by one. Increasing 2 to the power of the exponent + 1 is equivalant to multiplying the value by 2. 
  if (proceed === true) {
    grid[i + oneSign][x] = (grid[i + oneSign][x]) + 1;
    grid[y][x] = 0;
    image(squares[grid[i + oneSign][x]], x * (cellSize + cellGapX) + cellGapX, (i + oneSign) * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
    array.push([i + oneSign, x]);
  }
  // If it is not allowed to merge (more than once), then the availible index is set to the original location, and the original location
  // is set to 0.
  else if (y !== i) {  
    console.log([y, i]);
    grid[i][x] = grid[y][x];
    grid[y][x] = 0;
    image(squares[grid[i][x]], x * (cellSize + cellGapX) + cellGapX, i * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
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
      if (array[nums][0] !== (i + oneSign) && array[nums][1] !== x || (i + oneSign) === 3 || (i + oneSign) === 0) {
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
  else if (x !== i)  {
    grid[y][i] = grid[y][x];
    grid[y][x] = 0;
    image(squares[grid[y][i]], i * (cellSize + cellGapX) + cellGapX, y * (cellSize + cellGapY) + cellGapY, cellSize, cellSize);
  }
}