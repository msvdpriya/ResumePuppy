'use strict';

chrome.runtime.onInstalled.addListener(function() {

    console.log("ResumePuppy is installed");
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.linkedin.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

})
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      console.log(tabId,changeInfo);
      if (changeInfo.status === "complete") {
        chrome.storage.sync.get(["h1b","gc"], function (data) {
            console.log('on update')
            chrome.tabs.sendMessage(tab.id, {
                message:'urlChanged',
                h1b: data.h1b,
                gc: data.gc,
              });
          });
        
      }
    }
  );