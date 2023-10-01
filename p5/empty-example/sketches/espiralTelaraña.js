
let winHeig=800 //y
let winWidth=800 //x
let edgesNum=100
let edgesLength=winWidth/edgesNum
let halfY=winHeig/2


function randomRange(min, max, precision = 4){
  return  Math.random() * (max - min) + min;
}

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


}


let angle=2
var angle2=0
function draw() {

    background(240)

    var dT=deltaTime/1000.0 //delta is in miliseconds /1000=seconds

    background(240)
  
    let nextXNode=0
  
    wave.update(dT)

   for(let i=0; i<edgesNum*4;i++){

      let p1 = wave.getParticlePos(nextXNode)//x1  
                              
      //let p2 = wave.getParticlePos(nextXNode+edgesLength) //x2



        //print(" x ",400-winWidth/2)
        //print(" y ",387-winHeig/2)

        fill(0,140,200)

        //(400-winWidth/2), 0 
       // (387-winHeig/2), -14    z -30   

      rotateZ(angle)
    //  rotateX(angle2)
      //rotateY(angle2)

         translate(0.5,
                  400,
                  -30) 
        box(winWidth+(i*winWidth),4*p1.y,30);
        //winWidth+(i*winWidth)

        nextXNode=nextXNode+edgesLength //next x pos + edgeLength

       
  }
    

  //angle2+=0.01

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