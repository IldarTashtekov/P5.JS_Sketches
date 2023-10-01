var hideInterfaceBol=false
var canvas, but
var gradient='radial-gradient(circle, #86ff98, #67ffb0, #47fdc7, #23fbdc, #00f8ed, #00f2f5, #00ebfb, #00e4ff, #00d7ff, #41c3ff, #b1a3ff, #ff75fe);-webkit-background-clip: text;-webkit-text-fill-color: transparent;'
var gradientBorder='radial-gradient(circle, #86ff98, #67ffb0, #47fdc7, #23fbdc, #00f8ed, #00f2f5, #00ebfb, #00e4ff, #00d7ff, #41c3ff, #b1a3ff, #ff75fe);-webkit-background-clip: border;-webkit-border-fill-color: transparent;'

function setup() {
    canvas= createCanvas(windowWidth, windowHeight,WEBGL);
    //canvas.parent('html')
    canvas.position(0,0)
    canvas.style('z-index','-1')
    //frameCount=25

    but = createButton('Hide Interface');
    but.style('background-image:'+ gradient);
    but.style('border-style: dashed');

    but.position(0, 0);
    but.mousePressed(hideInterface)
  
  }

  function draw() {


       //let locX = mouseX - height / 2;
       //let locY = mouseY - width / 2;
       //ambientLight(300, 300, 300);
       //pointLight(255, 255, 255, locX, locY, 250);

       fill(random(250)+120,random(250)+120,random(250)+200)
       noStroke()

       for(var i=0; i<50;i++){ 
       translate(mouseX-width/2, mouseY-height/2,-100);
        rotateZ(frameCount * 0.01);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        torus(80*i/15, 60*i/15);
      }
      
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  function mousePressed() {
   clear()
  }


  function hideInterface(){
    hideInterfaceBol=!hideInterfaceBol


    if(hideInterfaceBol){
      document.getElementById('content').style.visibility='hidden'

    }else{
      document.getElementById('content').style.visibility='visible'
      
    }

  }
