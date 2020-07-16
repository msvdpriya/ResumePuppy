
let h1bToggleButton = document.getElementById('h1b-toggle');
let gcToggleButton = document.getElementById('gc-toggle');
console.log(h1bToggleButton)
console.log(gcToggleButton)
// check from storage and accordingly check or uncheck the button
h1bToggleButton.addEventListener('change', (event) => {
  toggleClick()

  // save it to browser memory
  chrome.storage.sync.set({'h1b': event.target?.checked }, function() {
    console.log('h1b',event.target?.checked);
  });

})

gcToggleButton.addEventListener('change', (event) => {
  toggleClick()
  chrome.storage.sync.set({'gc': event.target?.checked }, function() {
    console.log('gc',event.target?.checked);
  });
  // save it to browser memory
})

function toggleClick(){
  console.log('enabled')
  if (h1bToggleButton?.checked || gcToggleButton?.checked)
  {
    
    chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
                  for(var i=0; i< tabs.length; i++){
                    var tab = tabs[i];
                    if(tab.url){
                      if(tab.url.includes("https://www.linkedin.com/jobs/view/") === true){
                        chrome.tabs.sendMessage( tab.id, 
                          {
                          h1b: h1bToggleButton.checked,
                          gc: gcToggleButton.checked
                          }
                      )
                      }
                    }
                  }   
                });
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