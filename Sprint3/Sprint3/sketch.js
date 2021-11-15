//base code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
// This base code allowed sounds to play when the variable of the keypoint is moved
// This code is a build off of sprint 1&2


let video;

let rightWristX;
let rightWristY;

let img;


function setup() {
  createCanvas(600,500);
  video = createCapture(VIDEO);
  video.size(600,500);
  video.hide();

  // image from https://www.flaticon.com/premium-icon/confused_4259726?term=confused&page=1&position=5&page=1&position=5&related_id=4259726&origin=search 
  img = loadImage('assets/confused.png');

  let poseFinder = ml5.poseNet(video);
  poseFinder.on("pose", gotPose);
}

function draw() {
  background(220);
  image(video, 0, 0, 600, 500);
  //fill(255, 0, 0);
  // ellipse(noseX, noseY, 40);
  
  //code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
  //if the nose goes on the right side of the screen it will play the audio saying right
  if(rightWristY < 250) {
    image(img, 200 ,50, 200, 200);
  }
 }

function gotPose(poses){
  rightWristX = poses[0].pose.rightWrist.x
  rightWristY = poses[0].pose.rightWrist.y
}