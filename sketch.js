//Create variables here
var dog, happyDog, database, foodS, foodStock,dogImg;
function preload()
{
  
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);   
  dog = createSprite(250,250,10,10);
 dog.addImage(dogImg);
 dog.scale = 0.3;
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

 
}


function draw() {  
background(46,139,87);
textSize(20);
stroke(0);
fill("blue");
 text("Note: Press UP_ARROW Key to Feed Drago Milk",20,30);

 textSize(20);
 stroke(0);
 fill("red");
 text ("Food Remaining : "+ foodS ,150,100);
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

}


function readStock(data){
  foodS=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}