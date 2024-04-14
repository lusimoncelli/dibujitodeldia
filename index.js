

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

// Insert the random word into the header
document.querySelector("header p.word-of-the-day").textContent = getRandomWord();

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

// Function to set bucket fill mode
function setBucket() {
  color = document.getElementById('color-picker').value;
  canvas.setBackgroundColor(color);
  canvas.renderAll();
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

//***************************************** EVENT LISTENERS ***************************************

// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listeners to trigger on different mouse events
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

// event listeners from touch events
document.addEventListener("touchmove", touchDraw);
document.addEventListener("touchstart", setTouchPosition);

document.getElementById("color-picker").addEventListener("change", colorPick);
setColor();