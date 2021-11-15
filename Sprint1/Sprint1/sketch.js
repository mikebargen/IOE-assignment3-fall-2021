//base code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
// This base code allowed sounds to play when the variable of the kwypoint is moved


let video;

let noseX;
let noseY;

let song1, song2, song3, song4, song5;

function preload(){
  song1 = loadSound('assets/UP.mp3');
  song2 = loadSound('assets/DOWN.mp3');
  song3 = loadSound('assets/LEFT.mp3');
  song4 = loadSound('assets/RIGHT.mp3');
}

function setup() {
  createCanvas(600,500);
  video = createCapture(VIDEO);
  video.size(600,500);
  video.hide();

  let poseFinder = ml5.poseNet(video);
  poseFinder.on("pose", gotPose);
}

function draw() {
  background(220);
  image(video, 0 ,0, 600, 500);
  //fill(255, 0, 0);
  // ellipse(noseX, noseY, 40);
  
  //code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
  //if the nose goes on the right side of the screen it will play the audio saying right
  if(noseX < 200) {
    // limits the audio to play only once it has finished 
    if(!song4.isPlaying()){
      song4.play()
    }
  }

  if(noseX > 400) {
    // limits the audio to play only once it has finished 
    if(!song3.isPlaying()){
      song3.play()
    }
  }

  if(noseY < 200) {
    // limits the audio to play only once it has finished 
    if(!song1.isPlaying()){
      song1.play()
    }
  }

  if(noseY > 300) {
    // limits the audio to play only once it has finished 
    if(!song2.isPlaying()){
      song2.play()
    }
  }
 }

function gotPose(poses){
  noseX = poses[0].pose.nose.x
  noseY = poses[0].pose.nose.y
}