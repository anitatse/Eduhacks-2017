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
	var definition = document.createElement("p");
	definition.innerHTML = def;
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

	btnAdd.addEventListener("click", function() { saveCard(word, def);});

	$(modal).modal();

}


// This is the function to be changed to actually save the card somewhere! e.g. quizlet
function saveCard(word, definition){
	console.log(word);
	console.log(definition);
}


function createModalTrigger(){
	var button = document.createElement("button");
	button.type="button";
	button.class = "btn btn-info btn-lg";
	button.setAttribute("data-toggle","modal");
	button.setAttribute("data-target","#myModal");
	button.appendChild(document.createTextNode("open modal!"));
	return button;
	// var p = document.createElement("p");
	// var a = document.createElement("a");
	// a.href="#ex1";
	// a.rel="modal:open";
	// a.appendChild(document.createTextNode("Open Modal!"));
	// p.appendChild(a);
	// return p;
}

function createModal(word){
	var div = document.createElement("div");
	div.class = "modal fade";
	div.id = "myModal";
	div.role = "dialog";

	var divDialog = document.createElement("div");
	divDialog.class = "modal-dialog";

	var divContent = document.createElement("div");
	divContent.class = "modal-content";

	var divHeader = document.createElement("div");
	divHeader.class = "modal-header";

	var buttonClose = document.createElement("button");
	buttonClose.type = "button";
	buttonClose.class = "close";
	buttonClose.setAttribute("data-dismiss","modal");
	buttonClose.appendChild(document.createTextNode("x"));

	var h4 = document.createElement("h4");
	h4.class = "modal-title";
	h4.appendChild(document.createTextNode(word));

	divHeader.appendChild(buttonClose);
	divHeader.appendChild(h4);

	var divBody = document.createElement("div");
	divBody.class = "modal-body";

	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Some text in the modal."));

	divBody.appendChild(p);

	var divFooter = document.createElement("div");
	divFooter.class = "modal-footer";

	var buttonAddCard = document.createElement("button");
	buttonAddCard.type = "button";
	buttonAddCard.class = "btn btn-default";
	// buttonAddCard.setAttribute("data-dismiss", "modal");
	buttonAddCard.appendChild(document.createTextNode("add card"));

	divFooter.appendChild(buttonAddCard);

	divContent.appendChild(divHeader);
	divContent.appendChild(divBody);
	divContent.appendChild(divFooter);

	divDialog.appendChild(divContent);

	div.appendChild(divDialog);

	return div;
}
// <!-- Modal -->
//   <div class="modal fade" id="myModal" role="dialog">
//     <div class="modal-dialog">
    
//       <!-- Modal content-->
//       <div class="modal-content">
//         <div class="modal-header">
//           <button type="button" class="close" data-dismiss="modal">&times;</button>
//           <h4 class="modal-title">word</h4>
//         </div>
//         <div class="modal-body">
//           //ignoring definition right now
//           <button>add card</button>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//         </div>
//       </div>
//     </div>
//   </div>