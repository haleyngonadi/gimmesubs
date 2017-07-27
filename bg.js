chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url && tab.url.indexOf('univision.com') != -1) {
        chrome.pageAction.show(tabId);
    }
    
  
});
