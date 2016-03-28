'use strict';

const colors = {
  FLAT_WHITE: '#ECF0F1',
  FLAT_BLACK: '#202020',
  FLAT_LIGHT_GREY: '#808C8D',
  FLAT_DARK_GREY: '#96A5A6',
};

// Horizontal road size
const width = 250;

// Object instance
let dinosaur;

// Game engines
const Engines = {
  jump: {
    state: 40,
    default: 40,
    acceleration: 5,
    reset: () => Engines.jump.state = Engines.jump.default,
  },
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  dinosaur = new Dinosaur({ speed: 3 });
}

function mouseClicked() {
  dinosaur.state = 'jumping';
  return false;
}

function keyPressed() {
  if (keyCode === DOWN_ARROW && dinosaur.state !== 'jumping') dinosaur.state = 'crouched';
  else if (keyCode === UP_ARROW && dinosaur.state !== 'crouched') dinosaur.state = 'jumping';
  // return false;
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && dinosaur.state !== 'jumping') dinosaur.state = "running";
  // return false;
}

function draw() {
  const step = (frame) => Math.floor(frame / 5.0) % 2;

  background(colors.FLAT_WHITE);
  const center = {
    x: windowWidth / 2.0,
    y: windowHeight / 2.0,
  };

  // Draw land line
  push();
  const offset = 60;
  strokeWeight(2);
  stroke(colors.FLAT_LIGHT_GREY);
  line(0, center.y + offset, windowWidth, center.y + offset);
  pop();

  // Draw dinosaur
  push();
  if (dinosaur.state === 'jumping') {
    const y = dinosaur.position.y + Engines.jump.state;
    if (y <= 0) {
      Engines.jump.reset();
      dinosaur.state = 'running';
      dinosaur.position.y = 0;
    } else {
      dinosaur.position.y = y;
      Engines.jump.state -= 5;
    }
  } else {
    Engines.jump.reset();
  }

  // Move along X axis depending on current frame and speed modifier
  // translate((frameCount % (width / dinosaur.speed * 2)) * dinosaur.speed - width, 20);
  translate(center.x - dinosaur.center.x, center.y - dinosaur.center.y - dinosaur.position.y);
  dinosaur.draw(step(frameCount));
  pop();
}

const eyes = {
  standed: [
    [12, 1],
    [12, 2],
    [13, 2],
    [13, 1],
  ],
  crouched: [
    [19, 9],
    [20, 9],
    [20, 10],
    [19, 10],
  ],
};

const body = {
  standed: [
    [0, 7],
    [1, 7],
    [1, 9],
    [2, 9],
    [2, 10],
    [3, 10],
    [3, 11],
    [5, 11],
    [5, 10],
    [6, 10],
    [6, 9],
    [7, 9],
    [7, 8],
    [9, 8],
    [9, 7],
    [10, 7],
    [10, 1],
    [11, 1],
    [11, 0],
    [19, 0],
    [19, 1],
    [20, 1],
    [20, 5],
    [15, 5],
    [15, 6],
    [18, 6],
    [18, 7],
    [14, 7],
    [14, 9],
    [16, 9],
    [16, 11],
    [15, 11],
    [15, 10],
    [14, 10],
    [14, 13],
    [13, 13],
    [13, 14],
    [12, 14],
    [12, 15],
    [11, 15],
    [11, 16],
    [4, 16],
    [4, 15],
    [3, 15],
    [3, 14],
    [2, 14],
    [2, 13],
    [1, 13],
    [1, 12],
    [0, 12],
  ],
  crouched: [
    [0, 8],
    [1, 8],
    [1, 9],
    [3, 9],
    [3, 10],
    [7, 10],
    [7, 9],
    [15, 9],
    [15, 10],
    [17, 10],
    [17, 9],
    [18, 9],
    [18, 8],
    [26, 8],
    [26, 9],
    [27, 9],
    [27, 14],
    [22, 14],
    [22, 15],
    [25, 15],
    [25, 16],
    [18, 16],
    [18, 15],
    [16, 15],
    [16, 16],
    [15, 16],
    [15, 17],
    [16, 17],
    [16, 18],
    [14, 18],
    [14, 16],
    [5, 16],
    [5, 15],
    [4, 15],
    [4, 14],
    [3, 14],
    [3, 13],
    [2, 13],
    [2, 12],
    [1, 12],
    [1, 11],
    [0, 11],
    [0, 10]
  ],
};

const left = {
  steady: [
    [5, 16],
    [5, 20],
    [7, 20],
    [7, 19],
    [6, 19],
    [6, 18],
    [7, 18],
    [7, 17],
    [8, 17],
    [8, 16],
  ],
  running: [
    [5, 16],
    [5, 17],
    [6, 17],
    [6, 18],
    [8, 18],
    [8, 17],
    [7, 17],
    [7, 16],
  ],
};

const right = {
  steady: [
    [9, 16],
    [9, 17],
    [10, 17],
    [10, 20],
    [12, 20],
    [12, 19],
    [11, 19],
    [11, 16],
  ],
  running: [
    [10, 16],
    [10, 17],
    [13, 17],
    [13, 16],
  ],
};

class Dinosaur {
  constructor(options = {}) {
    this.multiplier = options.multiplier || 10;
    this.color = options.color || colors.FLAT_BLACK;
    this.speed = options.speed || 1;
    this.state = "running";

    // Get dinosaur center of gravity
    const xs = body.standed.map(coords => coords[0]);
    const ys = body.standed.map(coords => coords[1]);
    const mean = (array) => (Math.max(...array) - Math.min(...array)) / 2.0;

    this.dimentions = {
      width: Math.max(...xs),
      heigth: Math.max(...ys),
    };

    this.center = {
      x: mean(xs) * this.multiplier,
      y: mean(ys) * this.multiplier,
    };

    this.position = {
      x: 0,
      y: 0,
    };
  }

  drawPoints(color, points = []) {
    beginShape();
    fill(color)
    strokeWeight(0);
    stroke(colors.FLAT_WHITE);
    points.forEach(pair => {
      const x = pair[0] * this.multiplier
      const y = pair[1] * this.multiplier;
      vertex(x, y)
    });
    endShape(CLOSE);
  }

  draw(step) {
    if (this.state === 'crouched') {
      this.drawPoints(this.color, body.crouched);
      this.drawPoints(colors.FLAT_WHITE, eyes.crouched);
    } else {
      this.drawPoints(this.color, body.standed);
      this.drawPoints(colors.FLAT_WHITE, eyes.standed);
    }
    if (this.state === 'running' || this.state === 'crouched') {
      switch (step) {
        case 0:
          this.drawPoints(this.color, left.running);
          this.drawPoints(this.color, right.steady);
          break;
        case 1:
          this.drawPoints(this.color, left.steady);
          this.drawPoints(this.color, right.running);
          break;
        default:
          this.drawPoints(this.color, left.steady);
          this.drawPoints(this.color, right.steady);
          break;
      }
    } else if (this.state === 'jumping') {
      this.drawPoints(this.color, left.steady);
      this.drawPoints(this.color, right.steady);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
