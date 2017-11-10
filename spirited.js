function preload(){

  sound = loadSound('untitled-spirited-version.mp3');
}

BOX_DIM = 30;

function setup(){

  var cnv = createCanvas(800, 600, WEBGL);

  cnv.mouseClicked(togglePlay);

  sound.amp(0.2);

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();


}

function draw(){

  var level = amplitude.getLevel();
  var waveform = fft.waveform();
  background(200);
  translate(-(width + BOX_DIM)/2, -(height + BOX_DIM)/2, 0);
  for (var i=0; i<7; i++){
    translate(50*(i%2), 0, 0);
    //drawRotatingCube();
    for (var j=0; j<9; j++){
      var x = j + frameCount*0.2;
      translate(100*j, 0, -100*sin(x))
      drawRotatingCube(x);
      translate(-100*j, 0, 100*sin(x));
    }
    translate(-50*(i%2), 100, 0); 
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
  rotate(radians(frameCount), [1,1,-1])
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
