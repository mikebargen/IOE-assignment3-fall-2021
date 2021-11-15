/* 
August 2019 - Doug Whitton 
The base code is from the example 'play 3 analog sensors that output sound and circle graphic'
The Arduino file that's running is "threeSensorExample"
*/

let osc;
let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let img; 
let value0 = 0, value1 = 0, value2 = 0; //Changed 'diameter' to 'value' for me to eaisly manipulate

let osc1, osc2, osc3, fft;

let song1, song2;
let slider;




//Had to create a preload function to load the background audio from the start
function preload() {

//   BossaBossa by Kevin MacLeod | https://incompetech.com/
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
 song1 = loadSound('assets/BossaBossa.mp3');
}
 

function setup() {
  
  
  createCanvas(windowWidth, windowHeight);
  
  //have to song play right from the start
  song1.play();




//   64 Sundays by Twin Musicom | http://www.twinmusicom.org/
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons CC BY 4.0
// https://creativecommons.org/licenses/by/4.0/
 song2 = loadSound('assets/Sundays.mp3');

  // Photo by Derrick Treadwell on Unsplash 
  // https://unsplash.com/photos/m01bajOe8E0 
  img = loadImage('assets/elevator.jpg');



///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM3");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

 

 
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


   



// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  value0 = splitter[0];                 //put the first sensor's data into a variable
  value1 = splitter[1];
  value2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
  text(latestData, 10,10); 
  background(img, 1, 1, windowWidth, windowHeight);
  changeSong();
   setVolume();
   textSize(24);
  //  textColor(255,255,255);
   text("Press Button To Change Song", 770, 30);
   text("Use Potentiometer To Change Volume", 725, 65);
   fill(2, 25, 255);

}



//Created a function that allows the sound to be adjusted with the potentiometer for each song
function setVolume() {
    song1.setVolume(value2*0.01);
    song2.setVolume(value2*0.01);
}

//Created an if statement that changes the song playing when the value of value0 is change to 1 by using the button
function changeSong() {
  if (value0 == 1) {
      song1.stop();
    // limits the audio to play only once
     if(!song2.isPlaying()){
      song2.play();
    }
  }
}






  


  

 