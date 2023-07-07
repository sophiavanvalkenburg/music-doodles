var CANVAS_HEIGHT = 600; //window.innerHeight;
var CANVAS_WIDTH = 600; //window.innerWidth;
var NUM_BINS = 256;
var inradius;
var sideLength;

function preload(){

    sound = loadSound('Funk.mp3');
}
  
  
function setup(){
  
    var cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    cnv.mouseClicked(togglePlay);
  
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();
    
    inradius = 0.5 * CANVAS_HEIGHT;
    sideLength = 2 * inradius  * tan( PI / NUM_BINS );
}

var shouldSave = true;
var drawCount = 0;
  
function draw(){
    var spectrum = fft.analyze(NUM_BINS);
    background(0, 0, 127);
    //stroke(0);
    //strokeWeight(1);
    var minColor = [255, 0, 0];
    var maxColor = [0, 0, 255];
    noStroke();
    for (var col = 0; col < NUM_BINS / 2 + 1; col++){
        //var red = map(spectrum[col], 0, 255, 178, 255); 
        //var green = map(spectrum[col], 0, 255, 233, 178); 
        //var blue = map(spectrum[col], 0, 255, 255, 233); 
        //fill(red, green, blue);
        if (!spectrum[col]) continue;
        var green = map(spectrum[col], 0, 255, 0, 64);
        fill(0, green, spectrum[col], 255); 
        if (spectrum[col] < 0.6 * 255) {
            var alpha = map(spectrum[col], 0, 0.6 * 255, 25, 255);
            var red = map(spectrum[col], 0, 0.6 * 255, 128, 255);
            var blue = map(spectrum[col], 0, 0.6 * 255, 255, 128);
            red = map(spectrum[col], 0, 255, 0, red);
            green = map(spectrum[col], 0, 255, green, 0);
            blue = map(spectrum[col], 0, 255, spectrum[col], blue);
            fill(red, green, blue, alpha);
        } else if (spectrum[col] > 0.8 * 255) {
            var alpha = map(spectrum[col], 0.8 * 255, 255, 25, 255);
            fill(178, 233, 222, alpha);
        }
        push();
        translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        push();
        rotate( 2 * PI * col / NUM_BINS);
        drawTriangle();
        pop();
        rotate( 2 * PI * (NUM_BINS - col) / NUM_BINS);
        if (col !== NUM_BINS / 2) drawTriangle();
        pop();
    }

  drawCount++;
  if (shouldSave) save(`funk${drawCount}.png`);

}

function drawTriangle() {
    triangle(0, 0, -0.5 * sideLength - 1, inradius, 0.5 * sideLength + 1, inradius);
}

function togglePlay(){
    if (sound.isPlaying()){
        sound.pause();
    } else {
        sound.loop();
    }
}
