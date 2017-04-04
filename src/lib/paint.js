export function drawPath(points = [], context) {
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 3;

    for (let i = 0; i < points.length; i++) {
        const curPoint = points[i];
        const prevPoint = i && points[i - 1];

        context.beginPath();
        if (curPoint.dragging && prevPoint) {
            context.moveTo(prevPoint.x, prevPoint.y);
        } else {
            context.moveTo(curPoint.x - 1, curPoint.y);
        }
        context.lineTo(curPoint.x, curPoint.y);
        context.closePath();
        context.stroke();
    }   
}

export function mapPointsToNewSize(points, size, newSize) {
    const xRatio = newSize.width / size.width;
    const yRatio = newSize.height / size.height;
    return points.map(p => ({
        x: p.x * xRatio,
        y: p.y * yRatio,
        dragging: p.dragging
    }));
}

export function clear(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}