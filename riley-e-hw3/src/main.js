import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";

// const bookmarks = [
//     {
//       text: "Bing",
//       url: "https://www.bing.com",
//       comments: "Bing is a web search engine owned and operated by Microsoft."
//     },
//     {
//       text: "Google",
//       url: "https://www.google.com",
//       comments: "Google Search is a search engine provided and operated by Google."
//     },
//     {
//       text: "DuckDuckGo",
//       url: "https://duckduckgo.com/",
//       comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
//     }
// ];

// window.onload = () => {
//     const html = bookmarks.map(site =>`<li><my-bookmark data-text="${site.text}" data-url="${site.url}" data-comments="${site.comments}"><my-bookmark></li>`).join("");
//     document.querySelector("#bookmarks").innerHTML = html;
// }

// window.onload = () => {
//     // Create a MyBookmark and add it to the list
//     const bing = document.createElement("my-bookmark");

//     // ANOTHER way to set custom attributes, the .dataset property
//     // note that these 2 lines of code will also trigger attributeChangedCallback()
//     bing.dataset.text = "Bing";
//     bing.dataset.url = "https://www.bing.com/";

//     const newLI = document.createElement("li");
//     newLI.appendChild(bing);
//     document.querySelector("#bookmarks").appendChild(newLI);
// };

let favorites = [];

//need to fix page refresh issue
let submitClicked = (evt) =>{
  console.log("submitClicked");
  let text = document.querySelector("#favorite-text").value;
  text.trim();
  let url = document.querySelector("#favorite-url").value;
  url.trim();
  let comments = document.querySelector("#favorite-comments").value;
  comments.trim();
  if(text.length > 0 && url.length > 0 && comments.length > 0){
    favorites.push(new Favorite(text, url, comments));
    document.querySelector("#favorite-num").innerHTML = `Number of favorites: ${favorites.length}`;
  }
  else{
    //add error message if fields aren't filled out
    document.querySelector("#submit-warning").innerHTML = "Missing required fields";
  }
  loadFavoritesFromStorage();
  document.querySelector("#favorite-text").value = "";
  document.querySelector("#favorite-url").value = "";
  document.querySelector("#favorite-comments").value = "";
  evt.preventDefault();
  return false;
}

//need to fix page refresh issue
let clearFormFields = (evt) =>{
  console.log("clearFormFields");
  document.querySelector("#favorite-text").value = "";
  document.querySelector("#favorite-url").value = "";
  document.querySelector("#favorite-comments").value = "";
  evt.preventDefault();
  return false;
}

let createBookmarkComponent = (fid, text, url, comments) => {
  // const html = `<li><my-bookmark data-fid="${fid}" data-text="${text}" data-url="${url}" data-comments="${comments}"></my-bookmark></li>`;
  // document.querySelector("#bookmarks").innerHTML = html;

  //second try so that it doesn't replace what already inside
  let newLi = document.createElement("li");
  newLi.innerHTML = `<my-bookmark data-fid="${fid}" data-text="${text}" data-url="${url}" data-comments="${comments}"></my-bookmark>`;
  newLi.callblack = deleteFavorite;
  document.querySelector("#bookmarks").append(newLi);
}

let loadFavoritesFromStorage = () =>{
  document.querySelector("#bookmarks").innerHTML = "";
  favorites.forEach(bookmark => createBookmarkComponent(bookmark.fid, bookmark.text, bookmark.url, bookmark.comments))
}


//looked at array.splice at https://www.freecodecamp.org/news/how-to-remove-an-element-from-a-javascript-array-removing-a-specific-item-in-js/#:~:text=You%20can%20remove%20the%20element,of%20the%20element%20to%20remove.
// and at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
let deleteFavorite = (fid) =>{
  let removalID;
  let loopNum = 0;
  for(let b of favorites){
    if(b.fid = fid)
    {
      removalID = loopNum;
    }
    loopNum ++;
  }
  document.querySelector(`[data-fid="${fid}"]`).deleteThis();
  favorites.splice(removalID, 1);
  document.querySelector("#favorite-num").innerHTML = `Number of favorites: ${favorites.length}`;
}

window.onload = () =>{
  document.querySelector("#favorite-submit-button").onclick = submitClicked;
  document.querySelector("#favorite-cancel-button").onclick = clearFormFields;
  favorites.push(new Favorite("RIT", "https://www.rit.edu", "A private university located near Rochester, NY.", "123"));
  document.querySelector("#favorite-num").innerHTML = `Number of favorites: ${favorites.length}`;
  loadFavoritesFromStorage();
}