const canvas = document.createElement('canvas');
const body = document.body;
const html = document.documentElement;
body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

// if(devicePixelRatio >= 2){        
//     canvas.width *= 2;
//     canvas.height *= 2;
//     ctx.scale(2, 2);
// }

Object.assign(canvas.style, {
    position:"absolute", 
    zIndex: 1000, 
    // pointerEvents: 'none',
    top: '0',
    left: '0',
});
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.translate(0.5, 0.5);

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = drawConfig.color;
    ctx.lineWidth = drawConfig.weight;
    ctx.beginPath();

    // ctx.moveTo(lastX + 0.5, lastY + 0.5);
    // ctx.lineTo(e.offsetX + 0.5, e.offsetY + 0.5);
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
