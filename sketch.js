const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var array =[1,2,3]
console.log(array);

var array2 =["name",1,true]
console.log(array2);

var array3 =[[1,2],[3,4],[5,6]]
console.log(array3);
console.log(array3[0][1])

var array4 =[[5,6],[7,8],[8,9],[10,11]]
array4.push("My name")
console.log(array4)
array4.pop()
console.log(array3)

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;

var balls =[];
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for(var i=0;i<balls.length;i++){
    showCannonBalls(balls[i])
  }

  cannon.display();

}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall =new CannonBall(cannon.x,cannon.y);
    cannonBall.tragectory =[];
    Matter.Body.setAngle(cannonBall.body,cannon.angle);
    balls.push(cannonBall);
  }
}
function showCannonBalls(ball){
  if(ball){
    ball.display()
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length -1].shoot();
  }
}
