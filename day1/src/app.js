const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

ctx.arc(420, 280, 50, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(400, 270, 10, Math.PI, Math.PI * 2);
ctx.fillStyle = "yellow";
ctx.fill();

ctx.beginPath();
ctx.arc(440, 270, 10, Math.PI, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();

ctx.beginPath();
// ctx.arc(420, 310, 20, Math.PI, Math.PI * 2);
ctx.arc(420, 290, 20, 0, Math.PI);

ctx.fillStyle = "red";
ctx.fill();

ctx.fillStyle = "black";
ctx.fillRect(350, 340, 20, 100);
ctx.fillRect(380, 340, 80, 200);
ctx.fillRect(470, 340, 20, 100);
3;
