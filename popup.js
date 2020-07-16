let activateAppButton = document.getElementById('activate');
chrome.storage.sync.get('isAppActive', function (data) {
    var element = activateAppButton;
    var isAppActive = data.isAppActive;
    if (!isAppActive) {
      element.innerText = 'Enable ResumePuppy';
    }
    else {
      element.innerText = 'Disable ResumePuppy';
    }
  });
activateAppButton.onclick = function (event) {
    chrome.storage.sync.get('isAppActive', function (data) {
      var element = event.target;
    //   console.log(data.isAppActive)
      var isAppActive = data.isAppActive;
      if (!isAppActive) {
        element.innerText = 'Disable ResumePuppy';
        chrome.storage.sync.set({ isAppActive: true }, function () {
        // console.log('Resume Puppy App activated');
        });
  
        chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
            for(var i=0; i< tabs.length; i++){
              var tab = tabs[i];
              if(tab.url){
                if(tab.url.includes("https://www.linkedin.com/jobs/view/") === true){
                  chrome.tabs.sendMessage( tab.id, {
                    message: 'enabled'
                  })
                }
              }
            }   
          });
      }
      else {
        element.innerText = 'Enable ResumePuppy';
        chrome.storage.sync.set({ isAppActive: false }, function () {
        // console.log('Resume Puppy App disabled');
        });
  
        chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
            for(var i=0; i< tabs.length; i++){
              var tab = tabs[i];
              if(tab.url){
                if(tab.url.includes("https://www.linkedin.com/jobs/view/") === true){
                  chrome.tabs.sendMessage( tab.id, {
                    message: 'disabled'
                  })
                }
              }
            }   
          });
      }
    });
}