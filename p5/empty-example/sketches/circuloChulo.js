let squareSize = 400
let squareCircleRadius = squareSize/2
let numberOfCircles = 100

function setup() {
 const canvas =createCanvas(squareSize, squareSize);


}

function draw() {
  
  background(220);
  
  
  for(let i=0; i<numberOfCircles;i++){
  ellipse(squareCircleRadius+i,squareCircleRadius+i,squareSize/i)
  fill(random(170),random(170),random(170))
  
  }   

}
