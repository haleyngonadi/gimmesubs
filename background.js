function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'bpsearch: Search the Blueprint blog for %s'
  });
}

resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {

});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  navigate("http://blueprintinteractive.com/search/node/" + text);
});

// Trigger event from popup file.
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(request.type);
    switch(request.type) {
        case "hideimages":
            hideimages();
		break;
     case "geoblocked":
            geoBlocked();
    break;
    case "getduration":
            getDuration();
    break;
    case "capschange":
            changeCaps();
    break;
		case "on":
	    	togglestorage("on");
		break;
	    case "off":
			togglestorage("off");
        break;
		case "check":
			togglestorage("check");
        break;
    }
    return true;
});

// send a message to the content script for DOM manipulation
var hideimages = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "hideimages"});
	});
}

var geoBlocked = function() {
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {type: "geoblocked"});
  });
}

var changeCaps = function() {
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {type: "capschange"});
  });
}


var getDuration = function() {
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {type: "getduration"});
  });
}

// Store and display data. No need to use content script since we aren't changing DOM
var togglestorage = function(data) {
	chrome.tabs.getSelected(null, function(tab){
		var setting = "";
		if (data == "check") {
			// Getter
			chrome.storage.local.get("blueprint_setting", function(result) {
			    setting = result.blueprint_setting;
			    if (setting) {
			        alert(setting);
			    }
			});
		} else {
			chrome.tabs.sendMessage(tab.id, {type: "togglestorage"});
			// Setter
			chrome.storage.local.set({"blueprint_setting": data });
			// Getter
			chrome.storage.local.get("blueprint_setting", function(result) {
			    setting = result.blueprint_setting;
			    if (setting) {
			        alert(setting);
			    }
			});
		}
	});
}



