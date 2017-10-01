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

// The onClicked callback function.
function onClickHandler(info, tab) {
    var sText = info.selectionText;
    //change the rest to put into the flashcard deck

    //open a pop-up to edit the card.
    // var flashCardId = chrome.windows.create({"type": "popup"});

    // flashCardId.document.write("<p> Hello World </p>");
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "addCard",
            "word": highLightedText,
            "parentElement": parentElement
        });
    });
};