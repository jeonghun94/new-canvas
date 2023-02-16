const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.querySelector("#lineWidth");
const color = document.querySelector("#color");
const colors = Array.from(document.querySelectorAll(".color-option"));

const mode = document.querySelector("#mode");

const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");

const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveBtn = document.querySelector("#save");

let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

const onMove = (e) => {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
};

const startPainting = () => (isPainting = true);
const cancelPainting = () => {
  isPainting = false;
  ctx.beginPath();
};
const handleLineWidth = (e) => (ctx.lineWidth = e.target.value);

const handleStyle = (color) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};
const handleColor = (e) => {
  handleStyle(e.target.value);
};

const handleColorClick = (e) => {
  const colorValue = e.target.dataset.color;
  handleStyle(colorValue);
  color.value = colorValue;
};

const handleMode = () => {
  if (isFilling) {
    isFilling = false;
    mode.innerText = "Fill";
  } else {
    isFilling = true;
    mode.innerText = "Paint";
  }
};

const handleCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const handleEraser = () => {
  isFilling = false;
  mode.innerText = "Fill";
  handleStyle("white");
};
const hadleClear = () => {
  isFilling = false;
  mode.innerText = "Fill";
  handleStyle("white");
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  handleStyle("black");
};

const handleImage = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
  file.value = "";
};

const handleText = (e) => {
  const text = textInput.value;
  if (!text) return;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "30px sans-serif";
  ctx.fillText(text, e.offsetX, e.offsetY);
  ctx.restore();
};

const handleSave = () => {
  const url = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = url;
  link.download = "PaintJS.png";
  link.click();
};

canvas.addEventListener("dblclick", handleText);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", handleCanvasClick);

lineWidth.addEventListener("change", handleLineWidth);

color.addEventListener("change", handleColor);
colors.forEach((color) => color.addEventListener("click", handleColorClick));

mode.addEventListener("click", handleMode);

eraser.addEventListener("click", handleEraser);
clear.addEventListener("click", hadleClear);

fileInput.addEventListener("change", handleImage);
saveBtn.addEventListener("click", handleSave);
