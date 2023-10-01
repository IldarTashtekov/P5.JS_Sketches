function setup() {
  // put setup code here
  const canvas = createCanvas(100,100)//width, height

  background(200) //color o luz
  frameRate(20)
}

let numeroFigura = 1000
let diaMax= 100

function draw() {
  //CUIDADO si eres epileptico
 // background(random(200),random(200),random(200))
 
  // put drawing code here
  strokeWeight(2)//anchura de linea
  stroke(255,0,0)//color linea
  fill(random(100),random(100),random(100)) //color relleno
 // ellipse(mouseX,mouseY,200,200)

 for(let i=0; i<numeroFigura; i++){
   ellipse(random(width),random(height),random(diaMax),random(diaMax))
 }

}

//canvia el tamaño de canvas cuando cambiamos de tamaño la ventana
function windowResized(){   
  resizeCanvas(windowWidth,windowHeight)
  background(200) //color o luz
}
