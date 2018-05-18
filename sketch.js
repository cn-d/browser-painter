

    const canvas = document.createElement('canvas');
    const body = document.body;
    const html = document.documentElement;
    body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio

    let windowWidth = window.innerWidth 
    let windowHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )

    canvas.width = windowWidth * scale;
    canvas.height = windowHeight * scale;

console.log(canvas.width, canvas.height);


    Object.assign(canvas.style, {
        position:"absolute", 
        zIndex: 1000, 
        // pointerEvents: 'none',
        height: windowHeight,
        width: windowWidth,
        top: '0',
        left: '0'
    });

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // Does not seem to make a difference
    ctx.scale(scale, scale)
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

