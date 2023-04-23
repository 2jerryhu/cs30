// tictactoe

class PianoKey {
  constructor(type, pos, pitch) {
    this.type = type;
    this.pos = pos;
    if (type === "black") {
      this.width = blackWidth;
      this.height = 220;
      this.color = "black";
      this.pitch = whiteNotes[4];
      this.octave = floor(pitch/5) + 4;
      this.octave = 1;
    }
    else {
      this.width = whiteWidth;
      this.height = 340;
      this.color = "white";
      this.pitch = whiteNotes[pitch & 7];
      this.octave = floor(pitch/7) + 4;
      if (pitch % 7 >= 5 && pitch % 7 <= 6) {
        this.octave += 1;
      }
    }
  }

  display() {
    push();
    fill(this.color);
    rect(this.pos, 100, this.width, this.height);
    pop();
  }

  update() {
    if (mouseX > this.pos && mouseX < this.pos + this.width && mouseY > 100 && mouseY < 100 + this.height && mouseIsPressed) {
      console.log(this.pitch, this.type, this.octave + 4);
      playSound(this.pitch.concat(this.octave));
      return true;
    }
    else {
      return false; 
    }
  }

}

let keys = [];
let whiteWidth = 70;
let blackWidth = 50;
let octaves = 2;
let monoSynth;
let whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 7 * octaves; i++) {
    keys.push(new PianoKey("white", i * whiteWidth, i));
  }
  keys.push(new PianoKey("white", 7 * whiteWidth * octaves, 7 * octaves));

  let offset = 0;
  
  for (let i = 0; i < 5 * octaves; i++) {
    keys.push(new PianoKey("black", i * whiteWidth + whiteWidth - blackWidth/2 + offset, i));
    if (i % 5 === 1 || i % 5 === 4) {
      offset += whiteWidth;
    }
  }

  monoSynth = new p5.MonoSynth();
}

function draw() {
  updateKeys();
  displayKeys();
}

function displayKeys() {
  for (let key of keys) {
    key.display();
  }
}

function updateKeys() {
  for (let key of keys) {
    if (key.type === "black") {
      if (key.update()) {
        break;
      }
    }
    key.update();
  }
}

function playSound(note) {
  userStartAudio();
  monoSynth.play(note, 1 , 0, 0);
}