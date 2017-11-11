function preload(){

  sound = loadSound('untitled-spirited-version.mp3');
}

var BOX_DIM = 30;
var GRID_DENSITY = 3;
var INTERVAL = BOX_DIM * GRID_DENSITY;
var Z_SPEED = 100;
var nCols, nRows;
function setup(){

  var cnv = createCanvas(800, 600, WEBGL);
  nCols = Math.ceil(width / (GRID_DENSITY * BOX_DIM)) + 1;
  nRows = Math.ceil(height / (GRID_DENSITY * BOX_DIM)) + 1;

  cnv.mouseClicked(togglePlay);

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

}

function draw(){

  var level = amplitude.getLevel();
  var waveform = fft.waveform();
  background(200);
  translate(-width / 2, -height / 2 + INTERVAL / 4, 0);
  for (var i = 0; i < nRows; i++){
    var startLoc = INTERVAL / 2 * (i % 2);
    translate(startLoc, 0, 0);
    for (var j = 0; j < nCols; j++){
      //var x = Math.abs(nCols / 2 - j ) + Math.abs(nRows / 2 - i) + frameCount*0.2;
      var x = j + i + frameCount * 0.2;
      translate(INTERVAL * j, 0, -Z_SPEED * sin(x));
      drawRotatingCube(x);
      translate(-INTERVAL * j, 0, Z_SPEED * sin(x));
    }
    translate(-startLoc, INTERVAL, 0); 
  }

}

function drawRotatingCube(x){
  push();
  var red = map(sin(x), 1, -1, 255, 0);
  var green = map(sin(x), 1, -1, 0, 200);
  var blue = 128;
  var alpha = map(sin(x), 1, -1, 50, 100);
  stroke(0, 0, 0, alpha);
  fill(red, green, blue, alpha)
  rotateX(radians(45));
  rotateY(radians(45));
  rotate(radians(frameCount), [1, 1, -1])
  box(BOX_DIM, BOX_DIM, BOX_DIM);
  pop();
}

function togglePlay(){
  if (sound.isPlaying()){
    sound.pause();
  } else {
    sound.loop();
  }
}
