// random sorter

let blocks = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  makeBlock
}

function draw(){

}

function makeBlock() {
  let blockProperties = {
    width: 1,
    height: random(windowHeight),
    size: random(5, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
  blocks.push(blockProperties);
}