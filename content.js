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


var parentElement;

function saveHighLightedText() {
  var text = document.getSelection().toString();
  var node = document.getSelection().anchorNode.parentNode;
  parentElement = node;
  if (text != ''){
    chrome.runtime.sendMessage({highLight: text, parentElement: node}, function(response){
    	console.log(response.farewell);
    })
  }
}

document.onmouseup = function(){
	saveHighLightedText();
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "addCard") {
    	var def = "hooray";
        addCard(message.word, def);
    }
});


function addCard(word, def){

	var modal = document.createElement("div");
	// modal.class = "modal fade";
	modal.setAttribute("class","modal fade");
	var dialog = document.createElement("div");
	dialog.setAttribute("class", "modal-dialog");
	var content = document.createElement("div");
	content.setAttribute("class",  "modal-content");

	var header = document.createElement("div");
	header.setAttribute("class", "modal-header");
	var btnClose = document.createElement("button");
	btnClose.type = "button";
	btnClose.setAttribute("class", "close");
	btnClose.setAttribute("data-dismiss","modal");
	btnClose.innerHTML = "&times;";
	var title = document.createElement("h4");
	title.setAttribute("class", "modal-title");
	title.innerHTML = word;

	var body = document.createElement("div");
	body.setAttribute("class", "modal-body");
	// var definition = document.createElement("p");
	// definition.innerHTML = def;
	var definition = document.createElement("div");
	definition.setAttribute("class","form-group");
	var label = document.createElement("label");
	label.setAttribute("for","comment");
	label.innerHTML = "Definition: ";
	var textArea = document.createElement("textarea");
	textArea.setAttribute("class","form-control");
	textArea.setAttribute("rows", "5");
	textArea.setAttribute("id","definition");
	var footer = document.createElement("div");
	footer.setAttribute("class", "modal-footer");
	var btnAdd = document.createElement("button");
	btnAdd.type = "button";
	btnAdd.setAttribute("class", "btn btn-primary");
	btnAdd.setAttribute("data-dismiss", "modal");
	btnAdd.innerHTML = "Save";
	var btnCancel = document.createElement("button");
	btnCancel.type = "button";
	btnCancel.setAttribute("class", "btn btn-link");
	btnCancel.setAttribute("data-dismiss", "modal");
	btnCancel.innerHTML = "Cancel";

	definition.appendChild(label);
	definition.appendChild(textArea);

	footer.appendChild(btnAdd);
	footer.appendChild(btnCancel);
	body.appendChild(definition);
	header.appendChild(btnClose);
	header.appendChild(title);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);

	dialog.appendChild(content);
	modal.appendChild(dialog);

	btnAdd.addEventListener("click", function() { saveCard(word, textArea.value);});

	$(modal).modal();

}


// This is the function to be changed to actually save the card somewhere! e.g. quizlet
function saveCard(word, definition){
	console.log(word);
	console.log(definition);
}