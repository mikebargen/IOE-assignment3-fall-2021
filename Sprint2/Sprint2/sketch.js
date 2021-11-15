//base code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
// This base code allowed sounds to play when the variable of the kwypoint is moved
// This is a build off of sprint1 including images


let video;

let noseX;
let noseY;

let song1, song2, song3, song4, song5;
let img1, img2, img3, img4;

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

  // image from https://www.flaticon.com/free-icon/up-arrow_1053187?term=up&related_id=1053187 
  img1 = loadImage('assets/up-arrow.png');

  // image from https://www.flaticon.com/free-icon/down-arrow_1053186?related_id=545779&origin=search 
  img2 = loadImage('assets/down-arrow.png');

  // image from https://www.flaticon.com/free-icon/left-arrow_1053188?related_id=545781&origin=search 
  img3 = loadImage('assets/left-arrow.png');

  // image from https://www.flaticon.com/free-icon/right-arrow_1053190?related_id=545682&origin=search 
  img4 = loadImage('assets/right-arrow.png');

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
    //image will appear only when the x value of the nose is more than 200 which is the left side of the screen
    image(img3, 50 ,200, 100, 100);
    // limits the audio to play only once it has finished 
    if(!song4.isPlaying()){
      song4.play()
      
    }
  }

  if(noseX > 400) {
    //image will appear only when the x value of the nose is less than 400 which is the right side of the screen
    image(img4, 400 ,200, 100, 100);
    // limits the audio to play only once it has finished 
    if(!song3.isPlaying()){
      song3.play()
    }
  }

  if(noseY < 200) {
    //image will appear only when the y value of the nose is more than 200 which is the top of the screen
    image(img1, 250 ,50, 100, 100);
    // limits the audio to play only once it has finished 
    if(!song1.isPlaying()){
      song1.play()
    }
  }

  if(noseY > 300) {
    //image will appear only when the y value of the nose is more less than 300 which is the bottom of the screen
    image(img2, 250 ,350, 100, 100);
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