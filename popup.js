(function() {
  // your page initialization code here
  // the DOM will be available here
  let h1bToggleButton = document.getElementById("h1b-toggle");
  let gcToggleButton = document.getElementById("gc-toggle");

  // check from storage and accordingly check or uncheck the button
  chrome.storage.sync.get("h1b", function (data) {
    h1bToggleButton.checked = data.h1b;
    toggleClick();
  });
  chrome.storage.sync.get("gc", function (data) {
    gcToggleButton.checked = data.gc;
    toggleClick();
  });

  

  h1bToggleButton.addEventListener("change", (event) => {
    toggleClick();
    // save it to browser memory
    chrome.storage.sync.set({ h1b: event.target?.checked }, function () {});
  });

  gcToggleButton.addEventListener("change", (event) => {
    toggleClick();
    // save it to browser memory
    chrome.storage.sync.set({ gc: event.target?.checked }, function () {});
  });

  function toggleClick() {
    console.log("enabled");
    console.log(h1bToggleButton)
    console.log(gcToggleButton)
    console.log(h1bToggleButton.checked)
    console.log(gcToggleButton.checked)


    if (h1bToggleButton?.checked || gcToggleButton?.checked) {
      chrome.tabs.query(
        { windowId: chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.url) {
              if (
                tab.url.includes("https://www.linkedin.com/jobs/view/") === true
              ) {
                chrome.tabs.sendMessage(tab.id, {
                  h1b: h1bToggleButton.checked,
                  gc: gcToggleButton.checked,
                });
              }
            }
          }
        }
      );
    }
  }

  // let activateAppButton = document.getElementById('activate');
  // chrome.storage.sync.get('isAppActive', function (data) {
  //     var element = activateAppButton;
  //     var isAppActive = data.isAppActive;
  //     if (!isAppActive) {
  //       element.innerText = 'Enable ResumePuppy';
  //     }
  //     else {
  //       element.innerText = 'Disable ResumePuppy';
  //     }
  //   });

  // activateAppButton.onclick = function (event) {
  //     chrome.storage.sync.get('isAppActive', function (data) {
  //       var element = event.target;
  //     //   console.log(data.isAppActive)
  //       var isAppActive = data.isAppActive;
  //       if (!isAppActive) {
  //         element.innerText = 'Disable ResumePuppy';
  //         chrome.storage.sync.set({ isAppActive: true }, function () {
  //         // console.log('Resume Puppy App activated');
  //         });

  //         chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
  //             for(var i=0; i< tabs.length; i++){
  //               var tab = tabs[i];
  //               if(tab.url){
  //                 if(tab.url.includes("https://www.linkedin.com/jobs/view/") === true){
  //                   chrome.tabs.sendMessage( tab.id, {
  //                     message: 'enabled'
  //                   })
  //                 }
  //               }
  //             }
  //           });
  //       }
  //       else {
  //         element.innerText = 'Enable ResumePuppy';
  //         chrome.storage.sync.set({ isAppActive: false }, function () {
  //         // console.log('Resume Puppy App disabled');
  //         });

  //         chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
  //             for(var i=0; i< tabs.length; i++){
  //               var tab = tabs[i];
  //               if(tab.url){
  //                 if(tab.url.includes("https://www.linkedin.com/jobs/view/") === true){
  //                   chrome.tabs.sendMessage( tab.id, {
  //                     message: 'disabled'
  //                   })
  //                 }
  //               }
  //             }
  //           });
  //       }
  //     });
  // }

})();
  