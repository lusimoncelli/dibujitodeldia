// Firebase keys
var apiKey = config.API_KEY
var authDomain = config.AUTH_DOMAIN
var projectId = config.AUTH_DOMAIN
var storageBucket = config.STORAGE_BUCKET
var messagingSenderId = config.MSG_SENDER_ID
var appId = config.APP_ID
var measurementId = config.MEASUREMENT_ID

// Initialize firebase
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();


//******************************************* CANVAS VARS ***************************************

var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
let color = "#000";
let brushthickness = 7;
document.querySelector(".color-btn div").style.backgroundColor = color;

//******************************************* RESIZE CANVAS ***************************************

function resize() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

resize();

//************************************** DOWNLOAD CANVAS ******************************************

function onSave() {
  const link = document.createElement('a');
  link.download = 'sketch.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

// Eraser
const erase = () => (ctx.globalCompositeOperation = "destination-out");

// Brush size dropdown
function sizeList() {
  document.querySelector(".size-list").classList.toggle("show-list");
}

// Set brush size
function brushSize() {
  var brushSet = document.getElementsByClassName("size");
  Array.prototype.forEach.call(brushSet, function (element) {
    element.addEventListener("click", function () {
      brushthickness = element.getAttribute("style").substr(11, 2);
    });
  });
}

// Set color
function setActiveColor() {
  document.querySelector(".color-btn div").style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.globalCompositeOperation = "source-over";
}

function setColor() {
  var palette = document.getElementsByClassName("color");
  Array.prototype.forEach.call(palette, function (element) {
    element.addEventListener("click", function () {
      color = element.getAttribute("style").split("--set-color:")[1];
      setActiveColor();
    });
  });
}

function colorPick() {
  color = document.getElementById("color-picker").value;
  setActiveColor();
}

function resize() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

// initialize position as 0,0
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = parseInt(e.clientX - offsetX);
  pos.y = parseInt(e.clientY - offsetY);
}
// Draw!
function draw(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  ctx.beginPath(); // begin the drawing path
  ctx.lineWidth = brushthickness; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex color of line
  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position
  ctx.closePath();
  ctx.stroke(); // draw
}

//***************************************** EVENT LISTENERS ***************************************

// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listeners to trigger on different mouse events
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
document.addEventListener("touchmove", draw);
document.addEventListener("touchend", setPosition);
document.addEventListener("touchstart", setPosition);
document.getElementById("color-picker").addEventListener("change", colorPick);
setColor();