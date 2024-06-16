var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var pos = { x: 0, y: 0 }; // initialize position as 0,0

let color = "#000";
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;
let brushthickness = 7;
let points = []; // Array to store the points of lines
let toolButtons = document.querySelectorAll(".btn"); // buttons

const erase = () => (ctx.globalCompositeOperation = "destination-out");

//*************************************** WORD OF THE DAY ******************************************

// Function to update the word of the day
function updateWordOfTheDay() {
  const currentDate = new Date();
  const storedDate = localStorage.getItem("wordDate");
  const storedWord = localStorage.getItem("wordOfTheDay");

  // Check if the stored word is from the current day
  if (storedDate === currentDate.toDateString() && storedWord) {
    // If it is, use the stored word
    document.querySelector(
      "header p.subtitle"
    ).textContent = `La palabra del dia es ${storedWord}`;
  } else {
    // If it's not, update the word and store it with the current date
    fetch("./words.json")
      .then((response) => response.json())
      .then((words) => {
        const newWord = words[Math.floor(Math.random() * words.length)];
        console.log(newWord);
        document.querySelector(
          "header p.subtitle"
        ).textContent = `La palabra del día es ${newWord}`;
        localStorage.setItem("wordOfTheDay", newWord);
        localStorage.setItem("wordDate", currentDate.toDateString());
      });
  }
}

//*************************************** SET BRUSH SIZE ******************************************

// open brush size list
function sizeList() {
  document.querySelector(".size-list").classList.toggle("show-list");
  brushSize();
}

// set brushthickness
function brushSize() {
  var brushSet = document.getElementsByClassName("size");
  Array.prototype.forEach.call(brushSet, function (element) {
    element.addEventListener("click", function () {
      brushthickness = element.getAttribute("style").substr(11, 2);
      console.log(brushthickness);
    });
  });
}

//**************************************** CLEAR AND LOAD CANVAS *************************************

function clear() {
  // Clear the canvas and redraw from scratch
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem("canvasData");
}

function saveCanvasToLocalStorage() {
  // Convert the canvas content to a data URL
  const dataURL = canvas.toDataURL();

  // Store the data URL in localStorage
  localStorage.setItem("canvasData", dataURL);
}

function loadCanvasFromLocalStorage() {
  // Check if there's saved canvas data in localStorage
  const dataURL = localStorage.getItem("canvasData");

  if (dataURL) {
    // Create an image element to load the data URL
    const img = new Image();
    img.src = dataURL;

    img.onload = function () {
      // Draw the loaded image onto the canvas
      ctx.drawImage(img, 0, 0);
    };
  }
}

//****************************************** COLOR STUFF *****************************************

// select color
function setColor() {
  var palette = document.getElementsByClassName("color");
  Array.prototype.forEach.call(palette, function (element) {
    element.addEventListener("click", function () {
      color = element.getAttribute("style").split("--set-color:")[1];
      setActiveColor();
    });
  });
}

// set color to paint
function setActiveColor() {
  document.querySelector(".color-btn div").style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.globalCompositeOperation = "source-over";
}

// set color to paint if color-picker is used
function colorPick() {
  color = document.getElementById("color-picker").value;
  setActiveColor();
}

// convert hex color to RGBA
function hexToRgba(hex) {
  let r = 0,
    g = 0,
    b = 0,
    a = 255;
  if (hex.length == 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return { r, g, b, a };
}

// compare two colors
function colorsMatch(color1, color2) {
  return (
    color1.r === color2.r &&
    color1.g === color2.g &&
    color1.b === color2.b &&
    color1.a === color2.a
  );
}

//*************************************** FLOOD FILL ******************************************

// Flood fill algorithm
function floodFill(x, y, fillColor) {
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Get the color of the clicked point
  const targetColor = getPixelColor(data, x, y);
  const fillColorRgba = hexToRgba(fillColor);

  // If target color is the same as fill color, return
  if (colorsMatch(targetColor, fillColorRgba)) return;

  // Stack for pixels to fill
  const stack = [];
  stack.push([x, y]);

  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop();
    const currentColor = getPixelColor(data, currentX, currentY);

    if (colorsMatch(currentColor, targetColor)) {
      setPixelColor(data, currentX, currentY, fillColorRgba);

      stack.push([currentX + 1, currentY]);
      stack.push([currentX - 1, currentY]);
      stack.push([currentX, currentY + 1]);
      stack.push([currentX, currentY - 1]);
    }
  }

  // Update the canvas with new image data
  ctx.putImageData(imageData, 0, 0);
}

// Helper function to get the color of a pixel
function getPixelColor(data, x, y) {
  const index = (y * canvas.width + x) * 4;
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3],
  };
}

// set the color of a pixel
function setPixelColor(data, x, y, color) {
  const index = (y * canvas.width + x) * 4;
  data[index] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;
}

// Handler for filling with the paint bucket tool
function bucketFillHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);

  floodFill(x, y, color);
}

//******************************************* RESIZE CANVAS ***************************************

function resize() {
  // Create a temporary canvas to store the current content
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  // Set the temporary canvas size to match the current canvas
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Copy the current content to the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);

  // Resize the main canvas
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;

  // Draw the temporary canvas content back onto the resized canvas
  ctx.drawImage(tempCanvas, 0, 0);
}

//**************************************** SET CURSOR POSITION *************************************

// new position from mouse events
function setPosition(e) {
  pos.x = parseInt(e.clientX - offsetX);
  pos.y = parseInt(e.clientY - offsetY);
}

//********************************************** DRAW *********************************************

// Function to handle drawing
function drawSmooth(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  // Capture the current mouse position
  const currentPos = {
    x: e.clientX - offsetX,
    y: e.clientY - offsetY,
  };

  // Add the current position to the points array
  points.push(currentPos);

  // Start drawing with the points captured so far
  if (points.length > 2) {
    ctx.beginPath();
    ctx.lineWidth = brushthickness; // width of line
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.moveTo(points[0].x, points[0].y);

    // Use quadratic curves for smooth drawing
    for (let i = 1; i < points.length - 2; i++) {
      const midPoint = {
        x: (points[i].x + points[i + 1].x) / 2,
        y: (points[i].y + points[i + 1].y) / 2,
      };
      ctx.quadraticCurveTo(points[i].x, points[i].y, midPoint.x, midPoint.y);
    }

    // For the last segment
    ctx.quadraticCurveTo(
      points[points.length - 2].x,
      points[points.length - 2].y,
      points[points.length - 1].x,
      points[points.length - 1].y
    );

    ctx.stroke();
    saveCanvasToLocalStorage();
  }
}

// Function to clear points when the drawing ends
function endDrawing() {
  points = [];
}

//************************************** DOWNLOAD CANVAS ******************************************

function onSave() {
  const link = document.createElement("a");
  link.download = "sketch.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

//************************************** TOOL SELECTION ******************************************

// change selected button style
function selectTool(event) {
  // Remove the 'selected' class from all buttons
  let buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });

  // Add the 'selected' class to the clicked button
  event.currentTarget.classList.add("selected");
}

function activateEraser() {
  console.log("Eraser tool activated");
  erase();
  // Remove flood fill handler to avoid unwanted triggers
  canvas.removeEventListener("click", bucketFillHandler);
  canvas.classList.remove("bucket-cursor");

  // Add event listeners for eraser tool
  canvas.addEventListener("mousemove", drawSmooth);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseenter", setPosition);
  canvas.addEventListener("mouseup", endDrawing);
}

function activateBrush() {
  console.log("Brush tool activated");

  // Remove event listeners for other tools
  canvas.classList.remove("bucket-cursor");
  canvas.removeEventListener("click", bucketFillHandler);

  // Add event listeners for brush tool
  canvas.addEventListener("mousemove", drawSmooth);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseenter", setPosition);
  canvas.addEventListener("mouseup", endDrawing);

  // Set the global composite operation to source-over (normal drawing)
  ctx.globalCompositeOperation = "source-over";
}

// set bucket fill mode
function activateBucket() {
  console.log("Bucket tool activated");
  canvas.classList.add("bucket-cursor");

  canvas.removeEventListener("mousemove", drawSmooth);
  canvas.removeEventListener("mousedown", setPosition);
  canvas.removeEventListener("mouseenter", setPosition);
  canvas.removeEventListener("mouseup", endDrawing);

  canvas.addEventListener("click", bucketFillHandler);
}

//***************************************** MAIN AND EVENT LISTENERS ***************************************

window.addEventListener("load", loadCanvasFromLocalStorage); // load the saved canvas data on page load
window.addEventListener("beforeunload", saveCanvasToLocalStorage); // save the canvas data before unloading the page

document.querySelector(".color-btn div").style.backgroundColor = color; //set current color

resize(); // initiate canvas
updateWordOfTheDay(); // Update the word of the day when the page loads
setColor(); // set color

// change button styles when selected
toolButtons.forEach((button) => {
  button.addEventListener("click", selectTool);
});

// event listeners
window.addEventListener("resize", resize); // resize window
document.getElementById("color-picker").addEventListener("change", colorPick); // colorpick trigger
document.getElementById("brush").addEventListener("click", activateBrush); // brush trigger
document.getElementById("eraser").addEventListener("click", activateEraser); // eraser trigger
document.getElementById("bucket").addEventListener("click", activateBucket); // bucket trigger

// trashcan trigger
document.getElementById("trash").addEventListener("click", function () {
  clear(); // clear content
  this.classList.remove("selected"); // unselect trashcan
  document.getElementById("brush").classList.add("selected"); // select brush
  activateBrush();
});
