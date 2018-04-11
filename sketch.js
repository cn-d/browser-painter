console.log(drawConfig)

// let paint = function(sketch) {
//     sketch.setup = function() {
//         document.body.style['userSelect'] = 'none';
//         const body = document.body,
//             html = document.documentElement;
//         let docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
//         let canvas = sketch.createCanvas(sketch.windowWidth, docHeight);
//         canvas.position(0, 0);
//         canvas.style('pointer-events', 'none');
//         canvas.style('z-index', 1000);
//         sketch.clear();
//     } 

//     sketch.draw = function() {
//         sketch.stroke(drawConfig.color);        
//         sketch.strokeWeight(drawConfig.weight);
//         if (sketch.mouseIsPressed) {
//             sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
//         }
//     }
// };

// const painter = new p5(paint);


const canvas = document.createElement('canvas');

canvas.addEventListener("click", function() {
    console.log('click')
})
const ctx = canvas.getContext('2d');
const body = document.body;
const html = document.documentElement;

canvas.width = window.innerWidth;
canvas.height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
Object.assign(canvas.style, {
    position:"absolute", 
    zIndex:"1000", 
    pointerEvents: 'none',
    top: '0',
    left: '0'
});
ctx.strokeStyle = drawConfig.color;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = drawConfig.weight;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
function draw(e) {
    console.log('draw')
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);
    // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.strokeStyle = drawConfig.color;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener('mousedown', (e) => {
    console.log('down')
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
document.body.appendChild(canvas);