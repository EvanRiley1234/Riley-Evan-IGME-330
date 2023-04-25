import { MyBookmark } from "./myBookmark.js";

const bookmarks = [
    {
      text: "Bing",
      url: "https://www.bing.com",
      comments: "Bing is a web search engine owned and operated by Microsoft."
    },
    {
      text: "Google",
      url: "https://www.google.com",
      comments: "Google Search is a search engine provided and operated by Google."
    },
    {
      text: "DuckDuckGo",
      url: "https://duckduckgo.com/",
      comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
    }
];

window.onload = () => {
    const html = bookmarks.map(site =>`<li><my-bookmark data-text="${site.text}" data-url="${site.url}" data-comments="${site.comments}"><my-bookmark></li>`).join("");
    document.querySelector("#bookmarks").innerHTML = html;
}

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