/*
This P5 sketch is a template for getting started with Serial Communication. 
The SerialEvent callback is where incoming data is received 


By Arielle Hein, adapted from ITP Phys Comp Serial Labs
Edited October 25 2018

*/

var serial; //variable to hold an instance of the serial port library
var portName = '/dev/cu.usbmodem1411'; //fill in with YOUR port
var circleHeight = 10;
var circleWidth = 10;
function setup() {
  createCanvas(400, 300);

  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);

  //let's figure out what port we're on - useful for determining your port
  // serial.on('list', printList); //set a callback function for the serialport list event
  // serial.list(); //list the serial ports
}

function draw() {
  background('dodgerblue');
  fill('yellow');
  noStroke();
  ellipse(width/3, height/3, circleHeight, circleWidth);
  
}




//all my callback functions are down here:
//these are useful for giving feedback

function serverConnected(){
console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

//THIS IS WHERE WE RECEIVE DATA!!!!!!
//make sure you're reading data based on how you're sending from arduino
function serialEvent(){
//receive serial data here
  var data = serial.readLine();
  console.log(data);
  let vis = data.split(" , ");
  if (vis.length > 1) {
  	circleWidth = Number(vis[0]);
  	circleHeight = Number(vis[1]);
  	background(circleWidth*2, circleHeight, circleWidth);
  }

}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}