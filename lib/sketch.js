'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var colors = {
  FLAT_WHITE: '#ECF0F1',
  FLAT_BLACK: '#202020',
  FLAT_LIGHT_GREY: '#808C8D',
  FLAT_DARK_GREY: '#96A5A6'
};

var MOVEMENTS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
};

// Horizontal road size
var width = 250;

// Object instance
var dinosaurs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  dinosaurs.push(new Dinosaur({ speed: 5, position: { x: -140 } }), new Dinosaur({ speed: 5, position: { x: 140 }, color: colors.FLAT_DARK_GREY, facing: 'left' }));
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) dinosaurs[0].press(MOVEMENTS.DOWN);else if (keyCode === UP_ARROW) dinosaurs[0].press(MOVEMENTS.UP);else if (keyCode === LEFT_ARROW) dinosaurs[0].press(MOVEMENTS.LEFT);else if (keyCode === RIGHT_ARROW) dinosaurs[0].press(MOVEMENTS.RIGHT);
  // return false;
}

function keyTyped() {
  var K = key.toUpperCase();
  if (K === 'S') dinosaurs[1].press(MOVEMENTS.DOWN);else if (K === 'W') dinosaurs[1].press(MOVEMENTS.UP);else if (K === 'A') dinosaurs[1].press(MOVEMENTS.LEFT);else if (K === 'D') dinosaurs[1].press(MOVEMENTS.RIGHT);
  // return false;
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) dinosaurs[0].release(MOVEMENTS.DOWN);else if (keyCode === UP_ARROW) dinosaurs[0].release(MOVEMENTS.UP);else if (keyCode === LEFT_ARROW) dinosaurs[0].release(MOVEMENTS.LEFT);else if (keyCode === RIGHT_ARROW) dinosaurs[0].release(MOVEMENTS.RIGHT);

  var K = key.toUpperCase();
  if (K === 'S') dinosaurs[1].release(MOVEMENTS.DOWN);else if (K === 'W') dinosaurs[1].release(MOVEMENTS.UP);else if (K === 'A') dinosaurs[1].release(MOVEMENTS.LEFT);else if (K === 'D') dinosaurs[1].release(MOVEMENTS.RIGHT);
  // return false;
}

function draw() {
  var step = function step(frame) {
    return Math.floor(frame / 5.0) % 2;
  };

  background(colors.FLAT_WHITE);
  var center = {
    x: windowWidth / 2.0,
    y: windowHeight / 2.0
  };

  // Draw land line
  push();
  var offset = 60;
  strokeWeight(2);
  stroke(colors.FLAT_LIGHT_GREY);
  line(0, center.y + offset, windowWidth, center.y + offset);
  pop();

  // Draw dinosaur
  dinosaurs.forEach(function (dinosaur) {
    push();
    // Move along X axis depending on current frame and speed modifier
    // translate((frameCount % (width / dinosaur.speed * 2)) * dinosaur.speed - width, 20);
    translate(center.x - dinosaur.center.x + dinosaur.position.x, center.y - dinosaur.center.y - dinosaur.position.y);
    dinosaur.draw(step(frameCount));
    pop();
  });
}

var eyes = {
  standed: [[12, 1], [12, 2], [13, 2], [13, 1]],
  crouched: [[19, 9], [20, 9], [20, 10], [19, 10]]
};

var body = {
  standed: [[0, 7], [1, 7], [1, 9], [2, 9], [2, 10], [3, 10], [3, 11], [5, 11], [5, 10], [6, 10], [6, 9], [7, 9], [7, 8], [9, 8], [9, 7], [10, 7], [10, 1], [11, 1], [11, 0], [19, 0], [19, 1], [20, 1], [20, 5], [15, 5], [15, 6], [18, 6], [18, 7], [14, 7], [14, 9], [16, 9], [16, 11], [15, 11], [15, 10], [14, 10], [14, 13], [13, 13], [13, 14], [12, 14], [12, 15], [11, 15], [11, 16], [4, 16], [4, 15], [3, 15], [3, 14], [2, 14], [2, 13], [1, 13], [1, 12], [0, 12]],
  crouched: [[0, 8], [1, 8], [1, 9], [3, 9], [3, 10], [7, 10], [7, 9], [15, 9], [15, 10], [17, 10], [17, 9], [18, 9], [18, 8], [26, 8], [26, 9], [27, 9], [27, 14], [22, 14], [22, 15], [25, 15], [25, 16], [18, 16], [18, 15], [16, 15], [16, 16], [15, 16], [15, 17], [16, 17], [16, 18], [14, 18], [14, 16], [5, 16], [5, 15], [4, 15], [4, 14], [3, 14], [3, 13], [2, 13], [2, 12], [1, 12], [1, 11], [0, 11], [0, 10]]
};

var left = {
  steady: [[5, 16], [5, 20], [7, 20], [7, 19], [6, 19], [6, 18], [7, 18], [7, 17], [8, 17], [8, 16]],
  running: [[5, 16], [5, 17], [6, 17], [6, 18], [8, 18], [8, 17], [7, 17], [7, 16]]
};

var right = {
  steady: [[9, 16], [9, 17], [10, 17], [10, 20], [12, 20], [12, 19], [11, 19], [11, 16]],
  running: [[10, 16], [10, 17], [13, 17], [13, 16]]
};

// Game engines
var Engine = function Engine() {
  this.jump = {
    state: 40,
    default: 40,
    acceleration: 5,
    reset: function reset() {
      this.state = this.default;
    }
  };
};

var Dinosaur = function () {
  function Dinosaur() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Dinosaur);

    this.multiplier = options.multiplier || 10;
    this.color = options.color || colors.FLAT_BLACK;
    this.speed = options.speed || 1;
    this.facing = options.facing || 'right';
    this.position = Object.assign({
      x: 0,
      y: 0
    }, options.position);
    this.engine = new Engine();
    this.state = {
      up: false,
      left: false,
      right: false,
      down: false
    };

    // Get dinosaur center of gravity
    var xs = body.standed.map(function (coords) {
      return coords[0];
    });
    var ys = body.standed.map(function (coords) {
      return coords[1];
    });
    var mean = function mean(array) {
      return (Math.max.apply(Math, _toConsumableArray(array)) - Math.min.apply(Math, _toConsumableArray(array))) / 2.0;
    };

    this.dimentions = {
      width: Math.max.apply(Math, _toConsumableArray(xs)),
      heigth: Math.max.apply(Math, _toConsumableArray(ys))
    };

    this.center = {
      x: mean(xs) * this.multiplier,
      y: mean(ys) * this.multiplier
    };

    var reverse = function reverse(coords) {
      return coords.map(function (pair) {
        return [_this.dimentions.width - pair[0], pair[1]];
      });
    };

    this.body = this.facing === 'right' ? body : {
      standed: reverse(body.standed),
      crouched: reverse(body.crouched)
    };

    this.eyes = this.facing === 'right' ? eyes : {
      standed: reverse(eyes.standed),
      crouched: reverse(eyes.crouched)
    };

    this.left = this.facing === 'right' ? left : {
      steady: reverse(left.steady),
      running: reverse(left.running)
    };

    this.right = this.facing === 'right' ? right : {
      steady: reverse(right.steady),
      running: reverse(right.running)
    };
  }

  _createClass(Dinosaur, [{
    key: 'press',
    value: function press(keyCode) {
      if (keyCode === MOVEMENTS.DOWN) this.state.down = true;else if (keyCode === MOVEMENTS.UP) this.state.up = true;else if (keyCode === MOVEMENTS.LEFT) this.state.left = true;else if (keyCode === MOVEMENTS.RIGHT) this.state.right = true;
    }
  }, {
    key: 'release',
    value: function release(keyCode) {
      if (keyCode === MOVEMENTS.DOWN) this.state.down = false;else if (keyCode === MOVEMENTS.LEFT) this.state.left = false;else if (keyCode === MOVEMENTS.RIGHT) this.state.right = false;
    }
  }, {
    key: 'drawPoints',
    value: function drawPoints(color) {
      var _this2 = this;

      var points = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      beginShape();
      fill(color);
      strokeWeight(0);
      stroke(colors.FLAT_WHITE);
      points.forEach(function (pair) {
        var x = pair[0] * _this2.multiplier;
        var y = pair[1] * _this2.multiplier;
        vertex(x, y);
      });
      endShape(CLOSE);
    }
  }, {
    key: 'run',
    value: function run(step) {
      switch (step) {
        case 0:
          this.drawPoints(this.color, this.left.running);
          this.drawPoints(this.color, this.right.steady);
          break;
        case 1:
          this.drawPoints(this.color, this.left.steady);
          this.drawPoints(this.color, this.right.running);
          break;
        default:
          this.drawPoints(this.color, this.left.steady);
          this.drawPoints(this.color, this.right.steady);
          break;
      }
    }
  }, {
    key: 'draw',
    value: function draw(step) {
      if (this.state.up) {
        var y = this.position.y + this.engine.jump.state;
        if (y <= 0) {
          this.engine.jump.reset();
          this.state.up = false;
          this.position.y = 0;
        } else {
          this.position.y = y;
          this.engine.jump.state -= this.engine.jump.acceleration;
        }
        this.drawPoints(this.color, this.body.standed);
        this.drawPoints(colors.FLAT_WHITE, this.eyes.standed);
        this.run(-1);
      } else if (this.state.down) {
        this.drawPoints(this.color, this.body.crouched);
        this.drawPoints(colors.FLAT_WHITE, this.eyes.crouched);
        this.run(step);
      } else if (this.state.right) {
        this.drawPoints(this.color, this.body.standed);
        this.drawPoints(colors.FLAT_WHITE, this.eyes.standed);
        this.position.x += this.speed;
        this.run(step);
      } else if (this.state.left) {
        this.drawPoints(this.color, this.body.standed);
        this.drawPoints(colors.FLAT_WHITE, this.eyes.standed);
        this.position.x -= this.speed;
        this.run(step);
      } else {
        this.drawPoints(this.color, this.body.standed);
        this.drawPoints(colors.FLAT_WHITE, this.eyes.standed);
        this.run(-1);
      }
    }
  }]);

  return Dinosaur;
}();

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
