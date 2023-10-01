function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0)
    canvas.style('z-index','-1')
    frameRate(19)
  
}


let y=-100

//pulse data when mouse is pressed
let pulseX ,pulseY
let pulseSz=1, pulseCounter=6

function draw(){

    background(0,10)
 

    //sinus wave
    noStroke()
    fill(
        random(100),
        100+random(130),
        100+random(150),
        200)
        
    for(let i=-10; i<100; i++){
        ellipse(
             y*10-sin(i+y)*5-i*5
            ,i*10+sin(y)*10+y
            ,y)

    }
    

    y++

    if(y>200){
        y=0
    }


    //mouse pulse
    if(mouseIsPressed){
   // ellipse(mouseX,mouseY,10)
    pulseCounter=0
    pulseSz=0
    pulseX=mouseX
    pulseY=mouseY
    }

    if(pulseCounter<10){
        pulseSz++
        pulseCounter++
        pulseSz+=pulseSz

        stroke(250,250,0)
        noFill()
        circle(pulseX,pulseY,pulseSz)

    }


}