let serverUrl = 'localhost:8080'
function startApp(request) {
  companyName = document.querySelector(".entry-jobs-top-card__job-title")
    ?.textContent;
  //for testing
  response = { h1b: "high", gc: "low" };
  showButton(request, response);
//   serverURL = serverUrl + '/?company=' + companyName;
//   let xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//           // Typical action to be performed when the document is ready:
//           showButton(xhttp.response)
//       }
//   };
//   xhttp.open("GET", serverURL, true);
//   xhttp.send();
}

function showButton(request, response) {

  let appHTML =
    `<div id="resume-puppy-button" style="margin-left: 5px;">
<div style="display:inline-block;">
<img style="height:4rem; width:4rem;" src="` +
    chrome.runtime.getURL("images/icon2.png") +
    `" />
</div>
<div style="display:inline-block;font-weight: bold;width:80px">
<div id='h1b-result' style="display: ` +
    (request.h1b ? `inline-block` : `none`) +
    `;" >
H1B: <span style="color:` +
    (response.h1b == `low` ? `#e95858` : `#16c35f`) +
    `"> ` +
    response.h1b +
    `</span>
</div>
<div id = 'gc-result' style="display:` +
    (request.gc ? `inline-block` : `none`) +
    `">
GC:  <span style="color:` +
    (response.gc == `low` ? `#e95858` : `#16c35f`) +
    `"> ` +
    response.gc +
    `</span>
</div>
</div>
  </div>`;
  let appContainer = document.getElementsByClassName(
    "jobs-top-card__actions"
  )[0];

  appContainer.innerHTML += appHTML;
  document.getElementsByClassName(
    "jobs-top-card__save-button"
  )[0].style.height = `4rem`;
}

function exitApp() {
  // console.log('app exiting');
  let resumePuppyButton = document.getElementById("resume-puppy-button");
  if (!(resumePuppyButton == null)) {
    resumePuppyButton.remove();
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from popup.js

  if (request.message == 'updated' && (request.h1b || request.gc)) {
    exitApp();
    startApp(request);
  } else if (request.message == 'urlChanged' &&( request.h1b || request.gc)){
    setTimeout(() => {
        exitApp();
        startApp(request);
      }, 3000);
  }
  else {
    console.log("remove button");
    exitApp();
  }
});

window.onload = function () {
  chrome.storage.sync.get(["h1b", "gc"], function (data) {
    startApp({
      h1b: data.h1b,
      gc: data.gc,
    });
  });
};
