// Declaring Variable
var trex, trexImage;
var ground, groundImage;
var invisibleground;
var clouds, cloudImage;
// Declaring Score
var Score = 0;
// Assigning the values to Play and End states
var obstacles;
var play = 0;
var end = 1;
var gamestate = play;

var trexcollided

var die,jump,checkpoint
// Ai=assign collider to rectangle and 

var gameOver,restart
var gameOverImage,restartImage  

 sessionStorage["HighestScore"]=0

var cloudsGroup;
var obstaclesGroup;
var obstaclesImage1,
  obstaclesImage2,
  obstaclesImage3,
  obstaclesImage4,
  obstaclesImage5,
  obstaclesImage6;
// For loading images and audio we use function Preload
function preload() {
  trexImage = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  gameOverImage= loadImage("gameOver.png")

  cloudImage = loadImage("cloud.png");
  obstaclesImage1 = loadImage("obstacle1.png");
  obstaclesImage2 = loadImage("obstacle2.png");
  obstaclesImage3 = loadImage("obstacle3.png");
  obstaclesImage4 = loadImage("obstacle4.png");
  obstaclesImage5 = loadImage("obstacle5.png");
  obstaclesImage6 = loadImage("obstacle6.png");
  trexcollided=loadImage("trex_collided.png")
  gameOverImage=loadImage("gameOver.png")
 restartImage=loadImage("restart (1).png")

 die=loadSound("die.mp3")
 jump=loadSound("jump.mp3")
 checkpoint=loadSound("checkpoint.mp3")
}
// creating a sprite or objects we use function setup
function setup() {
  createCanvas(500, 200);
  // creating trex
  trex = createSprite(20, 160, 10, 10);
  trex.addAnimation("dinosaur", trexImage);
  trex.addAnimation("collide",trexcollided)
  trex.scale = 0.3;
  
  // creating ground
  ground = createSprite(20, 180, 600, 10);
  ground.addImage("floor", groundImage);
  // Trex should collide properly with Invisible ground
  invisibleground = createSprite(50, 190, 400, 10);
  invisibleground.visible = false;

  // creating group
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
// debug to an object
trex.debug=true
// trex.setCollider("rectangle",0,0,400,trex.height)
trex.setCollider("circle",10,10,55)
gameOver=createSprite(200,100)
gameOver.addImage("gameOver",gameOverImage)
gameOver.scale=0.3
restart=createSprite(200,130)
restart.addImage("restart",restartImage)
restart.scale=0.3

}

// To display objects and giving instruction to objects
function draw() {
  // To avoid duplication
  background("darkblue");
  drawSprites();
  // increasing score based on framecount(Framecount is number of frames generated once we start the program)
  text("Score " + Score, 350, 50);
  text("Highest Socre: "+sessionStorage["HighestScore"],0,50)

  // initialsing the gamestate play condition
  if (gamestate === play) {
    ground.velocityX = -4;
    // use in string concatination
    Score += Math.round(frameCount %10===0);
    if (keyDown("space") && trex.y >= 154) {
      trex.velocityY = -8;
      jump.play()
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //gravity
  
    if(Score>0 && Score%30===0){
      checkpoint.play()
    }


    trex.velocityY = trex.velocityY + 0.5;
    if (obstaclesGroup.isTouching(trex)) {
      gamestate = end;
      trex.changeAnimation("collide",trexcollided)
      die.play()
      // trex.velocityY=-8
    }
    createclouds();
    createobstacles();
    gameOver.visible=false
    restart.visible=false
    // when obstacles are touching trex switch to end state
  } else if (gamestate === end) {
    ground.velocityX = 0;

    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(60)
    gameOver.visible=true
    restart.visible=true

    if(mousePressedOver(restart)){
     startgame()
    }
  }

  trex.collide(invisibleground);
  // console.log(trex.y);
  // calling functions
}
// using framecount method creating a cloud at every 60 frames,by using math.(round()) created clouds at Different y positions
// use a depth concept to display which object should display first in progaram
// to avoid memory leak assign lifetime to an object
function createclouds() {
  if (frameCount % 40 === 0) {
    cloud = createSprite(450, 100, 50, 10);
    cloud.velocityX = -8;
    cloud.addImage("darkness", cloudImage);
    cloud.y = Math.round(random(50, 120));
    cloud.scale = 0.5;

    cloud.depth = trex.depth;
    trex.depth += 1;
    console.log("trex depth is", +trex.depth);
    console.log("cloud depth is", +cloud.depth);

    // lifetime=distance/time
    //  cloudlifetime=450/8
    cloud.lifetime = 56;

    // adding clouds to cloudsGroup
    cloudsGroup.add(cloud);
  }
}
// by using switch statement created multiple obstacles images in a program
function createobstacles() {
  if (frameCount % 40 === 0) {
    obstacles = createSprite(350, 182, 10, 100);
    obstacles.velocityX = -(6+Score/1000)
    obstacles.lifetime = 70;
    obstacles.scale = 0.4;
    var number = Math.round(random(1, 6));
    switch (number) {
      case 1:
        obstacles.addImage(obstaclesImage1);
        break;
      case 2:
        obstacles.addImage(obstaclesImage2);
        break;
      case 3:
        obstacles.addImage(obstaclesImage3);
        break;
      case 4:
        obstacles.addImage(obstaclesImage4);
        break;
      case 5:
        obstacles.addImage(obstaclesImage5);
        break;
      case 6:
        obstacles.addImage(obstaclesImage6);
        break;
      default:
        break;
    }
    obstaclesGroup.add(obstacles);
  }
}
function startgame(){
 gamestate=play
 obstaclesGroup.destroyEach()
 cloudsGroup.destroyEach()
 trex.changeAnimation("dinosaur", trexImage)
 if(sessionStorage["HighestScore"]<Score){
 sessionStorage["HighestScore"]=Score

 }
 sessionStorage
 
 score=0
}