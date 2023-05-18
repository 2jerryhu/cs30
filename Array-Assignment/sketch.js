// Piano Array
// Jerry Hu
// May 18th (yikes, sorry)
//
// Extra for Experts:
// - I used the p5.sound library to create the piano. When a key is clicked, a sound is played. I had to add the library in the index.html file

class PianoKey {
  constructor(type, pos, pitch) {
    // the type of key will be either black or white, and the position will be set later
    this.type = type;
    this.pos = pos;
    this.pianoPosition = 200;
    this.isKeyPressed = false;

    if (type === "black") {
      this.width = blackWidth;
      this.height = 220;
      this.color = "black";
      // this figures out the pitch index, the array is called later
      this.pitch = blackNotes[pitch % 5];
      this.octave = Math.floor(pitch / 5) + 3;
    } 
    else {
      this.width = whiteWidth;
      this.height = 340;
      this.color = "white";
      this.pitch = whiteNotes[pitch % 7];
      this.octave = Math.floor(pitch / 7) + 3;
    }
  }

  display() {
    push();
    // if the key is pressed, then display it as blue
    if (this.isKeyPressed && this.type === "black") {
      fill("blue");
    } 
    // to make sure white doesn't show up as blue when black is pressed, ensure that the mouse is within these parameters
    else if (this.isKeyPressed && this.type === "white" && (this.pitch === "D" || this.pitch === "G" || this.pitch === "A") && (mouseY > this.pianoPosition + this.height - 120 || mouseX > this.pos + blackWidth/2) && (mouseY > this.pianoPosition + this.height - 120 || mouseX < this.pos + whiteWidth - blackWidth/2)) {
      fill("blue");
    }
    else if (this.isKeyPressed && this.type === "white" && (this.pitch === "C" || this.pitch === "F") && (mouseY > this.pianoPosition + this.height - 120 || mouseX < this.pos + whiteWidth - blackWidth/2)) {
      fill("blue");
    }
    else if (this.isKeyPressed && this.type === "white" && (this.pitch === "E" || this.pitch === "B") && (mouseY > this.pianoPosition + this.height - 120 || mouseX > this.pos + blackWidth/2)) {
      fill("blue");
    }
    // if the key isn't clicked, then just fill it with its normal color
    else {
      fill(this.color);
    }
    rect(this.pos, this.pianoPosition, this.width, this.height);
    pop();
  }

  update() {
    // if the mouse is pressed within the key dimensions, then play the pitch
    if (mouseX > this.pos && mouseX < this.pos + this.width && mouseY > this.pianoPosition && mouseY < this.pianoPosition + this.height && mouseIsPressed) {
      console.log(this.pitch, this.type, this.octave);
      this.isKeyPressed = true;
      // this passes in the note that will be played when the playSound function is executed below. Ex. Pitch is C, and in the 4th octave (C4)
      playSound(this.pitch.concat(this.octave));
      return true;
    } 
    else {
      this.isKeyPressed = false;
      return false;
    }
  }
}

let keys = [];
let whiteWidth = 70;
let blackWidth = 50;
let octaves = 3;
let monoSynth;
let whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
let blackNotes = ["C#", "D#", "F#", "G#", "A#"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(140);
  // this variable centers the keys in the middle of the screen
  let centerKeys = windowWidth/2 - (octaves * 7 + 1) * whiteWidth / 2;

  // this pushes 2 octaves of white notes
  for (let i = 0; i <= 7 * octaves; i++) {
    keys.push(new PianoKey("white", i * whiteWidth + centerKeys, i));
  }

  // the offset variable makes it possible to display the black notes in the right position
  let offset = 0;

  for (let i = 0; i < 5 * octaves; i++) {
    // the black key is positioned halfway between the white key
    keys.push(new PianoKey("black", i * whiteWidth + whiteWidth - blackWidth / 2 + offset + centerKeys, i));
    // if the key index is 1 or 4, then the code creates a gap between those black notes
    if (i % 5 === 1 || i % 5 === 4) {
      offset += whiteWidth;
    }
  }

  // the p5.sound library was added to the index.html file, the following line calls that library
  monoSynth = new p5.MonoSynth();
}

function draw() {
  updateKeys();
  displayKeys();
}

// display each key in the keys array
function displayKeys() {
  for (let key of keys) {
    key.display();
  }
}

// play the key/note pressed
function updateKeys() {
  for (let key of keys) {
    // if you click on a black key, the key is updated (played). It then breaks the function so the white note underneath the mouse cannot be played
    if (key.type === "black") {
      if (key.update()) {
        break;
      }
    } 
    // if the key is white, then just simply play the key
    else {
      key.update();
    }
  }
}

// This function passes in a note to be played
function playSound(note) {
  // initializes audio system
  userStartAudio();
  
  // There is a weird bug with the sound library where A, A#, and B play a note one octave lower, even though the notation is correct.
  // I have changed this by creating the following code to change the notation to play an octave higher, which will make it sound
  // like it's in the right octave. I honestly have no idea why this happens. 
  let octave;
  let pitch;
  // If the note is A#, then set the pitch to be "A#" and the octave to be its current octave. This will be used to raise the octave later
  if (note[0] === "A" && note[1] === "#"){
    pitch = note[0].concat(note[1]);
    octave = note[2];
  }
  else {
    pitch = note[0];
    octave = note[1];
  }

  // Because the "octave" variable is currently a string, it needs to be converted to a number to raise its "octaveNumber" by one.
  let octaveNumber = parseInt(octave); 
  // If the pitch are equal to these conditions, then add the "octaveNumber" by one, then turn it back into the string. The string will
  // be concatenated with the pitch to play the note.
  if (pitch === 'A' || pitch === 'A#' || pitch === 'B') {
    octaveNumber ++;
    let updatedOctave = octaveNumber.toString(); 
    let updatedNote = pitch.concat(updatedOctave);
    monoSynth.play(updatedNote, 1, 0, 0);
  }
  // If the pitch is normal and not weird like A, A#, and B, then just play the note.
  else{
    // plays the "note," with a duration length of "1," with the lowest volume of "0," and to start the note immediately (0)
    monoSynth.play(note, 1, 0, 0);
  }
}