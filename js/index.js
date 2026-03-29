(() => {
const canvas = document.getElementById('sector-canvas');
if (!canvas) return;
const ctx = canvas.getContext('2d');

let w, h, cols, rows, cellW, cellH;
const accent = { r: 16, g: 138, b: 252 };
const ships = [];
const crossings = [];
const shipCount = 40;
let mouse = { x: -1000, y: -1000 };
let time = 0;

function resize() {
w = canvas.width = canvas.offsetWidth;
h = canvas.height = canvas.offsetHeight;
cols = Math.max(3, Math.floor(w / 200));
rows = Math.max(2, Math.floor(h / 200));
cellW = w / cols;
cellH = h / rows;
}

function createShip() {
return {
x: Math.random() * w,
y: Math.random() * h,
vx: (Math.random() - 0.5) * 0.8,
vy: (Math.random() - 0.5) * 0.8,
size: Math.random() * 2 + 1.5,
alpha: Math.random() * 0.5 + 0.3,
lastCol: -1,
lastRow: -1,
};
}

function init() {
resize();
ships.length = 0;
for (let i = 0; i < shipCount; i++) ships.push(createShip());
}

function drawGrid() {
ctx.lineWidth = 1;
for (let c = 1; c < cols; c++) {
const x = c * cellW;
const wave = Math.sin(time * 0.005 + c) * 2;
ctx.beginPath();
ctx.moveTo(x + wave, 0);
ctx.lineTo(x - wave, h);
ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',0.12)';
ctx.stroke();
}
for (let r = 1; r < rows; r++) {
const y = r * cellH;
const wave = Math.cos(time * 0.005 + r) * 2;
ctx.beginPath();
ctx.moveTo(0, y + wave);
ctx.lineTo(w, y - wave);
ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',0.12)';
ctx.stroke();
}
}

function drawSectorLabels() {
ctx.font = '11px Roboto, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
for (let r = 0; r < rows; r++) {
for (let c = 0; c < cols; c++) {
const cx = c * cellW + cellW / 2;
const cy = r * cellH + cellH / 2;
const dx = mouse.x - cx;
const dy = mouse.y - cy;
const dist = Math.sqrt(dx * dx + dy * dy);
const hover = Math.max(0, 1 - dist / 250);
const alpha = 0.04 + hover * 0.12;
ctx.fillStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',' + alpha + ')';
ctx.fillText('S-' + (r * cols + c + 1), cx, cy);
}
}
}

function updateShips() {
for (const s of ships) {
s.x += s.vx;
s.y += s.vy;
if (s.x < 0) { s.x = 0; s.vx *= -1; }
if (s.x > w) { s.x = w; s.vx *= -1; }
if (s.y < 0) { s.y = 0; s.vy *= -1; }
if (s.y > h) { s.y = h; s.vy *= -1; }
var col = Math.floor(s.x / cellW);
var row = Math.floor(s.y / cellH);
if (s.lastCol !== -1 && (col !== s.lastCol || row !== s.lastRow)) {
crossings.push({ x: s.x, y: s.y, life: 1 });
}
s.lastCol = col;
s.lastRow = row;
}
}

function drawShips() {
for (const s of ships) {
var dx = mouse.x - s.x;
var dy = mouse.y - s.y;
var dist = Math.sqrt(dx * dx + dy * dy);
var boost = Math.max(0, 1 - dist / 200);
var a = s.alpha + boost * 0.5;
var sz = s.size + boost * 2;
ctx.beginPath();
ctx.arc(s.x, s.y, sz, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',' + a + ')';
ctx.fill();
if (boost > 0.01) {
ctx.beginPath();
ctx.arc(s.x, s.y, sz + 4 * boost, 0, Math.PI * 2);
ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',' + (boost * 0.3) + ')';
ctx.lineWidth = 1;
ctx.stroke();
}
}
}

function drawConnections() {
for (var i = 0; i < ships.length; i++) {
for (var j = i + 1; j < ships.length; j++) {
var a = ships[i], b = ships[j];
var dx = a.x - b.x, dy = a.y - b.y;
var dist = Math.sqrt(dx * dx + dy * dy);
if (dist < 120) {
var alpha = (1 - dist / 120) * 0.15;
ctx.beginPath();
ctx.moveTo(a.x, a.y);
ctx.lineTo(b.x, b.y);
ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',' + alpha + ')';
ctx.lineWidth = 0.5;
ctx.stroke();
}
}
}
}

function drawCrossings() {
for (var i = crossings.length - 1; i >= 0; i--) {
var c = crossings[i];
c.life -= 0.015;
if (c.life <= 0) { crossings.splice(i, 1); continue; }
var radius = (1 - c.life) * 30;
ctx.beginPath();
ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
ctx.strokeStyle = 'rgba(' + accent.r + ',' + accent.g + ',' + accent.b + ',' + (c.life * 0.4) + ')';
ctx.lineWidth = 1;
ctx.stroke();
}
}

function frame() {
time++;
ctx.clearRect(0, 0, w, h);
drawGrid();
drawSectorLabels();
drawConnections();
updateShips();
drawShips();
drawCrossings();
requestAnimationFrame(frame);
}

canvas.addEventListener('mousemove', function(e) {
var r = canvas.getBoundingClientRect();
mouse.x = e.clientX - r.left;
mouse.y = e.clientY - r.top;
});
canvas.addEventListener('mouseleave', function() {
mouse.x = -1000;
mouse.y = -1000;
});

window.addEventListener('resize', resize);
init();
frame();
})();
