const can = document.getElementById("animationCanvas");
const ctx = can.getContext("2d");

let mouseX = 0;
let mouseY = 0;
let modeHelp = 0;



function drawRect(x,y,x2,y2) {
    ctx.fillRect(x,y,x2-x,y2-y);
}

function drawArc(x,y,size) {
    ctx.beginPath();
    ctx.arc(x,y,size,0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    if (r !== undefined && g === undefined && b === undefined) {
        return "#" + componentToHex(r) + componentToHex(r) + componentToHex(r);
    }
    else {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

let canX = 10;
let canY = 0;

window.onload = reloadWindow();

function reloadWindow() {
    let win = window;
    let doc = document;
    let docElem = doc.documentElement;
    let body = doc.getElementsByTagName('body')[0];
    const xAxis = win.innerWidth || docElem.clientWidth || body.clientWidth;
    const yAxis = win.innerHeight || docElem.clientHeight || body.clientHeight;
    can.width = xAxis;
    can.height = yAxis;
    canX = xAxis;
    canY = yAxis;
    let smallSide = Math.min(xAxis,yAxis);
    ctx.translate(xAxis/2,yAxis/2);
    ctx.scale(smallSide/1250,smallSide/1250);
}

let timer = 0;

function animationsLoop() {
  if(data.currentTab!=4)return;
    let win = window;
    let doc = document;
    let docElem = doc.documentElement;
    let body = doc.getElementsByTagName('body')[0];
    const xAxis = win.innerWidth || docElem.clientWidth || body.clientWidth;
    const yAxis = win.innerHeight || docElem.clientHeight || body.clientHeight;
    //ctx.translate(xAxis/2,yAxis/2);

    if (xAxis !== canX || yAxis !== canY) {
        reloadWindow();
    }
    if (data.currentTab === 4) {
        modeHelp = 4;
        timer += 1/250;
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black';
        drawRect(0-canX*4,0-canY*4,canX*4,canY*4);

        ctx.globalAlpha = 1;
        ctx.fillStyle = 'gray';
        for (let i = 1; i < 601; i += 1) {
            let j = 300 - i;
            if (i % 10 === 0) {
                ctx.fillStyle = rgbToHex(30,150,0);
            }
            else {
                ctx.fillStyle = rgbToHex(30, 20, 0);
            }
            drawArc(Math.sin(timer/50*i)*i,Math.cos(timer/50*i)*j,2);
        }
    }
    if (data.currentTab === 5) {
        modeHelp = 5;
        timer += 1/250;
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black';
        drawRect(0-canX*4,0-canY*4,canX*4,canY*4);

        ctx.globalAlpha = 1;
        ctx.fillStyle = 'gray';
        for (let i = 1; i < 601; i += 1) {
            let j = 300 - i;
            if (i % 10 === 0) {
                ctx.fillStyle = rgbToHex(69,69,69);
            }
            else {
                ctx.fillStyle = rgbToHex(30, 20, 0);
            }
            drawArc(Math.sin(timer/50*i)*i,Math.cos(timer/50*i)*j,2);
        }
    }

    ctx.fillStyle = "black";
    drawRect(-1,-1,1,1);
}