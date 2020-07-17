(function() {
  // your page initialization code here
  // the DOM will be available here
  let h1bToggleButton = document.getElementById("h1b-toggle");
  let gcToggleButton = document.getElementById("gc-toggle");
  let linkedUrl = "https://www.linkedin.com/jobs/view/"

  // check from storage and accordingly check or uncheck the button

  chrome.storage.sync.get(["h1b","gc"], function (data) {
    gcToggleButton.checked = data.gc;
    h1bToggleButton.checked = data.h1b;
    toggleClick();

  });
  
  // add event listener for the change of toggle button
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
  //function that sendMessage for app indicating the change that happened
  function toggleClick() {
      chrome.tabs.query(
        { windowId: chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.url?.includes(linkedUrl) === true) {
                chrome.tabs.sendMessage(tab.id, {
                  h1b: h1bToggleButton?.checked,
                  gc: gcToggleButton?.checked,
                });
              
            }
          }
        }
      );
    
  }
})();
  