'use strict';

const colors = {
  FLAT_WHITE: '#ECF0F1',
  FLAT_BLACK: '#202020',
};

// Horizontal road size
const width = 250;

// Object instance
let dinosaur;
let population;

function setup() {
  createCanvas(width, 250);
  dinosaur = new Dinosaur({ speed: 3 });
}

function draw() {
  const step = (frame) => Math.floor(frame / 5.0) % 2;

  background(colors.FLAT_WHITE);

  push();
  // Move along X axis depending on current frame and speed modifier
  translate((frameCount % (width / dinosaur.speed * 2)) * dinosaur.speed - width, 20);
  dinosaur.draw(step(frameCount));
  pop();
}

const eyes = [
  [12, 1],
  [12, 2],
  [13, 2],
  [13, 1],
];

const body = [
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
];

const steady = {
  left: [
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
  right: [
    [9, 16],
    [9, 17],
    [10, 17],
    [10, 20],
    [12, 20],
    [12, 19],
    [11, 19],
    [11, 16],
  ],
};

const running = {
  left: [
    [5, 16],
    [5, 17],
    [6, 17],
    [6, 18],
    [8, 18],
    [8, 17],
    [7, 17],
    [7, 16],
  ],
  right: [
    [10, 16],
    [10, 17],
    [13, 17],
    [13, 16],
  ],
}

class Dinosaur {
  constructor(options = {}) {
    this.multiplier = options.multiplier || 10;
    this.color = options.color || colors.FLAT_BLACK;
    this.speed = options.speed || 1;
  }

  drawPoints(color, points = []) {
    beginShape();
    fill(color)
    noStroke();
    points.forEach(pair => {
      const x = pair[0] * this.multiplier
      const y = pair[1] * this.multiplier;
      vertex(x, y)
    });
    endShape(CLOSE);
  }

  draw(step) {
    this.drawPoints(this.color, body);
    this.drawPoints(colors.FLAT_WHITE, eyes);

    switch (step) {
      case 0:
        this.drawPoints(this.color, running.left);
        this.drawPoints(this.color, steady.right);
        break;
      case 1:
        this.drawPoints(this.color, steady.left);
        this.drawPoints(this.color, running.right);
        break;
      default:
        this.drawPoints(this.color, steady.left);
        this.drawPoints(this.color, steady.right);
        break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
