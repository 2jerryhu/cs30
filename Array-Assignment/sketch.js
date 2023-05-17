



class PianoKey {
  constructor(type, pos, pitch) {
    // the type of key will be either black or white, and the position will be set later
    this.type = type;
    this.pos = pos;
    if (type === "black") {
      this.width = blackWidth;
      this.height = 220;
      this.color = "black";
      // this uses a later called array to figure out the pitch index
      this.pitch = blackNotes[pitch % 5];
      this.octave = Math.floor(pitch / 5) + 4;
    } 
    else {
      this.width = whiteWidth;
      this.height = 340;
      this.color = "white";
      this.pitch = whiteNotes[pitch % 7];
      this.octave = Math.floor(pitch / 7) + 4;
    }
  }

  display() {
    // push();
    fill(this.color);
    rect(this.pos, 100, this.width, this.height);
    // pop();
  }

  update() {
    // if the mouse is pressed within the key dimensions, then play the pitch
    if (mouseX > this.pos && mouseX < this.pos + this.width && mouseY > 100 && mouseY < 100 + this.height && mouseIsPressed) {
      console.log(this.pitch, this.type, this.octave);

      // this passes in the note that will be played when the playSound function is executed below. Ex. Pitch is C, and in the 4th octave
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
let blackNotes = ["C#", "D#", "F#", "G#", "A#"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 7 * octaves; i++) {
    keys.push(new PianoKey("white", i * whiteWidth, i));
  }
  keys.push(new PianoKey("white", 7 * whiteWidth * octaves, 7 * octaves));

  let offset = 0;

  for (let i = 0; i < 5 * octaves; i++) {
    keys.push(new PianoKey("black", i * whiteWidth + whiteWidth - blackWidth / 2 + offset, i));
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
    else {
      key.update();
    }
  }
}

// This function passes in a note to be played
function playSound(note) {
  // initializes audio system
  userStartAudio();
  // plays the "note," with a duration length of "1," with the lowest volume of "0," and to start the note immediately (0)
  monoSynth.play(note, 1, 0, 0);
}