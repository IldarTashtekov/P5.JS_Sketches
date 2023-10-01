
let winHeig=800 //y
let winWidth=800 //x
let edgesNum=100
let edgesLength=winWidth/edgesNum
let halfY=winHeig/2


function randomRange(min, max, precision = 4){
  return  Math.random() * (max - min) + min;
}

var cubos = [];

var wave
function setup() {
  createCanvas(winWidth,winHeig,WEBGL)//width, height
  background(240)

  
  wave = new Wave(
    0.00577,      //l 
    Math.PI*2,   //t 
    16.33,      //a 
    0.38,      //k
    0.06,     //oscLmax, 
    0.04,    //oscLmin 
    0.0012, //oscLspeed,
    16,    //oscAmax, 
    -3,   //oscAmin
    16,  //oscAspeed
    0.4 //speedTimeIncrem
    )

    for(let i=0; i<20;i++){
        for(let k=0; k<20;k++){

       //let p1 = wave.getParticlePos(nextXNode)//x1  
                                
        //let p2 = wave.getParticlePos(nextXNode+edgesLength) //x2

       // var c1 = new Cubo((-winWidth/2)+i*50, 120, -k*50,2*p1.y);
        var c1 = new Cubo((-winWidth/2)+i*50, 120, -k*50,2);

        c1.initialPos = {x:c1.x, y:c1.y, z:c1.z}
        
        cubos.push(c1)
            //print(" x ",400-winWidth/2)
            //print(" y ",387-winHeig/2)


            //(400-winWidth/2), 0 
        // (387-winHeig/2), -14    z -30   

            // translate((mouseX-winWidth/2),
            //           (mouseY-winHeig/2),
            //           -30) 
            // box(winWidth+(i*winWidth),4*p1.y,30);


            //nextXNode=nextXNode+edgesLength //next x pos + edgeLength

        }
   }


}


let angle=0

var drawableObjects = [];
class Drawable {
  constructor(){
    drawableObjects.push(this)
  }
}

class Cubo extends Drawable {

  constructor(x, y, z,waveY,lado = 50){
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.lado = lado;
    this.waveY=waveY
  }

  draw(){

    //return;
    translate(this.x, this.y, this.z)
    box(this.lado, this.lado+this.waveY, this.lado)
    translate(-this.x, -this.y, -this.z)
  }

}

var Camera = {
  x:0,
  y:0,
  z:0,
  movSpeed:100,
  update : function(dt) {
    
    var mov = {x:0, y:0}

    if(InputManager.Keys.APressed){
      mov.x += -1;
    }

    if(InputManager.Keys.DPressed){
      mov.x += 1;
    }

    if(InputManager.Keys.WPressed){
      mov.y += -1;
    }

    if(InputManager.Keys.SPressed){
      mov.y += 1;
    }

    this.x += mov.x * dt * this.movSpeed;
    this.y += mov.y * dt * this.movSpeed;
  }
}

var InputManager = {
  Keys:{
    WPressed : false,
    APressed : false,
    SPressed : false,
    DPressed : false,
  }

}

function keyPressed() {

  InputManager.Keys.APressed = keyCode == 65; 
  InputManager.Keys.WPressed = keyCode == 87; 
  InputManager.Keys.SPressed = keyCode == 83; 
  InputManager.Keys.DPressed = keyCode == 68; 


}

function keyReleased() {

  if(keyCode == 65) InputManager.Keys.APressed = false; 
  if(keyCode == 87) InputManager.Keys.WPressed = false; 
  if(keyCode == 83) InputManager.Keys.SPressed = false; 
  if(keyCode == 68) InputManager.Keys.DPressed = false; 


}


function draw() {


    var dT=deltaTime/1000.0 //delta is in miliseconds /1000=seconds


    background(random(70))

    //var c1 = new Cubo(100, 0);
   // var c2 = new Cubo(100,100);

  
   // let nextXNode=0
  
    wave.update(dT)
    
    for (let i = 0; i < cubos.length; i++) {
        var newpos = wave.getParticlePos(cubos[i].initialPos.x);
        cubos[i].x = newpos.x*random(1.1);
        cubos[i].y = newpos.y*100;
        cubos[i].lado=random(50)
       
        fill(random(255),random(255),random(255))
       
        rotateZ(i)
    
       
        /** 
        if(i != 0){
            // draw line de cubos[i] a cubos[i-1]

        }

        **/
    }

   
    
    Camera.update(dT);
    translate(-Camera.x, -Camera.y, -Camera.z)
    drawableObjects.forEach((obj) =>{
      obj.draw();
    })

    translate(Camera.x, Camera.y, Camera.z)
    
/**
eyeX camera position value on x axis
eyeY camera position value on y axis
eyeZ camera position value on z axis
centerX x coordinate representing center of the sketch
centerY y coordinate representing center of the sketch
centerZ z coordinate representing center of the sketch
upX x component of direction 'up' from camera
upY y component of direction 'up' from camera
upZ z component of direction 'up' from camera
 */
   
       
  }
    






  

class Wave{


  maxTrueLong=false
  maxTrueAmp=false

  constructor(l, t, a, k,oscLmax, oscLmin ,oscLspeed,oscAmax, oscAmin ,oscAspeed,speedTimeIncrem){
    this.l=l
    this.t=t
    this.a=a
    this.k=k
    this.oscLmax=oscLmax
    this.oscLmin=oscLmin
    this.oscLspeed=oscLspeed
    this.oscAmax=oscAmax
    this.oscAmin=oscAmin
    this.oscAspeed=oscAspeed
    this.speedTimeIncrem=speedTimeIncrem
  }

  heigthFunction(x){ return (sin((this.l*x)+this.t)*this.a)}


  getParticlePos(x){
    return { x: this.horizontalFunction(x), y: this.heigthFunction( this.horizontalFunction(x))}
  }
  
  horizontalFunction(x){ return this.k * cos(x+this.t)+x}


  update(dT){ //delta Time
    this.t +=dT*this.speedTimeIncrem   
    this.t=this.t% (Math.PI*2)
    
    //oscilaciones
    if(this.l>=this.oscLmax || this.l <= this.oscLmin){
      this.maxTrueLong = ! this.maxTrueLong;
    }
    
    if(this.a>=this.oscAmax || this.a < this.oscAmin){
      this.maxTrueAmp = ! this.maxTrueAmp;
    }



    if(this.maxTrueLong){
      this.l-=this.oscLspeed*dT

    }else{
      this.l+=this.oscLspeed*dT
    }


    if(this.maxTrueAmp){
      this.a-=this.oscAspeed*dT
    }else{
      this.a+=this.oscAspeed*dT
    }

  }

}




/**
 
line(x1, y1, z1, x2, y2, z2)
Parameters
x1 Number: the x-coordinate of the first point
y1 Number: the y-coordinate of the first point
x2 Number: the x-coordinate of the second point
y2 Number: the y-coordinate of the second point
z1 Number: the z-coordinate of the first point
z2 Number: the z-coordinate of the second point



var l=0.05
var t=Math.PI*2
var a=800/40
var k = 0.7


Wave {maxTrueLong: false, maxTrueAmp: true, l: 0.0057706235304856145, t: 6.281684828358115, a: 16.330931252242433, …}a: 4.731791144120302k: 0.38484315147835046l: 0.005778253040302973maxTrueAmp: truemaxTrueLong: falseoscAmax: 18.45011151285446oscAmin: -3.0213534727299773oscAspeed: 15.814277681286182oscLmax: 0.011728766927240342oscLmin: 0.039793572568650785oscLspeed: 0.0012953327341136247speedTimeIncrem: 0.4392440427208213t: 1.535888810225131__proto__: Object

 */