//@ts-nocheck
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.beginPath();
ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();

class Particle {
  constructor() {}
}
