const canvas = document.getElementsByClassName("canva")[0];
const reset = document.getElementsByClassName("reset")[0];
const ok = document.getElementsByClassName("ok")[0];
const msg = document.getElementsByClassName("msg")[0];
const brush = canvas.getContext("2d");
brush.globalCompositeOperation = "destination-over";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorAngle = 0;

let radiusIncreaser = 0;
let angle = 0;
let path = 5;
let shapeChanger = 0;
let size = 10;

const mousePos = {
    x: undefined,
    y: undefined,
};

reset.addEventListener("click", () => {
    brush.clearRect(0, 0, canvas.width, canvas.height);
});

ok.addEventListener("click", () => {
    msg.style.display = "none";
});

canvas.addEventListener("click", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
    shapeChanger = Math.random().toPrecision(1);
    if (shapeChanger < 0.1) {
        shapeChanger += 0.1;
    }
    run();
});

function drawCircle() {
    angle = radiusIncreaser * shapeChanger;
    radius = path * Math.sqrt(radiusIncreaser);
    mousePos.x += radius * Math.cos(angle);
    mousePos.y += radius * Math.sin(angle);

    brush.fillStyle = `hsl(${colorAngle}, 100%, 50%)`;
    brush.strokeStyle = `hsl(${colorAngle / 2}, 100%, 50%)`;
    brush.lineWidth = 1;
    brush.beginPath();
    brush.arc(mousePos.x, mousePos.y, size, 0, Math.PI * 2);
    brush.fill();
    brush.stroke();
    radiusIncreaser++;
    colorAngle++;
    size += 0.1;
}

function run() {
    canvas.style.pointerEvents = "none";
    drawCircle();
    if (radiusIncreaser > 140) {
        radiusIncreaser = 10;
        canvas.style.pointerEvents = "auto";
        size = 1;
        return;
    }
    requestAnimationFrame(run);
}
