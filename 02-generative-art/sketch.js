// Generative Art

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  lots_of_lines(20, 20);
}

function draw() {
  
}

function lots_of_lines(columns, rows) {
  for (let x = 0; x < columns; x++){
    for (let y = 0; y <rows; y++) {
      let space_amount = width/columns;
      diagonal_line(x * space_amount, y * space_amount, space_amount);
    }
  }
}

function diagonal_line(x, y, spacing) {
  if (random(2) > 1){
    line(x - spacing/2, y + spacing/2, x + spacing/2, y - spacing/2);
  }
  else{
    line(x - spacing/2, y - spacing/2, x + spacing/2, y + spacing/2);
  }
}