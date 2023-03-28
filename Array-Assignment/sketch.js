// random sorter

let pianoKey = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){

}

function makeKey() {
  let keyProperties = {
    x: random([0, 1]),
    y: random([0, 1]),
    size: random(5, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
  pianoKey.push(keyProperties);
}