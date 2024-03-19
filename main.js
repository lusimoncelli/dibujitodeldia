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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fabric.js canvas setup
const canvas = new fabric.Canvas('canvas');

// Function to change drawing color
function changeColor() {
    let color = document.getElementById('colorPicker').value;
    canvas.freeDrawingBrush.color = color;
}

// Function to set pencil drawing mode
function setPencil() {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    changeColor();
}

// Function to set eraser mode
function setEraser() {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = '#FFFFFF'; // Set color to white for eraser
}

// Function to set bucket fill mode
function setBucket() {
    let color = document.getElementById('colorPicker').value;
    canvas.setBackgroundColor(color);
    canvas.renderAll();
}

// Implement submitDrawing() function
function submitDrawing() {
    // Get drawing data
    const drawingData = canvas.toDataURL();
    const username = document.getElementById('username').value;
  
    // Store drawing data in Firestore
    db.collection('drawings').add({
      drawing: drawingData,
      username: username
    })
    .then(() => {
      console.log('Drawing submitted successfully.');
      // Add success message or redirect to another page
    })
    .catch((error) => {
      console.error('Error submitting drawing: ', error);
      // Handle error
    });
  }