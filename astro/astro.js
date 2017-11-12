function preload(){

  sound = loadSound('astro.mp3');
}


function setup(){

  var cnv = createCanvas(800, 600);
  cnv.mouseClicked(togglePlay);

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

}

var drawCount = 0;
var prevLevel = 0;
var level;
function draw(){

  noStroke();
  if (drawCount >= 1){
    prevLevel = level;
  }
  level = amplitude.getLevel();
  var colorLevel = map(level, 0, 1, 200, 240);
  background(colorLevel, colorLevel, 255);
  var ampSize = map(level, 0, 1, 0, 400);
  fill(0);
  ellipse(width/2, height/2, ampSize, ampSize);
  fill(0, 0, 0, 50);
  ellipse(width/2, height/2, ampSize*1.5, ampSize*1.5);
  fill(0, 0, 0, 25);
  ellipse(width/2, height/2, ampSize*2, ampSize*2);
  fill(0, 0, 0, 5);
  ellipse(width/2, height/2, ampSize*2.5, ampSize*2.5);
  fill(200, 200, 255);
  ellipse(width/2, height/2, ampSize*0.8, ampSize*0.8);

  if (level > 0.5){
    fill(0);
    ellipse(random()*width, random()*height, ampSize*0.25, ampSize*0.25);
    var randomSize = ampSize*random();
    ellipse(random()*width, random()*height, 0.25*randomSize, 0.25*randomSize);
    ellipse(random()*width, random()*height, 0.5*randomSize, 0.5*randomSize);
  }

  var waveform = fft.waveform();

  translate(width/2, height/2);
  rotate(frameCount / 200.0);
  noFill();
  beginShape();
  strokeWeight(3);
  stroke(0);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, -width, width);
    var y =  map(waveform[i], -1, 1, 4*Math.pow(level, 2)*-height/2, 4*Math.pow(level, 2)*height/2);
    vertex(x, y);
  }
  
  endShape();
  beginShape();
  strokeWeight(3);
  stroke(0, 0, 0, 25);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, -width, width);
    var y =  map(waveform[i], -1, 1, height/4 + 4*Math.pow(level, 2)*-height/2, height/4 + 4*Math.pow(level, 2)*height/2);
    vertex(x, y);
  }
  
  endShape();

  beginShape();
  strokeWeight(3);
  stroke(0, 0, 0, 25);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, -width, width);
    var y =  map(waveform[i], -1, 1, -height/4 + 2*Math.pow(level, 2)*-height/2, -height/4 + 2*Math.pow(level, 2)*height/2);
    vertex(x, y);
  }
  endShape();

  beginShape();
  strokeWeight(3);
  stroke(0, 0, 0, 10);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, -width, width);
    var y =  map(waveform[i], -1, 1, height/2 + 2*Math.pow(level, 2)*-height/2, height/2 + 2*Math.pow(level, 2)*height/2);
    vertex(x, y);
  }
  
  endShape();

  beginShape();
  strokeWeight(3);
  stroke(0, 0, 0, 10);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, -width, width);
    var y =  map(waveform[i], -1, 1, -height/2 + Math.pow(level, 2)*-height/2, -height/2 + Math.pow(level, 2)*height/2);
    vertex(x, y);
  }
  
  endShape();

  drawCount++;
}

function togglePlay(){
  if (sound.isPlaying()){
    sound.pause();
  } else {
    sound.loop();
  }
}
