
let winWidth=800
let winHeight=800

const model_url ='https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch
let mic
 
var pitchStart=false
var modelLoad=false
var freq=0


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES)
  rectMode(CENTER)


  audioContext=getAudioContext()
  mic=new p5.AudioIn()
  mic.start(listening)
}

function listening(){

  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
  pitchStart=true
}


function modelLoaded(){
  modelLoad=true
}


function gotPitch(error, frequency){
  if(!error){
    freq=frequency
  }else{
    console.error(error)
  }
}

var freq
var scope=300
var a =scope
var rgbLimit=100

function draw() {   
  freq=Math.round(freq)
  if(freq>149){
  a=freq-120
  }

    if(modelLoad){
      if(pitchStart){
        pitch.getPitch(gotPitch)
      } 


  

    background(random(a)-rgbLimit,random(a)-rgbLimit,random(a)-rgbLimit,30)
    noFill()

    translate(width/2,height/2)//translate to the center of the canvas
    for(var i=0; i<50;i++){

      push() // Start a new drawing state


      //rotate the rectangle by (frameCunt +i)*100 to get each square different offset multiplied by 100 degrees
      rotate(sin(frameCount + i)*100+(a/10)) 

      var r=map(sin(frameCount),-1,1,50,255)
      var g=map(cos(frameCount/2),-1,1,50,255)
      var b=map(sin(frameCount/4),-1,1,50,255)
      stroke(r,g,b)

      if(a==0){
        a=150
      }
      ellipse(i+a/20,i+a/20,
        100 - i*3-a,
        100 - i*3+a)
        //,200-i)//create a rectangle x,y,w,h,suavizado borde)
    
      pop()// Restore original state
    }

  // Restore original scope
  if(a>scope){
    a--
  }else{
    a++
  }

  }
    
}
