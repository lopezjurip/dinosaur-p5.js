'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = {
  FLAT_WHITE: '#ECF0F1',
  FLAT_BLACK: '#202020'
};

// Horizontal road size
var road = 250;

// Object instance
var dinosaur = void 0;

function setup() {
  createCanvas(road, 250);
  dinosaur = new Dinosaur({ speed: 3 });
}

function draw() {
  var step = function step(frame) {
    return Math.floor(frame / 5.0) % 2;
  };

  background(colors.FLAT_WHITE);

  push();
  // Move along X axis depending on current frame and speed modifier
  translate(frameCount % (road / dinosaur.speed * 2) * dinosaur.speed - road, 20);
  dinosaur.draw(step(frameCount));
  pop();
}

var eyes = [[12, 1], [12, 2], [13, 2], [13, 1]];

var body = [[0, 7], [1, 7], [1, 9], [2, 9], [2, 10], [3, 10], [3, 11], [5, 11], [5, 10], [6, 10], [6, 9], [7, 9], [7, 8], [9, 8], [9, 7], [10, 7], [10, 1], [11, 1], [11, 0], [19, 0], [19, 1], [20, 1], [20, 5], [15, 5], [15, 6], [18, 6], [18, 7], [14, 7], [14, 9], [16, 9], [16, 11], [15, 11], [15, 10], [14, 10], [14, 13], [13, 13], [13, 14], [12, 14], [12, 15], [11, 15], [11, 16], [4, 16], [4, 15], [3, 15], [3, 14], [2, 14], [2, 13], [1, 13], [1, 12], [0, 12]];

var steady = {
  left: [[5, 16], [5, 20], [7, 20], [7, 19], [6, 19], [6, 18], [7, 18], [7, 17], [8, 17], [8, 16]],
  right: [[9, 16], [9, 17], [10, 17], [10, 20], [12, 20], [12, 19], [11, 19], [11, 16]]
};

var running = {
  left: [[5, 16], [5, 17], [6, 17], [6, 18], [8, 18], [8, 17], [7, 17], [7, 16]],
  right: [[10, 16], [10, 17], [13, 17], [13, 16]]
};

var Dinosaur = function () {
  function Dinosaur() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Dinosaur);

    this.multiplier = options.multiplier || 10;
    this.color = options.color || colors.FLAT_BLACK;
    this.speed = options.speed || 1;
  }

  _createClass(Dinosaur, [{
    key: 'drawPoints',
    value: function drawPoints(color) {
      var _this = this;

      var points = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      beginShape();
      fill(color);
      noStroke();
      points.forEach(function (pair) {
        var x = pair[0] * _this.multiplier;
        var y = pair[1] * _this.multiplier;
        vertex(x, y);
      });
      endShape(CLOSE);
    }
  }, {
    key: 'draw',
    value: function draw(step) {
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
  }]);

  return Dinosaur;
}();
