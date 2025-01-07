const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');
const eraser = document.getElementById('eraser');
const saveImage = document.getElementById('saveImage');

let painting = false;
let currentTool = 'brush';

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : colorPicker.value;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

eraser.addEventListener('click', () => {
  currentTool = 'eraser';
});

colorPicker.addEventListener('input', () => {
  currentTool = 'brush';
});

saveImage.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = canvas.toDataURL();
  link.click();
});
