// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "Create a flash card";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
        "id": "context" + context});
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    // var sText = info.selectionText;

    //change the rest to put into the flashcard deck

    //open a pop-up to edit the card.
    //var flashCard = chrome.windows.create({"type": "popup"});
    alert('clicked!');

    fetch('https://api.quizlet.com/2.0/users/hannerzer?access_token=aVWG3KmyyTNPQAgVyWgXFsdPHFXxFWM6SPsyBE9m&whitespace=1').then(function(response) {
        return response.json();
    }).then(function(data) {
      var modified = JSON.stringify(data);
        alert(modified);
    });
    //add the card to the deck
    // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
    // window.open(url, '_blank');
}