var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
let color = "#000";
let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;
let brushthickness = 7;

const erase = () => (ctx.globalCompositeOperation = "destination-out");

//set current color
document.querySelector(".color-btn div").style.backgroundColor = color;

resize();

function sizeList() {
  document.querySelector(".size-list").classList.toggle("show-list");
  brushSize();
}

//*************************************** WORD OF THE DAY ******************************************

const words = [
  "perro", "gato", "casa", "auto", "libro", "ciudad", "persona", "familia", "amigo", "comida",
  "mano", "día", "agua", "mesa", "calle", "aire", "sol", "luz", "noche", "estrella",
  "corazón", "amor", "canción", "vida", "mundo", "camino", "juego", "trabajo", "escuela", "arte",
  "cosa", "río", "mar", "montaña", "flor", "árbol", "color", "foto", "película", "música",
  "bebida", "cielo", "nube", "viento", "lluvia", "nieve", "fuego", "tierra", "planeta", "animal",
  "pájaro", "insecto", "pez", "oso", "león", "tigre", "elefante", "jirafa", "serpiente", "oso hormiguero",
  "pelota", "jugador", "equipo", "baloncesto", "fútbol", "tenis", "voleibol", "béisbol", "natación", "ciclismo",
  "correr", "caminar", "saltar", "bailar", "cantar", "escribir", "pintar", "dibujar", "leer", "estudiar",
  "aprender", "enseñar", "hablar", "escuchar", "ver", "sentir", "tocar", "oler", "gustar", "disfrutar",
  "comer", "beber", "dormir", "despertar", "soñar", "recordar", "olvidar", "pensar", "imaginar", "crear",
  "construir", "destruir", "reparar", "viajar", "volar", "nadar", "surfar", "esquiar", "patinar", "montar",
  "conducir", "andar", "correr", "saltar", "bucear", "cazar", "pescar", "acampar", "explorar", "descubrir",
  "buscar", "encontrar", "perder", "ganar", "competir", "colaborar", "trabajar", "descansar", "relajarse", "meditar",
  "respirar", "sonreír", "reír", "llorar", "gritar", "suspirar", "gemir", "besar", "abrazar", "tocar",
  "sentir", "amar", "querer", "necesitar", "extrañar", "esperar", "esperanza", "sueño", "metas", "objetivos",
  "logros", "éxito", "fallo", "fracaso", "miedo", "valentía", "coraje", "amabilidad", "generosidad",
  "bondad", "compasión", "empatía", "solidaridad", "humildad", "orgullo", "ego", "ambición", "codicia",
  "avaricia", "paz", "guerra", "violencia", "conflicto", "dolor", "tristeza", "felicidad", "alegría",
  "emoción", "alegría", "amistad", "compañerismo", "amor", "romance", "pasión", "odio", "rencor",
  "ira", "rabia", "frustración", "sorpresa", "asombro", "misterio", "suspenso", "intriga", "terror",
  "horror", "fantasía", "magia", "realidad", "ficción", "verdad", "mentira", "engañar", "trampa",
  "honestidad", "sinceridad", "vergüenza", "culpa", "remordimiento", "perdón", "paz", "armonía", "equilibrio",
  "orden", "caos", "confusión", "desorden", "complejidad", "simplicidad", "claridad", "oscuridad", "luz",
  "sombra", "silencio", "ruido", "sonido", "música", "melodía", "ritmo", "armonía", "concierto",
  "orquesta", "instrumento", "guitarra", "piano", "violín", "batería", "flauta", "saxofón", "trompeta",
  "tambor", "percusión", "voz", "canto", "coro", "solista", "compositor", "director", "partitura",
  "arte", "pintura", "escultura", "arquitectura", "diseño", "moda", "teatro", "cine", "película",
  "actuación", "actor", "actriz", "escenario", "guión", "director", "cámara", "edición", "efectos",
  "especial", "animación", "cómics", "novela", "poesía", "literatura", "autor", "escritor", "poeta",
  "lector", "biblioteca", "libro", "revista", "periódico", "artículo", "ensayo", "investigación", "educación",
  "escuela", "colegio", "universidad", "maestro", "profesor", "alumno", "estudiante", "aprendiz", "conocimiento",
  "aprendizaje", "enseñanza", "lectura", "escritura", "cálculo", "matemáticas", "ciencia", "física", "química",
  "biología", "geografía", "historia", "arte", "música", "educación", "física", "deporte", "salud",
  "nutrición", "medicina", "enfermedad", "hospital", "médico", "enfermera", "paciente", "cirugía", "tratamiento",
  "recuperación", "salud", "mental", "mente", "cuerpo", "alma", "espíritu", "religión", "creencia",
  "fe", "culto", "iglesia", "templo", "oración", "ritual", "sagrado", "profano", "santuario",
  "monasterio", "fraternidad", "comunidad", "sociedad", "civilización", "cultura", "arte", "música", "literatura",
  "filosofía", "política", "economía", "derecho", "justicia", "democracia", "gobierno", "gobernante", "ciudadano",
  "nación", "patria", "bandera", "himno", "constitución", "derechos", "humanos", "libertad", "igualdad",
  "fraternidad", "paz", "guerra", "violencia", "conflicto", "poder", "autoridad", "policía", "ejército",
  "armas", "defensa", "ataque", "terrorismo", "terrorista", "seguridad", "protección", "protesta", "revolución",
  "movimiento", "rebelión", "resistencia", "revuelta", "levantamiento", "huelga", "manifestación", "marcha", "demostración",
  "elección", "votación", "campaña", "política", "partido", "oposición", "gobierno", "estado", "nación",
  "territorio", "frontera", "independencia", "soberanía", "capital", "ciudad", "pueblo", "aldea", "barrio",
  "calle", "plaza", "parque", "jardín", "río", "lago", "mar", "océano", "montaña",
  "valle", "desierto", "bosque", "selva", "campo", "pradera", "isla", "continente", "hemisferio",
  "norte", "sur", "este", "oeste", "paisaje", "naturaleza", "ecología", "medio ambiente", "clima",
  "temperatura", "lluvia", "nieve", "sol", "luna", "estrella", "planeta", "espacio", "universo",
  "galaxia", "sistema", "astro", "meteorito", "cometa", "satélite", "nave", "exploración", "aventura",
  "descubrimiento", "hallazgo", "conquista", "colonización", "población", "ciudadanía", "migración", "inmigración", "emigración",
  "asilo", "refugio", "exilio", "diáspora", "minoría", "mayoría", "etnia", "raza", "nacionalidad",
  "idioma", "cultura", "costumbre", "tradición", "religión", "creencia", "ritual", "festividad", "celebración",
  "carnaval", "navidad", "año nuevo", "pascua", "ramadán", "diwali", "hanukkah", "sabbath", "oración",
  "ayuno", "sacrificio", "ofrenda", "ritual", "boda", "matrimonio", "compromiso", "divorcio", "separación",
  "nacimiento", "bautizo", "confirmación", "comunión", "barr mitzvah", "quinceañera", "graduación", "promoción", "examen",
  "aprobación", "suspensión", "evaluación", "calificación", "nota", "aplauso", "elogio", "recompensa", "castigo",
  "disciplina", "regla", "ley", "norma", "justicia", "derechos", "libertad", "igualdad", "fraternidad"
];

// Function to select a random word from the list
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to update the word of the day
function updateWordOfTheDay() {
  const currentDate = new Date();
  const storedDate = localStorage.getItem('wordDate');
  const storedWord = localStorage.getItem('wordOfTheDay');

  // Check if the stored word is from the current day
  if (storedDate === currentDate.toDateString() && storedWord) {
      // If it is, use the stored word
      document.querySelector("header p.subtitle").textContent = `La palabra del dia es ${storedWord}`;
  } else {
      // If it's not, update the word and store it with the current date
      const newWord = getRandomWord();
      document.querySelector("header p.subtitle").textContent = `La palabra del dia es ${newWord}`;
      localStorage.setItem('wordOfTheDay', newWord);
      localStorage.setItem('wordDate', currentDate.toDateString());
  }
}

//*************************************** SET BRUSH SIZE ******************************************


function brushSize() {
  var brushSet = document.getElementsByClassName("size");
  Array.prototype.forEach.call(brushSet, function (element) {
    element.addEventListener("click", function () {
      brushthickness = element.getAttribute("style").substr(11, 2);
      console.log(brushthickness);
    });
  });
}

//**************************************** SET COLOR TO PALETTE ***********************************

function setActiveColor() {
  document.querySelector(".color-btn div").style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.globalCompositeOperation = "source-over";
}

//**************************************** SET COLOR TO BRUSH *************************************

function setColor() {
  var palette = document.getElementsByClassName("color");
  Array.prototype.forEach.call(palette, function (element) {
    element.addEventListener("click", function () {
      color = element.getAttribute("style").split("--set-color:")[1];
      setActiveColor();
    });
  });
}

//****************************************** COLOR PICKER *****************************************

function colorPick() {
  color = document.getElementById("color-picker").value;
  setActiveColor();
}

//*************************************** FLOOD FILL ******************************************

// Function to convert hex color to RGBA
function hexToRgba(hex) {
  let r = 0, g = 0, b = 0, a = 255;
  if (hex.length == 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return { r, g, b, a };
}

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
    a: data[index + 3]
  };
}

// Helper function to set the color of a pixel
function setPixelColor(data, x, y, color) {
  const index = (y * canvas.width + x) * 4;
  data[index] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;
}

// Helper function to compare two colors
function colorsMatch(color1, color2) {
  return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
}

// Function to set bucket fill mode
function setBucket() {
  canvas.addEventListener('click', bucketFillHandler);
}

// Handler for filling with the paint bucket tool
function bucketFillHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);

  floodFill(x, y, color);
}

// remove bucket 
function activateBrush() {
  console.log("Brush tool activated");
  
  // Remove event listeners for other tools
  canvas.removeEventListener('click', bucketFillHandler);
  
  // Add event listeners for brush tool
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', setPosition);
  canvas.addEventListener('mouseenter', setPosition);

  // Set the global composite operation to source-over (normal drawing)
  ctx.globalCompositeOperation = "source-over";
}

//******************************************* RESIZE CANVAS ***************************************

function resize() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

//**************************************** SET CURSOR POSITION *************************************

// initialize position as 0,0
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = parseInt(e.clientX - offsetX);
  pos.y = parseInt(e.clientY - offsetY);
}

function setTouchPosition(e){
  pos.x = parseInt(e.touches[0].clientX - offsetX);
  pos.y = parseInt(e.touches[0].clientY - offsetY);
}

//********************************************** DRAW *********************************************

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
  ctx.stroke(); // draw it!
}

function touchDraw(e) {

  setTouchPosition(e);

  ctx.beginPath(); // begin the drawing path
  ctx.lineWidth = brushthickness; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex color of line
  ctx.moveTo(pos.x, pos.y); // from position
  setTouchPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position
  ctx.closePath();
  ctx.stroke(); // draw it!
  setTouchPosition(e);
}

//************************************** DOWNLOAD CANVAS ******************************************

function onSave() {
  const link = document.createElement('a');
  link.download = 'sketch.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

//************************************** TOOL SELECTION ******************************************
function selectTool(event) {
  // Remove the 'selected' class from all buttons
  let buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
      button.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked button
  event.currentTarget.classList.add('selected');
}

function activateEraser() {
  erase();
  // Remove flood fill handler to avoid unwanted triggers
  canvas.removeEventListener('click', bucketFillHandler);
  // Add event listeners for eraser tool
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', setPosition);
  canvas.addEventListener('mouseenter', setPosition);
}

//***************************************** EVENT LISTENERS ***************************************

// Update the word of the day when the page loads
updateWordOfTheDay();

// change button styles when selected
let toolButtons = document.querySelectorAll('.btn');
toolButtons.forEach(button => {
  button.addEventListener('click', selectTool);
});

// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);
document.getElementById("color-picker").addEventListener("change", colorPick);
document.getElementById("brush").addEventListener("click", activateBrush);
setColor();
