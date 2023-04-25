/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"analyserNode\": () => (/* binding */ analyserNode),\n/* harmony export */   \"audioCtx\": () => (/* binding */ audioCtx),\n/* harmony export */   \"highshelf\": () => (/* binding */ highshelf),\n/* harmony export */   \"loadSoundFile\": () => (/* binding */ loadSoundFile),\n/* harmony export */   \"lowshelf\": () => (/* binding */ lowshelf),\n/* harmony export */   \"pauseCurrentSound\": () => (/* binding */ pauseCurrentSound),\n/* harmony export */   \"playCurrentSound\": () => (/* binding */ playCurrentSound),\n/* harmony export */   \"setHighShelf\": () => (/* binding */ setHighShelf),\n/* harmony export */   \"setLowShelf\": () => (/* binding */ setLowShelf),\n/* harmony export */   \"setVolume\": () => (/* binding */ setVolume),\n/* harmony export */   \"setupWebaudio\": () => (/* binding */ setupWebaudio),\n/* harmony export */   \"toggleHighshelf\": () => (/* binding */ toggleHighshelf),\n/* harmony export */   \"toggleLowshelf\": () => (/* binding */ toggleLowshelf)\n/* harmony export */ });\n// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**\r\nlet audioCtx;\r\nlet biquadFilter;\r\nlet lowShelfBiquadFilter;\r\nlet highshelf = false;\r\nlet lowshelf = false;\r\n\r\n// **These are \"private\" properties - these will NOT be visible outside of this module (i.e. file)**\r\n// 2 - WebAudio nodes that are part of our WebAudio audio routing graph\r\nlet element, sourceNode, analyserNode, gainNode, bassFilter, trebleFilter;\r\n\r\n// 3 - here we are faking an enumeration\r\nconst DEFAULTS = Object.freeze({\r\n    gain : .5,\r\n    numSamples : 256\r\n});\r\n\r\n// 4 - create a new array of 8-bit integers (0-255)\r\n// this is a typed array to hold the audio frequency data\r\nlet audioData = new Uint8Array(DEFAULTS.numSamples/2);\r\n\r\n// **Next are \"public\" methods - we are going to export all of these at the bottom of this file**\r\nconst setupWebaudio = (filepath) =>{\r\n    // 1 - The || is because WebAudio has not been standardized across browsers yet\r\n    const AudioContext = window.AudioContext || window.webkitAudioContext;\r\n    audioCtx = new AudioContext();\r\n\r\n    //biquad filter\r\n    biquadFilter = audioCtx.createBiquadFilter();\r\n    biquadFilter.type = \"highshelf\";\r\n    lowShelfBiquadFilter = audioCtx.createBiquadFilter();\r\n    lowShelfBiquadFilter.type = \"lowshelf\";\r\n\r\n    // 2 - this creates an <audio> element\r\n    element = new Audio();\r\n\r\n    // 3 - have it point at a sound file\r\n    loadSoundFile(filepath);\r\n\r\n    // 4 - create an a source node that points at the <audio> element\r\n    sourceNode = audioCtx.createMediaElementSource(element);\r\n\r\n    // 5 - create an analyser node\r\n    analyserNode = audioCtx.createAnalyser();    // note the UK spelling of \"Analyser\"\r\n    /*\r\n    // 6\r\n    We will request DEFAULTS.numSamples number of samples or \"bins\" spaced equally \r\n    across the sound spectrum.\r\n\r\n    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, \r\n    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing \r\n    the amplitude of that frequency.\r\n    */ \r\n\r\n    // fft stands for Fast Fourier Transform\r\n    analyserNode.fftsize = DEFAULTS.numSamples;\r\n\r\n    // 7 - create a gain (volume) node\r\n    gainNode = audioCtx.createGain();\r\n    gainNode.gain.value = DEFAULTS.gain;\r\n\r\n    // 8 - connect the nodes - we now have an audio graph\r\n\r\n    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n      biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n    lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n    lowShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n\r\n    sourceNode.connect(analyserNode);\r\n    analyserNode.connect(lowShelfBiquadFilter);\r\n    lowShelfBiquadFilter.connect(biquadFilter);\r\n    biquadFilter.connect(gainNode);\r\n    gainNode.connect(audioCtx.destination);\r\n\r\n}\r\n\r\nconst loadSoundFile = (filepath) =>{\r\n    element.src = filepath;\r\n}\r\n\r\nconst playCurrentSound = () =>{\r\n    element.play();\r\n}\r\n\r\nconst pauseCurrentSound = () =>{\r\n    element.pause();\r\n}\r\n\r\nconst toggleHighshelf = () =>{\r\n    if(highshelf){\r\n      highshelf = false;\r\n      biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n      biquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);\r\n    }else{\r\n      highshelf = true;\r\n      biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n    }\r\n}\r\n\r\nconst toggleLowshelf = () =>{\r\n    if(lowshelf){\r\n      lowshelf = false;\r\n      lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);\r\n      lowShelfBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);\r\n    }else{\r\n      lowshelf = true;\r\n      lowShelfBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);\r\n    }\r\n}\r\n\r\nconst setHighShelf = (value) =>{\r\n    value = Number(value);\r\n    biquadFilter.gain.setValueAtTime(value, audioCtx.currentTime);\r\n    console.log(value);\r\n}\r\n\r\n\r\nconst setLowShelf = (value) =>{\r\n    value = Number(value);\r\n    lowShelfBiquadFilter.gain.setValueAtTime(value, audioCtx.currentTime);\r\n    console.log(value);\r\n}\r\n\r\nconst setVolume = (value) =>{\r\n    value = Number(value); // make sure that it's a Number rather than a String\r\n    gainNode.gain.value = value;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://riley-e-hw2/./src/audio.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"draw\": () => (/* binding */ draw),\n/* harmony export */   \"setupCanvas\": () => (/* binding */ setupCanvas)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/*\r\n\tThe purpose of this file is to take in the analyser node and a <canvas> element: \r\n\t  - the module will create a drawing context that points at the <canvas> \r\n\t  - it will store the reference to the analyser node\r\n\t  - in draw(), it will loop through the data in the analyser node\r\n\t  - and then draw something representative on the canvas\r\n\t  - maybe a better name for this file/module would be *visualizer.js* ?\r\n*/\r\n\r\n\r\n\r\nlet ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;\r\nlet circleLine, circleLine2;\r\nlet triangles;\r\nlet rat1,rat2,rat3,rat4;\r\nlet ratSpritesheet;\r\nlet vibeCircle1, vibeCircle2;\r\nratSpritesheet = new Image();\r\nratSpritesheet.src = './media/rat and bat spritesheet calciumtrice.png';\r\nconst imageurl = './media/CityBackground.jpg';\r\n\r\n\r\nconst setupCanvas = (canvasElement,analyserNodeRef) =>{\r\n\t// create drawing context\r\n\tctx = canvasElement.getContext(\"2d\");\r\n\tcanvasWidth = canvasElement.width;\r\n\tcanvasHeight = canvasElement.height;\r\n\t// create a gradient that runs top to bottom\r\n\tgradient = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:\"blue\"},{percent:1,color:\"magenta\"}]);\r\n\t// keep a reference to the analyser node\r\n\tanalyserNode = analyserNodeRef;\r\n\t// this is the array where the analyser data will be stored\r\n    audioData = new Uint8Array(analyserNode.fftSize/2);\t\r\n    circleLine = new ballExplosion(5,50,\"red\",\"top\");\r\n    circleLine2 = new ballExplosion(5,50,\"red\",\"bottom\");\r\n    triangles = new triangleSpin(400,200,9,100,\"red\");\r\n    vibeCircle1 = new vibeCircles(audioData, canvasHeight/5, 200, 200);\r\n    vibeCircle2 = new vibeCircles(audioData, canvasHeight/5, 600, 200);\r\n    \r\n    rat1 = new Animator(ratSpritesheet, 200, 200, 10, 1, 10, canvasWidth);\r\n    rat2 = new Animator(ratSpritesheet, 100, 300, 10, 1, 10, canvasWidth);\r\n    rat3 = new Animator(ratSpritesheet, 0, 100, 10, 1, 10, canvasWidth);\r\n    rat4 = new Animator(ratSpritesheet, 300, 0, 10, 1, 10, canvasWidth);\r\n}\r\n\r\nconst draw = (params={}) =>{\r\n    let img = new Image();\r\n    img.src = imageurl;\r\n  // 1 - populate the audioData array with the frequency data from the analyserNode\r\n\t// notice these arrays are passed \"by reference\" \r\n    if(params.showFrequency){\r\n        analyserNode.getByteFrequencyData(audioData);\r\n    }\r\n    else if(params.showWaveform)\r\n    {``\r\n        analyserNode.getByteTimeDomainData(audioData); // waveform data\r\n    }\r\n    //defaults to frequency data\r\n    else{\r\n        analyserNode.getByteFrequencyData(audioData);\r\n    }\r\n\t\r\n\t// 2 - draw background\r\n\tctx.save();\r\n    ctx.drawImage(img,0,0, canvasWidth, canvasHeight);\r\n    ctx.restore();\r\n\t\t\r\n    //draw other sprites\r\n    if(params.showCircles){\r\n        ctx.save();\r\n        circleLine.draw(ctx,audioData);\r\n        circleLine2.draw(ctx,audioData);\r\n        vibeCircle1.draw(ctx);\r\n        vibeCircle2.draw(ctx);\r\n        ctx.restore();\r\n    }\r\n    if(params.showTriangles){\r\n        ctx.save();\r\n        triangles.draw(ctx,audioData);\r\n        ctx.restore();\r\n    }\r\n    if(params.showRats){\r\n        ctx.save();\r\n        rat1.y = (canvasHeight - 150) - audioData[0];\r\n        rat2.y = (canvasHeight - 250) - audioData[1];\r\n        rat3.y = (canvasHeight - 350) - audioData[2];\r\n        rat4.y = (canvasHeight - 400) - audioData[3];\r\n        rat1.draw(ctx);\r\n        rat1.update();\r\n        rat2.draw(ctx);\r\n        rat2.update();\r\n        rat3.draw(ctx);\r\n        rat3.update();\r\n        rat4.draw(ctx);\r\n        rat4.update();\r\n        ctx.restore();\r\n    }\r\n\r\n    // 6 - bitmap manipulation\r\n\t// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), \r\n\t// regardless of whether or not we are applying a pixel effect\r\n\t// At some point, refactor this code so that we are looping though the image data only if\r\n\t// it is necessary\r\n\r\n\t// A) grab all of the pixels on the canvas and put them in the `data` array\r\n\t// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!\r\n\t// the variable `data` below is a reference to that array \r\n\tlet imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);\r\n    let data = imageData.data;\r\n    let length = data.length;\r\n    let width = imageData.width; // not using here\r\n\t// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)\r\n    for(let i = 0; i < length; i +=4){\r\n\t\t// C) randomly change every 20th pixel to red\r\n        if(params.showNoise && Math.random() < .05){\r\n\t\t\t// data[i] is the red channel\r\n\t\t\t// data[i+1] is the green channel\r\n\t\t\t// data[i+2] is the blue channel\r\n\t\t\t// data[i+3] is the alpha channel\r\n\t\t\tdata[i] = data[i+1] = data[i+2] = 0;// zero out the red and green and blue channels\r\n\t\t\tdata[i+2] = 255;// make the red channel 100% red\r\n\t    } // end if\r\n\r\n        if(params.showInvert){\r\n            let red = data[i], green = data[i+1],blue = data[i+2];\r\n            data[i] = 255 - red;\r\n            data[i+1] = 255 - green;\r\n            data[i+2] = 255 - blue;\r\n        }\r\n\t} // end for\r\n\t\r\n    if(params.showEmboss){\r\n        for(let i = 0; i < length; i ++){\r\n            if(i%4 == 3) continue; //skip alpha channel\r\n            data[i] = 127 + 2*data[i] - data[i+4] - data[i + width*4];\r\n        }\r\n    }\r\n\t// D) copy image data back to canvas\r\n    ctx.putImageData(imageData,0,0);\r\n}\r\n\r\n//sprite classes\r\nclass triangleSpin{\r\n    constructor(centerX, centerY, numTriangles, sideLength, color){\r\n        this.centerX = centerX;\r\n        this.centerY = centerY;\r\n        this.numTriangles = numTriangles;\r\n        this.sideLength = sideLength;\r\n        this.color = color;\r\n    }      \r\n\r\n    dtr = (degrees) =>{\r\n        return degrees * (Math.PI/180);\r\n    }\r\n\r\n    drawTriangle =(ctx,x,y,sideLength,rotation,strokestyle,linewidth) =>{\r\n        ctx.save();\r\n        ctx.translate(x,y);\r\n        ctx.rotate(rotation);\r\n        ctx.strokeStyle = strokestyle;\r\n        ctx.fillStyle=\"red\";\r\n        ctx.lineWidth= linewidth;\r\n        ctx.beginPath();\r\n        ctx.moveTo(0, 0 - sideLength/2);\r\n        ctx.lineTo(sideLength/2, sideLength/2);\r\n        ctx.lineTo(0-sideLength/2,sideLength/2);\r\n        ctx.closePath();\r\n        ctx.stroke();\r\n        ctx.restore();\r\n    }\r\n\r\n    draw = (ctx,data) =>{\r\n        for(let i = 0; i < this.numTriangles;i++){\r\n            if(i%3 == 1){\r\n                this.color = \"blue\";\r\n            }\r\n            else if(i%3 == 2){\r\n                this.color = \"black\";\r\n            }\r\n            else{\r\n                this.color = \"magenta\";\r\n            }\r\n            this.drawTriangle(ctx,this.centerX,this.centerY,this.sideLength,data[i]*(360/this.numTriangles),this.color,10);\r\n        }\r\n    }\r\n}\r\n\r\nclass ballExplosion{\r\n    constructor(petalSize, numPetals, color, toporbottom){\r\n        this.petalSize = petalSize;\r\n        this.numPetals = numPetals;\r\n        this.color = color;\r\n        this.toporbottom = toporbottom;\r\n    }    \r\n\r\n    drawCircle = (ctx,x,y,radius,color) =>{\r\n        ctx.save();\r\n        ctx.fillStyle = color;\r\n        ctx.beginPath();\r\n        ctx.arc(x,y,radius,0,Math.PI * 2);\r\n        ctx.closePath();\r\n        ctx.fill();\r\n        ctx.restore();\r\n    }\r\n\r\n    dtr = (degrees) =>{\r\n        return degrees * (Math.PI/180);\r\n    }\r\n\r\n    draw = (ctx,data) =>{\r\n        for(let i = 0; i<this.numPetals; i++)\r\n        {\r\n            if(i%3 == 1){\r\n                this.color = \"blue\";\r\n            }\r\n            else if(i%3 == 2){\r\n                this.color = \"black\";\r\n            }\r\n            else{\r\n                this.color = \"magenta\";\r\n            }\r\n\r\n            if(this.toporbottom == \"top\"){\r\n                this.drawCircle(ctx,i * canvasWidth/this.numPetals,data[i],this.petalSize,this.color)\r\n            }\r\n            else if(this.toporbottom == \"bottom\"){\r\n                this.drawCircle(ctx,i * canvasWidth/this.numPetals,canvasHeight - data[i],this.petalSize,this.color)\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass Animator{\r\n    constructor(spritesheet, x, y, maxframeX, maxframeY, maxframes, canvasWidth)\r\n    {\r\n        this.spritesheet = spritesheet;\r\n        this.spriteheight = 33; //need to set\r\n        this.spritewidth = 32; //need to set\r\n        this.x = x;\r\n        this.y = y;\r\n        this.maxframeX = maxframeX;\r\n        this.maxframeY = maxframeY;\r\n        this.maxframes = maxframes;\r\n        this.startX = 0;\r\n        this.startY = 3;\r\n        this.frameX = 0;\r\n        this.frameY = 3;\r\n        this.currentFrame = 0;\r\n        this.width = 100;\r\n        this.height = 100;\r\n        this.canvasWidth = canvasWidth;\r\n    }\r\n\r\n    draw = (ctx) =>{\r\n        ctx.drawImage(this.spritesheet, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x,this.y,this.width, this.height);\r\n    }\r\n\r\n    update = () =>{\r\n        if(this.frameX < this.maxframeX)\r\n        {\r\n            this.frameX ++;\r\n        }\r\n        else\r\n        {\r\n            this.frameX = 0;\r\n        }\r\n        this.x -= 10;\r\n        if(this.x < -32)\r\n        {\r\n            this.x = this.canvasWidth;\r\n        }\r\n    }\r\n}\r\n\r\nclass vibeCircles{\r\n    constructor(data, maxRadius, centerX, centerY){\r\n        this.data = data;\r\n        this.maxRadius = maxRadius;\r\n        this.centerX = centerX;\r\n        this.centerY = centerY;\r\n    }\r\n\r\n    drawCircle = (ctx,x,y,radius,color) =>{\r\n        ctx.save();\r\n        ctx.fillStyle = color;\r\n        ctx.beginPath();\r\n        ctx.arc(x,y,radius,0,Math.PI * 2);\r\n        ctx.closePath();\r\n        ctx.fill();\r\n        ctx.restore();\r\n    }\r\n\r\n    dtr = (degrees) =>{\r\n        return degrees * (Math.PI/180);\r\n    }\r\n\r\n    draw = (ctx) =>{\r\n        ctx.save();\r\n        for(let i = 0; i < this.data.length; i ++){\r\n            let percent = audioData[i]/255;\r\n            let circleRadius = percent * this.maxRadius;\r\n            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius, _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(0,0,255, .34 - percent/3.0));\r\n            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius*1.5, _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(255,0,255, .10 - percent/3.0));\r\n            this.drawCircle(ctx, this.centerX, this.centerY, circleRadius*.5, _utils_js__WEBPACK_IMPORTED_MODULE_0__.makeColor(0,0,0, .5 - percent/3.0));\r\n        }\r\n        ctx.restore();\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://riley-e-hw2/./src/canvas.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio.js */ \"./src/audio.js\");\n/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas.js */ \"./src/canvas.js\");\n/*\r\n\tmain.js is primarily responsible for hooking up the UI to the rest of the application \r\n\tand setting up the main event loop\r\n*/\r\n\r\n// We will write the functions in this file in the traditional ES5 way\r\n// In this instance, we feel the code is more readable if written this way\r\n// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!\r\n\r\n\r\n\r\n\r\n\r\nconst drawParams = {\r\n  showGradient : true,\r\n  showBars : true,\r\n  showCircles : true,\r\n  showNoise : true,\r\n  showInvert : true,\r\n  showEmboss : true,\r\n  showFrequency : true,\r\n  showWaveform : true,\r\n  showRats : true,\r\n  showTriangles : true\r\n}\r\n\r\nlet html;\r\n// 1 - here we are faking an enumeration\r\nconst DEFAULTS = Object.freeze({\r\n\tsound1  :  \"media/KUWAGO - Toybox5 - 01 Do you wanna funk.mp3\"\r\n});\r\n\r\nconst init = () =>{\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.setupWebaudio(DEFAULTS.sound1);\r\n    console.log(\"init called\");\r\n    console.log(`Testing utils.getRandomColor() import: ${_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomColor()}`);\r\n    let canvasElement = document.querySelector(\"canvas\"); // hookup <canvas> element\r\n    setupUI(canvasElement);\r\n    _canvas_js__WEBPACK_IMPORTED_MODULE_2__.setupCanvas(canvasElement,_audio_js__WEBPACK_IMPORTED_MODULE_1__.analyserNode);\r\n    loop();\r\n}\r\n\r\nconst setupUI = (canvasElement) =>{\r\n  // A - hookup fullscreen button\r\n  const fsButton = document.querySelector(\"#btn-fs\");\r\n  const playButton = document.querySelector(\"#btn-play\");\r\n\t\r\n  // add .onclick event to button\r\n  fsButton.onclick = e => {\r\n    console.log(\"init called\");\r\n    _utils_js__WEBPACK_IMPORTED_MODULE_0__.goFullscreen(canvasElement);\r\n  };\r\n\t\r\n  // add .onclick event to button\r\n  playButton.onclick = e =>{\r\n    console.log(`audioCtx.state before = ${_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state}`);\r\n\r\n    //check if context is in suspended state (autoplay policy)\r\n    if(_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state == \"suspended\"){\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.resume();\r\n    }\r\n    console.log(`audioCtx.state after = ${_audio_js__WEBPACK_IMPORTED_MODULE_1__.audioCtx.state}`);\r\n    if(e.target.dataset.playing == \"no\"){\r\n        //if track is currently paused play it\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.playCurrentSound();\r\n        e.target.dataset.playing = \"yes\"; //our CCS will set the text to \"Pause\"\r\n        // of track IS playing pause it\r\n    }else{\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_1__.pauseCurrentSound();\r\n        e.target.dataset.playing = \"no\"; //our CCS will set the text to \"Play\"\r\n    }\r\n  };\r\n\r\n  // C - hookup volume slider & label\r\n  let volumeSlider = document.querySelector(\"#slider-volume\");\r\n  let volumeLabel = document.querySelector(\"#label-volume\");\r\n\r\n  //add .oninput event to slider\r\n  volumeSlider.oninput = e => {\r\n    //set the gain\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.setVolume(e.target.value);\r\n    //update value of label to match value of slider\r\n    volumeLabel.innerHTML = Math.round((e.target.value/2*100));\r\n  };\r\n\r\n  volumeSlider.dispatchEvent(new Event(\"input\"));\r\n\r\n  let trebleSlider = document.querySelector(\"#slider-treble\");\r\n  let trebleLabel = document.querySelector(\"#label-treble\");\r\n\r\n  trebleSlider.oninput = e => {\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.setHighShelf((e.target.value/2*20));\r\n    trebleLabel.innerHTML = Math.round((e.target.value/2*100));\r\n  }\r\n  \r\n  trebleSlider.dispatchEvent(new Event(\"input\"));\r\n\r\n  let bassSlider = document.querySelector(\"#slider-bass\");\r\n  let bassLabel = document.querySelector(\"#label-bass\")\r\n\r\n  bassSlider.oninput = e => {\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.setLowShelf((e.target.value/2*20));\r\n    bassLabel.innerHTML = Math.round((e.target.value/2*100));\r\n  }\r\n\r\n  bassSlider.dispatchEvent(new Event(\"input\"));\r\n\r\n  //D - hookup track <select>\r\n  let trackSelect = document.querySelector(\"#select-track\");\r\n  // add .onchange event to <select>\r\n  trackSelect.onchange = e => {\r\n    _audio_js__WEBPACK_IMPORTED_MODULE_1__.loadSoundFile(e.target.value);\r\n    console.log(e.target.value);\r\n    //pause the current trick if it is playing\r\n    if(playButton.dataset.playing == \"yes\"){\r\n        playButton.dispatchEvent(new MouseEvent(\"click\"));\r\n    }\r\n  };\r\n\r\n  //check boxes\r\n  document.querySelector(\"#show-gradient\").onclick = function(e){\r\n    drawParams.showGradient = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-circles\").onclick = function(e){\r\n    drawParams.showCircles = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-triangles\").onclick = function(e){\r\n    drawParams.showTriangles = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-rats\").onclick = function(e){\r\n    drawParams.showRats = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-noise\").checked = false;\r\n  drawParams.showNoise = false;\r\n\r\n  document.querySelector(\"#show-noise\").onclick = function(e){\r\n    drawParams.showNoise = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-invert\").checked = false;\r\n  drawParams.showInvert = false;\r\n\r\n  document.querySelector(\"#show-invert\").onclick = function(e){\r\n    drawParams.showInvert = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-emboss\").checked = false;\r\n  drawParams.showEmboss = false;\r\n\r\n  document.querySelector(\"#show-emboss\").onclick = function(e){\r\n    drawParams.showEmboss = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-frequency\").onclick = function(e){\r\n    drawParams.showFrequency = e.target.checked;\r\n  }\r\n\r\n  document.querySelector(\"#show-waveform\").checked = false;\r\n  drawParams.showWaveform = false;\r\n\r\n  document.querySelector(\"#show-waveform\").onclick = function(e){\r\n    drawParams.showWaveform = e.target.checked;\r\n  }\r\n\r\n  // //highshelf and lowshelf\r\n  // document.querySelector('#cb-highshelf').checked = audio.highshelf;\r\n  // document.querySelector('#cb-highshelf').onchange = e => {\r\n  //   audio.toggleHighshelf();\r\n  // };\r\n  // audio.toggleHighshelf()\r\n\r\n  // document.querySelector('#cb-lowshelf').checked = audio.lowshelf;\r\n  // document.querySelector('#cb-lowshelf').onchange = e => {\r\n  //   audio.toggleLowshelf();\r\n  // };\r\n  // audio.toggleLowshelf();\r\n\r\n  //use json file to load track names\r\n  function loadJSONXHR(){\r\n    const url = \"data/av-data.json\";\r\n    const xhr = new XMLHttpRequest();\r\n    xhr.onload = (e) => {\r\n        console.log(`In onload - HTTP Status Code = ${e.target.status}`);\r\n        const text = e.target.responseText;\r\n        const lines = text.split(\"\\n\");\r\n        console.log(lines.length);\r\n        const track1 = lines[4].split(\",\");\r\n        const track2 = lines[5].split(\",\");\r\n        const track3 = lines[6].split(\",\");\r\n        const track4 = lines[7].split(\",\");\r\n        const track5 = lines[8].split(\",\");\r\n        const track6 = lines[9].split(\",\");\r\n        const track7 = lines[10].split(\",\");\r\n        const track8 = lines[11].split(\",\");\r\n        const track1html = `<option value=\"media/KUWAGO - Toybox5 - 01 Do you wanna funk.mp3\" selected>${track1}</option>`;\r\n        const track2html = `<option value=\"media/KUWAGO - Toybox5 - 02 Swinging.mp3\">${track2}</option>`;\r\n        const track3html = `<option value=\"media/KUWAGO - Toybox5 - 03 Mystery POP.mp3\">${track3}</option>`;\r\n        const track4html = `<option value=\"media/KUWAGO - Toybox5 - 04 Step By Step.mp3\">${track4}</option>`;\r\n        const track5html = `<option value=\"media/KUWAGO - Toybox5 - 05 Ready.mp3\">${track5}</option>`;\r\n        const track6html = `<option value=\"media/KUWAGO - Toybox5 - 06 Flash Beat.mp3\">${track6}</option>`;\r\n        const track7html = `<option value=\"media/KUWAGO - Toybox5 - 07 In the Morning.mp3\">${track7}</option>`;\r\n        const track8html = `<option value=\"media/KUWAGO - Toybox5 - 08 Don't stop music.mp3\">${track8}</option>`;\r\n        const html = `\r\n            ${track1html}\r\n            ${track2html}\r\n            ${track3html}\r\n            ${track4html}\r\n            ${track5html}\r\n            ${track6html}\r\n            ${track7html}\r\n            ${track8html}\r\n        `\r\n        document.querySelector(\"#select-track\").innerHTML = html;\r\n    };\r\n    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);\r\n    xhr.open(\"GET\", url);\r\n    xhr.send();\r\n  }\r\n\r\n  loadJSONXHR();\r\n\r\n} // end setupUI\r\n\r\nconst loop = () =>{\r\n  setTimeout(() => {requestAnimationFrame(loop);}, 1000 / 60);\r\n  _canvas_js__WEBPACK_IMPORTED_MODULE_2__.draw(drawParams);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://riley-e-hw2/./src/main.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getLinearGradient\": () => (/* binding */ getLinearGradient),\n/* harmony export */   \"getRandomColor\": () => (/* binding */ getRandomColor),\n/* harmony export */   \"goFullscreen\": () => (/* binding */ goFullscreen),\n/* harmony export */   \"makeColor\": () => (/* binding */ makeColor)\n/* harmony export */ });\nconst makeColor = (red, green, blue, alpha = 1) => {\r\n    return `rgba(${red},${green},${blue},${alpha})`;\r\n  };\r\n  \r\n  const getRandom = (min, max) => {\r\n    return Math.random() * (max - min) + min;\r\n  };\r\n  \r\n  const getRandomColor = () => {\r\n    const floor = 35; // so that colors are not too bright or too dark \r\n    const getByte = () => getRandom(floor,255-floor);\r\n    return `rgba(${getByte()},${getByte()},${getByte()},1)`;\r\n  };\r\n  \r\n  const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) => {\r\n    let lg = ctx.createLinearGradient(startX,startY,endX,endY);\r\n    for(let stop of colorStops){\r\n      lg.addColorStop(stop.percent,stop.color);\r\n    }\r\n    return lg;\r\n  };\r\n  \r\n  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API\r\n  const goFullscreen = (element) => {\r\n    if (element.requestFullscreen) {\r\n      element.requestFullscreen();\r\n    } else if (element.mozRequestFullscreen) {\r\n      element.mozRequestFullscreen();\r\n    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec\r\n      element.mozRequestFullScreen();\r\n    } else if (element.webkitRequestFullscreen) {\r\n      element.webkitRequestFullscreen();\r\n    }\r\n    // .. and do nothing if the method is not supported\r\n  };\r\n  \r\n  \n\n//# sourceURL=webpack://riley-e-hw2/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;