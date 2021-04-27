const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;
 
var divisions = [];
var particles = [];
var plinkos = [];
var score = 0, particle, turn = 0,gameState = "start";

var divisionHeight=300;

function setup() {
  createCanvas(800, 700);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : " + score,20,30);
  text("500",25,420);
  text("500",105,420);
  text("500",185,420);
  text("500",265,420);
  text("100",345,420);
  text("100",425,420);
  text("100",505,420);
  text("200",585,420);
  text("200",665,420); 
  text("200",745,420);

  Engine.update(engine);
   
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

  if(particle!=null)
  {
    particle.display();

    if(particle.body.position.y>660)
    {
      turn += 1
      if(particle.body.position.x < 300)
      {
        score = score + 500;
        particle = null; 
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
      
      if(particle.body.position.x > 301 && particle.body.position.x < 600)
      {
        score = score + 100;
        particle = null; 
        if(turn >= 5)
        {
          gameState = "end";
        }
      }

      if(particle.body.position.x > 601 && particle.body.position.x < 900)
      {
        score = score + 200;
        particle = null; 
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
    }
    if(turn>= 5 && gameState === "end"){
      textSize(90);
      text("GAME OVER", 200, 200)
    }
  } 

}

function mousePressed(){
  if(gameState!=="end"){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}