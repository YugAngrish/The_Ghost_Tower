var ghost , ghostJump , ghostStand , spookySound;
var backGround , backgroundImage;
var climberImage , doorImage;
var stand
var standsGroup , climbersGroup , doorsGroup;
var gameState = 1
var PLAY = 1
var END = 0
var jump = "Press 'SPACE' to jump"
var score = 0
function preload(){
  backgroundImage = loadImage("tower.png");
  ghostJump = loadImage("ghost-jumping.png")
  ghostStand = loadImage("ghost-standing.png")
  climberImage = loadImage("climber.png")
  doorImage = loadImage("door.png")
 spookySound = loadSound("spooky.wav")
}
function setup(){
  createCanvas(windowWidth,windowHeight);  
  
  backGround = createSprite(width - width/2,height-height/2,3,3)
backGround.addImage(backgroundImage)
  backGround.scale = 0.8
  backGround.velocityY = -1
  
 ghost = createSprite(width/2,height -400,3,3);
  ghost.addImage(ghostStand);
  ghost.scale = 0.3
  ghost.velocityY = 10
  ghost.setCollider("rectangle",0,15,200,250)
 // ghost.debug = true
  
  standsGroup = new Group()
  doorsGroup = new Group()
  climbersGroup = new Group()
  
  edges = createEdgeSprites()
  
}
function draw(){
 background("tower.png")
  
  if(gameState===PLAY){
    
  ghost.velocityX = 0;
  spookySound.play()
  if(backGround.y<100){
    backGround.y = backGround.width/2
  }
  if(keyWentDown("space")){
    ghost.velocityY = -10
    ghost.changeImage(ghostJump , "ghost-jumping.png");
    
  }
  if(keyWentUp("space")){
  ghost.velocityY = 10
 ghost.changeImage(ghostStand , "ghost-standing.png");
    
  }
  if(keyDown("LEFT_ARROW")){
    ghost.velocityX = -5
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.velocityX = 5
  }
 if(ghost.isTouching(standsGroup)){
   ghost.collide(standsGroup)
   score = score + 1
 }
    if(ghost.isTouching(climbersGroup)||ghost.y=== height){
     gameState = END 
  }
}
  else if(gameState===END){
    
  climbersGroup.setLifetimeEach(-1)
  standsGroup.setLifetimeEach(-1)
  doorsGroup.setLifetimeEach(-1)
    
  doorsGroup.setVelocityYEach(0)
  climbersGroup.setVelocityYEach(0)  
  standsGroup.setVelocityYEach(0) 
   ghost.velocityY = 0
   ghost.velocityX = 0 
    backGround.velocityY = 0
     frameCount = 200
  }
  doorstand()
  drawSprites()
  
    fill(0)
    stroke("white")
    strokeWeight(3)
    textSize(20)
    text(jump ,0,height-20)
  
     fill(0)
    stroke("white")
    strokeWeight(3)
    textSize(20)
    text("Score = "+score ,width-200,20)
}
function doorstand(){
  if(frameCount%230===0){
    var climber
    climber = createSprite(random(width - width/2-100,width-width/2+200),0,3,3)
    climber.velocityY = 1 
  climber.addImage(climberImage)
    climber.setCollider("rectangle",0,5,100,10)
   // climber.debug = true
    climber.depth = ghost.depth + 1
    ghost.depth = ghost.depth + 1
     climbersGroup.add(climber)
    climber.lifetime = 1000
    
    var door
    door = createSprite(random(width - width/2-100,width - width/2+200),0,3,3)
   door.velocityY = 1 
  door.addImage(doorImage)
    door.scale = 1.1
    door.x = climber.x
  door.y = climber.y - 77
    doorsGroup.add(door)
     door.depth = ghost.depth + 1
    ghost.depth = ghost.depth + 1
    door.lifetime = 1000
    
    var stand
    stand = createSprite(random(width - width/2-100,width - width/2+200),0,100,10)
    stand.velocityY = 1
    stand.y = climber.y -  10
    stand.x = climber.x
    stand.setCollider("rectangle",0,0,100,10)
    stand.visible = false
     standsGroup.add(stand)
     stand.depth = ghost.depth + 1
    ghost.depth = ghost.depth + 1
    stand.lifetime = 1000
    
   
   
  }
}
