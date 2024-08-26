let A = 1, B = 1;
const donutElement = document.getElementById("donut");
const canvasWidth = 160;  // Increase this to make the donut wider
const canvasHeight = 44;  // Increase this to make the donut taller
const chars = ".,-~:;=!*#$@";

function renderDonut() {
    let output = Array(canvasWidth * canvasHeight).fill(' ');
    let zBuffer = Array(canvasWidth * canvasHeight).fill(0);

    for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
            let sinA = Math.sin(A), cosA = Math.cos(A);
            let sinB = Math.sin(B), cosB = Math.cos(B);
            let cosj = Math.cos(j), sinj = Math.sin(j);
            let cosi = Math.cos(i), sini = Math.sin(i);
            let h = cosj + 2;
            let D = 1 / (sini * h * sinA + sinj * cosA + 5);
            let t = sini * h * cosA - sinj * sinA;

            let x = (canvasWidth / 2 + 2 * cosi * h * cosB - t * sinB) | 0;
            let y = (canvasHeight / 2 + 2 * cosi * h * sinB + t * cosB) | 0;
            let o = x + canvasWidth * y;
            let N = ((cosj * cosA - sini * sinj * sinA) * cosB - sini * sinj * cosA - cosi * sinA - cosj * sini * sinB) * 8;

            if (y < canvasHeight && y >= 0 && x >= 0 && x < canvasWidth && D > zBuffer[o]) {
                zBuffer[o] = D;
                output[o] = chars.charAt(N > 0 ? N : 0);
            }
        }
    }

    donutElement.innerHTML = output.join('').replace(/(.{160})/g, "$1<br/>");  // Updated wrap
    A += 0.04;
    B += 0.02;
}

setInterval(renderDonut, 50);