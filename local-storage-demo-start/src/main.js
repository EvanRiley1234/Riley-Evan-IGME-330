import * as storage from "./storage.js"
let items = ["???!!!"];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
let showItems = () =>{
    let html = "";
    for(w in items){
        html += `<li>${w}</li>`
    }
    document.querySelector("#ol").innerHTML = html;
}
// II. declare and implement addItem(str)
// - this will add str to the items array (so long as str is length 0 or greater)
let additem = (str) =>{
    if(str != null){
        items.push(`${str}`);
    }
}
// III. declare and implement loadItemsFromLocalStorage()
// - this will load in the favorites array from storage.js
let loadItemsFromLocalStorage = () =>{

}
// Also:
// - be sure to update the <ul> as appropriate
// - be sure to update .localStorage by saving items to .localStorage when appropriate (look in storage.js to see where/how to do this)
