import { fitImageOn, getFittedImageSize } from './lib/fit-image';
import { drawPath, mapPointsToNewSize } from './lib/paint';

(() => {
    window.onload = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        let fittedImageSize;

        const img = new Image();
        img.onload = () => {
            fittedImageSize = getFittedImageSize(canvas, img);
            canvas.setAttribute('width', fittedImageSize.width); 
            canvas.setAttribute('height', fittedImageSize.height); 
            fitImageOn(canvas, img);
        };
        // img.setAttribute('crossOrigin', 'anonymous');
        // img.src = 'https://lh3.googleusercontent.com/KehsPtVQZjCsPw8z-zzBlQuYHEVujAiuUvBFiDqqktbhcsHdw2YPYzaPhGflAQ2aAgAwL7RduuQILlXoIuukZIjZ9y8czr5C5OopXZAIM28ymxgkPklXjRHHWeoJis3OW1B0-qKOj2G8lzILM2bGEn149MmTm8ioCZ_QZYNAocik-vrV6VehG2o_r9XkEq2lnpy2QnLnN_mPPnVimINcAmn0lKxOayv9ebqvKl_n7a9U_l52AxEcQnZtBhSU4nbKrt5NF6k_wDvieRSTw6rnTjHis5M1jj1E7SVeIvW10JSg3Xos3eQGOcIZ1vRyIsrsSptphO7WQf_NaR5-qeWvA4XijsmQyhCZONnskNGptaPfGPoUGb6cZ3LDVG3oLevKtGJnthNRLKk6hiYV2o27YCbNEHyUdhEB6C0hc09L77_aYA62_F72kD1fhyHO9xyWnA5yxzLECBCyz-sLMH6_eCcFSiOyv7YwGoxgplqg-67GL8CppFufPU1wfzJVeq5jfq-OK4R2YQ069aIa7XwewX4KJVNkFF0kyq15J1SKaPTX52DOmMpU5mEZ0n2N4Ls3Q5U4ecEiaRH4ZwUri95UVLuyDWvKgLT00jYbTUVyMoiFX8vviyGcGw=w1680-h1260-no';

        canvas.addEventListener('mousedown', (e) => {
            var mouseX = e.pageX - canvas.offsetLeft;
            var mouseY = e.pageY - canvas.offsetTop;

            paint = true;
            addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
            redraw();
        });

        canvas.addEventListener('mousemove', (e) => {
            if (paint) {
                addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
                redraw();
            }
        });

        canvas.addEventListener('mouseup', () => {
            paint = false;
        });

        canvas.addEventListener('mouseleave', () => {
            paint = false;
        });

        let points = [];
        let paint = false;

        function addClick(x, y, dragging) {
            points.push({ x, y, dragging });
        }

        function redraw() {
            drawPath(points, context);
        }

        const uploadInput = document.getElementById('uploadInput');
        uploadInput.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        });

        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener('click', () => {
            window.open(canvas.toDataURL());
        });

        const downloadFullBtn = document.getElementById('downloadFullBtn');
        downloadFullBtn.addEventListener('click', () => {
            const origImgCanvas = document.createElement('canvas');
            origImgCanvas.setAttribute('width', img.width);
            origImgCanvas.setAttribute('height', img.height);
            
            fitImageOn(origImgCanvas, img);
            
            //TODO: check this method
            const origImgPoints = mapPointsToNewSize(points, fittedImageSize, { width: img.width, height: img.height });
            
            drawPath(origImgPoints, origImgCanvas.getContext('2d'));
            
            window.open(origImgCanvas.toDataURL());
        });

    }
})();
