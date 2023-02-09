import {randomElement} from "./utils.js";

let words1 = [];

let words2 = [];

let words3 = [];

const generate = () =>{
    const str = randomElement(words1) + " " + randomElement(words2) + " " + randomElement(words3);
    document.querySelector("#output").innerHTML = str;
}

const loadJsonXHR = () =>{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const string = e.target.responseText;
        const json = JSON.parse(string);
        words1 = json.words1;
        words2 = json.words2;
        words3 = json.words3;
        generate();
    };
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

const init = () =>{
    loadJsonXHR();
    document.querySelector("#my-button").onclick = generate;
    document.querySelector("#big-screen-button").onclick = generate;
}

init();
