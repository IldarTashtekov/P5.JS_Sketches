
let frameCounter=0

let winWidth=900
let winHeig=900
var canvas

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;


function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style('z-index','-1')
  background(random(20),10+random(40),250);

  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

var angleMod
function draw() {

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      angleMod=0
      if(x%5==0) angleMod=x
      var index = x + y * cols;
      var angle = sin(noise(xoff, yoff, zoff) * TWO_PI * 4)-angleMod;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
   
    }
    yoff += inc;

    zoff += 0.0003;
  }
 
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }


  /*
  if(frameCounter%5==0){
    colorTextChange()
  }
  */
 // frameCounter++
/*
  if(frameCounter>300){
    frameCounter=0
  }

*/
  if (mouseIsPressed === true) {    
      var size=20
      stroke(0);
      square(mouseX-size/2,mouseY-size/2,size)
  }
    
  
}



var colorsArray=['white','DeepSkyBlue','cyan','DeepSkyBlue','yellow']
function colorTextChange(){
  var doc=document.getElementsByClassName("links")
  for(let i=0;i<doc.length;i++){
    doc[i].style.color=colorsArray[Math.floor(Math.random() * colorsArray.length) ].toLowerCase()
    //doc[i].style.fontSize=Math.floor(30+Math.random() * 10) +'px'
  }
  
}

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.h = 0;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl );
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.show = function() {
    stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  };
}



