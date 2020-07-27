let serverUrl = "https://dev.resumepuppy.com/";

function getCompanyName() {
  return document.querySelector(".jobs-top-card__company-url")?.innerText;
}

function getStatusVisibilyClass(isEnabled) {
  return isEnabled ? `show` : `hide`;
}

function getVisaStatus(visaTypeArray)
{
  return {
    h1b: visaTypeArray.includes('H1-B')?'high':'low',
     gc: visaTypeArray.includes('PERM')?'high':'low'
  }
}
function startApp(request) {
  let companyName = getCompanyName();
  console.log(companyName);
  let url = serverUrl + "ext/visa/" + companyName;
  fetch(url)
    .then((response) => response.text())
    .then((data) => {      
      showComponent(request,getVisaStatus(data.type));
    })
    .catch((err) => {
      console.log(err);
    });
}
function addComponent(request, response, data) {
  let appContainer = document.querySelector(".jobs-top-card__actions");

  appContainer.innerHTML += data;
  document.querySelector("#rp-icon").src = chrome.runtime.getURL(
    "images/icon2.png"
  );
  let h1bresult = document.querySelector("#h1b-result span");
  let gcresult = document.querySelector("#gc-result span");

  h1bresult.innerHTML = response.h1b;
  gcresult.innerHTML = response.gc;
  h1bresult.classList.add(response.h1b);
  gcresult.classList.add(response.gc);
  h1bresult.parentElement.classList.add(getStatusVisibilyClass(request.h1b));
  gcresult.parentElement.classList.add(getStatusVisibilyClass(request.gc));
  document.querySelector(".jobs-top-card__save-button").style.height = `4rem`;
}

function showComponent(request, response) {
  fetch(chrome.extension.getURL("button.html"))
    .then((response) => response.text())
    .then((data) => {
      addComponent(request, response, data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function exitApp() {
  // console.log('app exiting');
  let resumePuppyButton = document.querySelector("#resume-puppy-button");
  if (!(resumePuppyButton == null)) {
    resumePuppyButton.remove();
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from popup.js

  if (request.message == "updated" && (request.h1b || request.gc)) {
    exitApp();
    startApp(request);
  } else if (request.message == "urlChanged" && (request.h1b || request.gc)) {
    setTimeout(() => {
      exitApp();
      startApp(request);
    }, 3000);
  } else {
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
