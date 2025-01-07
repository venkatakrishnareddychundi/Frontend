const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const freeDrawBtn = document.getElementById('freeDraw');
const lineToolBtn = document.getElementById('lineTool');
const rectangleToolBtn = document.getElementById('rectangleTool');
const circleToolBtn = document.getElementById('circleTool');
const eraserToolBtn = document.getElementById('eraserTool');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasBtn = document.getElementById('clearCanvas');
const saveImageBtn = document.getElementById('saveImage');

let painting = false;
let currentTool = 'freeDraw';
let startX, startY;

// Start drawing
function startPosition(e) {
  painting = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (currentTool === 'freeDraw') draw(e);
}

// Stop drawing
function endPosition() {
  painting = false;
  ctx.beginPath();
}

// Draw function
function draw(e) {
  if (!painting || currentTool !== 'freeDraw') return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Draw shapes
function drawShape(e) {
  if (!painting) return;

  const endX = e.offsetX;
  const endY = e.offsetY;
  const width = endX - startX;
  const height = endY - startY;

  ctx.lineWidth = brushSize.value;
  ctx.strokeStyle = colorPicker.value;
  ctx.fillStyle = colorPicker.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  switch (currentTool) {
    case 'line':
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
      break;
    case 'rectangle':
      ctx.strokeRect(startX, startY, width, height);
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(startX, startY, Math.sqrt(width ** 2 + height ** 2), 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      break;
  }
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas as image
function saveImage() {
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Set tool
function setTool(tool) {
  currentTool = tool;
}

// Event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', (e) => {
  if (['line', 'rectangle', 'circle'].includes(currentTool)) drawShape(e);
  else draw(e);
});

freeDrawBtn.addEventListener('click', () => setTool('freeDraw'));
lineToolBtn.addEventListener('click', () => setTool('line'));
rectangleToolBtn.addEventListener('click', () => setTool('rectangle'));
circleToolBtn.addEventListener('click', () => setTool('circle'));
eraserToolBtn.addEventListener('click', () => {
  setTool('freeDraw');
  ctx.strokeStyle = '#ffffff';
});
clearCanvasBtn.addEventListener('click', clearCanvas);
saveImageBtn.addEventListener('click', saveImage);
