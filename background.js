var highLightedText;
var parentElement;

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Add selected text to Flash cards";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  highLightedText = request.highLight;
  parentElement = request.parentElement;
  // alert(highLightedText);
      sendResponse({farewell: "goodbye"});
});
// document.onmouseup.addListener(saveHighlightedText);

// function saveHighLightedText(e) {
//   console.log("ayyyy");
//   var text = document.getSelection().toString();
//   if (text != ''){
//     alert(text);
//   }
// }

// var taskCompleted = true;
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.request == "getWord") {
//         sendResponse({done: taskCompleted});
//     }
// });

// The onClicked callback function.
function onClickHandler(info, tab) { 
  var sText = info.selectionText;
  //change the rest to put into the flashcard deck

  //open a pop-up to edit the card.
  // var flashCardId = chrome.windows.create({"type": "popup"});

  // flashCardId.document.write("<p> Hello World </p>");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "addCard",
            "word": highLightedText,
            "parentElement": parentElement
          });
  });
  // chrome.tabs.create({
  //       url: chrome.extension.getURL('background.html'),
  //       active: false
  //   }, function(tab) {
  //       // After the tab has been created, open a window to inject the tab
  //       chrome.windows.create({
  //           // url: chrome.extension.getURL('background.html'),
  //           tabId: tab.id,
  //           type: 'popup',
  //           focused: true,
  //           top: 300,
  //           left: 300,
  //           width: 300,
  //           height: 300
  //           // incognito, top, left, ...
  //       });
  //       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //         chrome.tabs.sendMessage(tab.id, {highLight: highLightedText});
  // });
  // });

  //add the card to the deck 
  // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);  
  // window.open(url, '_blank');
};