console.log(drawConfig)

let paint = function(sketch) {
    sketch.setup = function() {
        document.body.style['userSelect'] = 'none';
        const body = document.body,
            html = document.documentElement;
        let docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        let canvas = sketch.createCanvas(sketch.windowWidth, docHeight);
        canvas.position(0, 0);
        canvas.style('pointer-events', 'none');
        canvas.style('z-index', 1000);
        sketch.clear();
    } 

    sketch.draw = function() {
        sketch.stroke(drawConfig.color);        
        sketch.strokeWeight(drawConfig.weight);
        if (sketch.mouseIsPressed) {
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        }
    }
};

const painter = new p5(paint);
