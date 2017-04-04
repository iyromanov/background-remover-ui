// https://sdqali.in/blog/2013/10/03/fitting-an-image-in-to-a-canvas-object/

export function fitImageOn(canvas, img) {
    var imageAspectRatio = img.width / img.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = img.width * (renderableHeight / img.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = img.height * (renderableWidth / img.width);
        xStart = 0;
        yStart = (canvas.height - renderableHeight) / 2;
    }

    // Happy path - keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }

    canvas.getContext('2d').drawImage(img, xStart, yStart, renderableWidth, renderableHeight);

    return { width: renderableWidth, height: renderableHeight };
};

export function getFittedImageSize(canvas, img) {
    var imageAspectRatio = img.width / img.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var height, width;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        height = canvas.height;
        width = img.width * (height / img.height);
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        width = canvas.width
        height = img.height * (width / img.width);
    }

    // Happy path - keep aspect ratio
    else {
        height = canvas.height;
        width = canvas.width;
    }

    return { width, height };
}