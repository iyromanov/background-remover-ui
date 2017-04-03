import fitImageOn from './lib/fit-image';

(() => {
    window.onload = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            fitImageOn(canvas, context, img);
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

        let clickX = new Array();
        let clickY = new Array();
        let clickDrag = new Array();
        let paint = false;

        function addClick(x, y, dragging) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }

        function redraw() {
            // clear canvas
            // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            context.strokeStyle = '#df4b26';
            context.lineJoin = 'round';
            context.lineWidth = 5;

            for (var i = 0; i < clickX.length; i++) {
                context.beginPath();
                if (clickDrag[i] && i) {
                    context.moveTo(clickX[i-1], clickY[i-1]);
                } else {
                    context.moveTo(clickX[i]-1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                context.closePath();
                context.stroke();
            }
        }

        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener('click', () => {
            // console.log(canvas.toDataURL('image/png'));
            window.open(canvas.toDataURL());
        });

        const uploadInput = document.getElementById('uploadInput');
        uploadInput.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        });

    }
})();
