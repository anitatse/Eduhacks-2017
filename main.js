// authBaseUrl = 'https://quizlet.com/authorize/'


// seond messages to content.js
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		// alert("POPUP: "+request.highLight);
		document.getElementById("word").innerHTML = request.highLight;
  });

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});