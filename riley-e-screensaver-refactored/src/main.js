import {getRandomColor, getRandomInt} from "./utils.js";
import {drawRectangle, drawArc, drawLine} from "./canvas-utils.js";

let ctx;
let paused = false;
let updateRunning = true;
let createRectangles = true;
let createArcs = true;
let createLines = true;
let canvas;

const init = () =>{
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!
    
    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");
    
    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");
    
    // C - all fill operations are now in red
    ctx.fillStyle = "red"; 
    
    // D - fill a rectangle with the current fill color
    ctx.fillRect(20,20,600,440);
    
    //rect()
    drawRectangle(ctx,120,120,400,300,"blue")

    // lines
    drawLine(ctx,20,20,640,640,5,"orange")
    drawLine(ctx,620,20,20,460,5,"orange")

    //circle
    drawArc(ctx,320,240,50,"green",5,"yellow",0,Math.PI * 2)

    //semi circle
    drawArc(ctx,320,240,20,"blue",5,"orange",0,Math.PI)

    //eyes
    drawArc(ctx,300,220,10,"blue",5,"orange",0,Math.PI * 2)
    drawArc(ctx,340,220,10,"blue",5,"orange",0,Math.PI * 2)

    //thick line
    drawLine(ctx,20,300,620,300,20,"orange")

    setupUI();

    update();
}

const update = () => {
    if(paused) return;
    requestAnimationFrame(update);
    if(createRectangles){
        drawRandomRect(ctx);
    }
    if(createArcs)
    {
        drawRandomArc(ctx);
    }
    if(createLines){
        drawRandomLine(ctx);
    }
}

const drawRandomRect = (ctx) =>{
    drawRectangle(ctx,getRandomInt(0, 640), getRandomInt(0,480),getRandomInt(10,90), getRandomInt(0, 640),getRandomColor(),getRandomInt(2, 12),getRandomColor())
}

const drawRandomArc = (ctx) =>{
    drawArc(ctx,getRandomInt(0, 640), getRandomInt(0,480),getRandomInt(10,50),getRandomColor(),getRandomInt(2, 12),getRandomColor());
}

const drawRandomLine = (ctx) =>{
    drawLine(ctx,getRandomInt(0,100),getRandomInt(0, 480),getRandomInt(540,640),getRandomInt(0,480),getRandomInt(1, 20),getRandomColor());
}

//event handlers
const canvasClicked = (e) =>{
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX,mouseY);
    for(let i=0;i<10;i++){
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let radius = getRandomInt(10,50);
        let lineWidth = getRandomInt(1,10);
        // let width = getRandomInt(20,50);
        // let height = getRandomInt(20,50);
        let color = getRandomColor();
        let color2 = getRandomColor();
        // drawRectangle(ctx,x,y,width,height,color);
        drawArc(ctx,x,y,radius,color,lineWidth,color2,0,Math.PI * 2)
    }
}

//helpers
const setupUI = () =>{
    document.querySelector("#btnPause").onclick = function(){
        paused = true;
        updateRunning = false;
    };

    document.querySelector("#btnPlay").onclick = function(){
        paused = false;
        if(updateRunning == false)
        {
            updateRunning = true;
            update();
        }
    };

    document.querySelector("#cbRectangles").onclick = function(e){
        createRectangles = e.target.checked;
    }

    document.querySelector("#cbArcs").onclick = function(e){
        createArcs = e.target.checked;
    }

    document.querySelector("#cbLines").onclick = function(e){
        createLines = e.target.checked;
    }

    document.querySelector("#btnClear").onclick = function(){
        drawRectangle(ctx,0,0,640,480,"white");
    }

    canvas.onclick = canvasClicked;
}

init();