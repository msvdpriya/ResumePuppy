'use strict';

chrome.runtime.onInstalled.addListener(function() {
    // chrome.storage.sync.set({'h1b': false}, function() {
    //     console.log("The h1b is stored at bg.js.");
    //   });
    //   chrome.storage.sync.set({'gc': false}, function() {
    //     console.log("The gc is stored at bg.js.");
    //   });
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