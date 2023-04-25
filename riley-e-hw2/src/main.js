/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
  showGradient : true,
  showBars : true,
  showCircles : true,
  showNoise : true,
  showInvert : true,
  showEmboss : true,
  showFrequency : true,
  showWaveform : true,
  showRats : true,
  showTriangles : true
}

let html;
// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/KUWAGO - Toybox5 - 01 Do you wanna funk.mp3"
});

const init = () =>{
    audio.setupWebaudio(DEFAULTS.sound1);
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) =>{
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  const playButton = document.querySelector("#btn-play");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };
	
  // add .onclick event to button
  playButton.onclick = e =>{
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    //check if context is in suspended state (autoplay policy)
    if(audio.audioCtx.state == "suspended"){
        audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if(e.target.dataset.playing == "no"){
        //if track is currently paused play it
        audio.playCurrentSound();
        e.target.dataset.playing = "yes"; //our CCS will set the text to "Pause"
        // of track IS playing pause it
    }else{
        audio.pauseCurrentSound();
        e.target.dataset.playing = "no"; //our CCS will set the text to "Play"
    }
  };

  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  //add .oninput event to slider
  volumeSlider.oninput = e => {
    //set the gain
    audio.setVolume(e.target.value);
    //update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value/2*100));
  };

  volumeSlider.dispatchEvent(new Event("input"));

  let trebleSlider = document.querySelector("#slider-treble");
  let trebleLabel = document.querySelector("#label-treble");

  trebleSlider.oninput = e => {
    audio.setHighShelf((e.target.value/2*20));
    trebleLabel.innerHTML = Math.round((e.target.value/2*100));
  }
  
  trebleSlider.dispatchEvent(new Event("input"));

  let bassSlider = document.querySelector("#slider-bass");
  let bassLabel = document.querySelector("#label-bass")

  bassSlider.oninput = e => {
    audio.setLowShelf((e.target.value/2*20));
    bassLabel.innerHTML = Math.round((e.target.value/2*100));
  }

  bassSlider.dispatchEvent(new Event("input"));

  //D - hookup track <select>
  let trackSelect = document.querySelector("#select-track");
  // add .onchange event to <select>
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    console.log(e.target.value);
    //pause the current trick if it is playing
    if(playButton.dataset.playing == "yes"){
        playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  //check boxes
  document.querySelector("#show-gradient").onclick = function(e){
    drawParams.showGradient = e.target.checked;
  }

  document.querySelector("#show-circles").onclick = function(e){
    drawParams.showCircles = e.target.checked;
  }

  document.querySelector("#show-triangles").onclick = function(e){
    drawParams.showTriangles = e.target.checked;
  }

  document.querySelector("#show-rats").onclick = function(e){
    drawParams.showRats = e.target.checked;
  }

  document.querySelector("#show-noise").checked = false;
  drawParams.showNoise = false;

  document.querySelector("#show-noise").onclick = function(e){
    drawParams.showNoise = e.target.checked;
  }

  document.querySelector("#show-invert").checked = false;
  drawParams.showInvert = false;

  document.querySelector("#show-invert").onclick = function(e){
    drawParams.showInvert = e.target.checked;
  }

  document.querySelector("#show-emboss").checked = false;
  drawParams.showEmboss = false;

  document.querySelector("#show-emboss").onclick = function(e){
    drawParams.showEmboss = e.target.checked;
  }

  document.querySelector("#show-frequency").onclick = function(e){
    drawParams.showFrequency = e.target.checked;
  }

  document.querySelector("#show-waveform").checked = false;
  drawParams.showWaveform = false;

  document.querySelector("#show-waveform").onclick = function(e){
    drawParams.showWaveform = e.target.checked;
  }

  // //highshelf and lowshelf
  // document.querySelector('#cb-highshelf').checked = audio.highshelf;
  // document.querySelector('#cb-highshelf').onchange = e => {
  //   audio.toggleHighshelf();
  // };
  // audio.toggleHighshelf()

  // document.querySelector('#cb-lowshelf').checked = audio.lowshelf;
  // document.querySelector('#cb-lowshelf').onchange = e => {
  //   audio.toggleLowshelf();
  // };
  // audio.toggleLowshelf();

  //use json file to load track names
  function loadJSONXHR(){
    const url = "data/av-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        const lines = text.split("\n");
        console.log(lines.length);
        const track1 = lines[4].split(",");
        const track2 = lines[5].split(",");
        const track3 = lines[6].split(",");
        const track4 = lines[7].split(",");
        const track5 = lines[8].split(",");
        const track6 = lines[9].split(",");
        const track7 = lines[10].split(",");
        const track8 = lines[11].split(",");
        const track1html = `<option value="media/KUWAGO - Toybox5 - 01 Do you wanna funk.mp3" selected>${track1}</option>`;
        const track2html = `<option value="media/KUWAGO - Toybox5 - 02 Swinging.mp3">${track2}</option>`;
        const track3html = `<option value="media/KUWAGO - Toybox5 - 03 Mystery POP.mp3">${track3}</option>`;
        const track4html = `<option value="media/KUWAGO - Toybox5 - 04 Step By Step.mp3">${track4}</option>`;
        const track5html = `<option value="media/KUWAGO - Toybox5 - 05 Ready.mp3">${track5}</option>`;
        const track6html = `<option value="media/KUWAGO - Toybox5 - 06 Flash Beat.mp3">${track6}</option>`;
        const track7html = `<option value="media/KUWAGO - Toybox5 - 07 In the Morning.mp3">${track7}</option>`;
        const track8html = `<option value="media/KUWAGO - Toybox5 - 08 Don't stop music.mp3">${track8}</option>`;
        const html = `
            ${track1html}
            ${track2html}
            ${track3html}
            ${track4html}
            ${track5html}
            ${track6html}
            ${track7html}
            ${track8html}
        `
        document.querySelector("#select-track").innerHTML = html;
    };
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
  }

  loadJSONXHR();

} // end setupUI

const loop = () =>{
  setTimeout(() => {requestAnimationFrame(loop);}, 1000 / 60);
  canvas.draw(drawParams);
}

export {init};