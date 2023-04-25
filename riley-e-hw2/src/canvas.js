/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;
let circleLine, circleLine2;
let triangles;
let rat1,rat2,rat3,rat4;
let ratSpritesheet;
let vibeCircle1, vibeCircle2;
ratSpritesheet = new Image();
ratSpritesheet.src = './media/rat and bat spritesheet calciumtrice.png';
const imageurl = './media/CityBackground.jpg';


const setupCanvas = (canvasElement,analyserNodeRef) =>{
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"blue"},{percent:1,color:"magenta"}]);
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize/2);	
    circleLine = new ballExplosion(5,50,"red","top");
    circleLine2 = new ballExplosion(5,50,"red","bottom");
    triangles = new triangleSpin(400,200,9,100,"red");
    vibeCircle1 = new vibeCircles(audioData, canvasHeight/5, 200, 200);
    vibeCircle2 = new vibeCircles(audioData, canvasHeight/5, 600, 200);
    
    rat1 = new Animator(ratSpritesheet, 200, 200, 10, 1, 10, canvasWidth);
    rat2 = new Animator(ratSpritesheet, 100, 300, 10, 1, 10, canvasWidth);
    rat3 = new Animator(ratSpritesheet, 0, 100, 10, 1, 10, canvasWidth);
    rat4 = new Animator(ratSpritesheet, 300, 0, 10, 1, 10, canvasWidth);
}

const draw = (params={}) =>{
    let img = new Image();
    img.src = imageurl;
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
    if(params.showFrequency){
        analyserNode.getByteFrequencyData(audioData);
    }
    else if(params.showWaveform)
    {``
        analyserNode.getByteTimeDomainData(audioData); // waveform data
    }
    //defaults to frequency data
    else{
        analyserNode.getByteFrequencyData(audioData);
    }
	
	// 2 - draw background
	ctx.save();
    ctx.drawImage(img,0,0, canvasWidth, canvasHeight);
    ctx.restore();
		
    //draw other sprites
    if(params.showCircles){
        ctx.save();
        circleLine.draw(ctx,audioData);
        circleLine2.draw(ctx,audioData);
        vibeCircle1.draw(ctx);
        vibeCircle2.draw(ctx);
        ctx.restore();
    }
    if(params.showTriangles){
        ctx.save();
        triangles.draw(ctx,audioData);
        ctx.restore();
    }
    if(params.showRats){
        ctx.save();
        rat1.y = (canvasHeight - 150) - audioData[0];
        rat2.y = (canvasHeight - 250) - audioData[1];
        rat3.y = (canvasHeight - 350) - audioData[2];
        rat4.y = (canvasHeight - 400) - audioData[3];
        rat1.draw(ctx);
        rat1.update();
        rat2.draw(ctx);
        rat2.update();
        rat3.draw(ctx);
        rat3.update();
        rat4.draw(ctx);
        rat4.update();
        ctx.restore();
    }

    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array 
	let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for(let i = 0; i < length; i +=4){
		// C) randomly change every 20th pixel to red
        if(params.showNoise && Math.random() < .05){
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
			data[i] = data[i+1] = data[i+2] = 0;// zero out the red and green and blue channels
			data[i+2] = 255;// make the red channel 100% red
	    } // end if

        if(params.showInvert){
            let red = data[i], green = data[i+1],blue = data[i+2];
            data[i] = 255 - red;
            data[i+1] = 255 - green;
            data[i+2] = 255 - blue;
        }
	} // end for
	
    if(params.showEmboss){
        for(let i = 0; i < length; i ++){
            if(i%4 == 3) continue; //skip alpha channel
            data[i] = 127 + 2*data[i] - data[i+4] - data[i + width*4];
        }
    }
	// D) copy image data back to canvas
    ctx.putImageData(imageData,0,0);
}

//sprite classes
class triangleSpin{
    constructor(centerX, centerY, numTriangles, sideLength, color){
        this.centerX = centerX;
        this.centerY = centerY;
        this.numTriangles = numTriangles;
        this.sideLength = sideLength;
        this.color = color;
    }      

    dtr = (degrees) =>{
        return degrees * (Math.PI/180);
    }

    drawTriangle =(ctx,x,y,sideLength,rotation,strokestyle,linewidth) =>{
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(rotation);
        ctx.strokeStyle = strokestyle;
        ctx.fillStyle="red";
        ctx.lineWidth= linewidth;
        ctx.beginPath();
        ctx.moveTo(0, 0 - sideLength/2);
        ctx.lineTo(sideLength/2, sideLength/2);
        ctx.lineTo(0-sideLength/2,sideLength/2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    draw = (ctx,data) =>{
        for(let i = 0; i < this.numTriangles;i++){
            if(i%3 == 1){
                this.color = "blue";
            }
            else if(i%3 == 2){
                this.color = "black";
            }
            else{
                this.color = "magenta";
            }
            this.drawTriangle(ctx,this.centerX,this.centerY,this.sideLength,data[i]*(360/this.numTriangles),this.color,10);
        }
    }
}

class ballExplosion{
    constructor(petalSize, numPetals, color, toporbottom){
        this.petalSize = petalSize;
        this.numPetals = numPetals;
        this.color = color;
        this.toporbottom = toporbottom;
    }    

    drawCircle = (ctx,x,y,radius,color) =>{
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    dtr = (degrees) =>{
        return degrees * (Math.PI/180);
    }

    draw = (ctx,data) =>{
        for(let i = 0; i<this.numPetals; i++)
        {
            if(i%3 == 1){
                this.color = "blue";
            }
            else if(i%3 == 2){
                this.color = "black";
            }
            else{
                this.color = "magenta";
            }

            if(this.toporbottom == "top"){
                this.drawCircle(ctx,i * canvasWidth/this.numPetals,data[i],this.petalSize,this.color)
            }
            else if(this.toporbottom == "bottom"){
                this.drawCircle(ctx,i * canvasWidth/this.numPetals,canvasHeight - data[i],this.petalSize,this.color)
            }
        }
    }
}

class Animator{
    constructor(spritesheet, x, y, maxframeX, maxframeY, maxframes, canvasWidth)
    {
        this.spritesheet = spritesheet;
        this.spriteheight = 33; //need to set
        this.spritewidth = 32; //need to set
        this.x = x;
        this.y = y;
        this.maxframeX = maxframeX;
        this.maxframeY = maxframeY;
        this.maxframes = maxframes;
        this.startX = 0;
        this.startY = 3;
        this.frameX = 0;
        this.frameY = 3;
        this.currentFrame = 0;
        this.width = 100;
        this.height = 100;
        this.canvasWidth = canvasWidth;
    }

    draw = (ctx) =>{
        ctx.drawImage(this.spritesheet, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x,this.y,this.width, this.height);
    }

    update = () =>{
        if(this.frameX < this.maxframeX)
        {
            this.frameX ++;
        }
        else
        {
            this.frameX = 0;
        }
        this.x -= 10;
        if(this.x < -32)
        {
            this.x = this.canvasWidth;
        }
    }
}

class vibeCircles{
    constructor(data, maxRadius, centerX, centerY){
        this.data = data;
        this.maxRadius = maxRadius;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    drawCircle = (ctx,x,y,radius,color) =>{
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    dtr = (degrees) =>{
        return degrees * (Math.PI/180);
    }

    draw = (ctx) =>{
        ctx.save();
        for(let i = 0; i < this.data.length; i ++){
            let percent = audioData[i]/255;
            let circleRadius = percent * this.maxRadius;
            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius, utils.makeColor(0,0,255, .34 - percent/3.0));
            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius*1.5, utils.makeColor(255,0,255, .10 - percent/3.0));
            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius*.5, utils.makeColor(0,0,0, .5 - percent/3.0));
        }
        ctx.restore();
    }
}

export {setupCanvas,draw};