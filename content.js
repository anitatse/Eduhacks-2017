// content.js

//add right click function
// $(document).ready(function(){
// 	$("p").contextmenu(function(){
// 		alert("Hello World!");
// 	})
// });

// function getword(info,tab) {
//   console.log("Word " + info.selectionText + " was clicked.");
//   chrome.tabs.create({  
//     url: "http://www.google.com/search?q=" + info.selectionText,
//   });           
// }
// chrome.contextMenus.create({
//   title: "Search: %s", 
//   contexts:["selection"], 
//   onclick: getword,
// });

// if (confirm('Open dialog for testing?'))
//     chrome.runtime.sendMessage({type:'request_password'});

function saveHighLightedText() {
  var text = document.getSelection().toString();
  if (text != ''){
    chrome.runtime.sendMessage({highLight: text}, function(response){
    	console.log(response.farewell);
    })
  }
}

document.onmouseup = function(){
	saveHighLightedText();
}