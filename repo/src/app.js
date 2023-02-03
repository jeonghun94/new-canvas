const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.querySelector("#lineWidth");
const color = document.querySelector("#color");
const colors = Array.from(document.querySelectorAll(".color-option"));

const fill = document.querySelector("#fill");
const stroke = document.querySelector("#stroke");

let isPainting = false;
let isFilling = false;

let isStroke = true;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

const onMove = (e) => {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    if (isStroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }

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

const handleCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", handleCanvasClick);

lineWidth.addEventListener("change", handleLineWidth);

color.addEventListener("change", handleColor);
colors.forEach((color) => color.addEventListener("click", handleColorClick));

fill.addEventListener("click", () => (isStroke = false));
stroke.addEventListener("click", () => (isStroke = true));
