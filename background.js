var Client = require('node-rest-client').Client;
// var request = require('request');

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Add selected text to Flash cards";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;

  //change the rest to put into the flashcard deck

  //open a pop-up to edit the card.
  var flashCard = chrome.windows.create({"type": "popup"});

  //add the card to the deck 
  // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);  
  // window.open(url, '_blank');
}; 

// function POST(url, access_token, title, terms[], definitions[], lang_terms, lang_definitions) {
//     return new Promise(
//         function (resolve, reject) {

//             var client = new Client();

//             function done(data, response) {
//                 client.removeListener('error', error);
//                 resolve(data);
//             }

//             function error(err) {
//                 client.removeListener('error', error);
//                 reject(err);
//             }

//             function requestTimeout(req) {
//                 reject(new Error("Request timed out"));
//             }

//             function responseTimeout(req) {
//                 reject(new Error("Response timed out"));
//             }

//             var args = {
//                 headers: { 'Authorization': 'Bearer ' + access_token },
//                 requestConfig: { timeout: requestTimeoutLimit },
//                 responseConfig: { timeout: responseTimeoutLimit }
//             };

//             request = client.post(url, args, done);
//             request.on('requestTimeout', requestTimeout);
//             request.on('responseTimeout', responseTimeout);
//             client.on('error', error);
//         }
//     )
// }

// function quizletAPI(user_id, access_token) {
//     this.user_id = user_id;
//     this.access_token = access_token;
// };

// //Requires a write_set-scoped access token? How to do thsi TODO 
// quizletAPI.prototype.makeNewSet = function (title, terms[], definitions[], lang_terms, lang_definitions) {
//   return POST('https://api.quizlet.com/2.0/sets', title, terms[], definitions[], lang_terms, lang_definitions);
// }







