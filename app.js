
function startApp() {
    var prefix_url = 'https://www.linkedin.com/voyager/api/jobs/jobPostings/';
    var isAppActive = '';
    var resumePuppyButton = document.createElement('button'); 
    resumePuppyButton.innerHTML = 'ResumePuppy';
    
    resumePuppyButton.classList.add("artdeco-button"); 
    resumePuppyButton.classList.add("artdeco-button--3"); 
    resumePuppyButton.classList.add("ml2"); 
     
    resumePuppyButton.setAttribute("id","resume-puppy-button");

       chrome.storage.sync.get('isAppActive', function (data) {
        isAppActive = data.isAppActive;
        // Check if App is Active
        if (isAppActive) {
            // console.log('Resume Puppy app active');
            var currentLink = document.location;
            let jobId = (new URL(currentLink)).pathname.split("/")[3];
            var saveUrl = prefix_url+jobId
            var applyUrl =saveUrl+"?action=applyClick"
            if (currentLink.href.includes("https://www.linkedin.com/jobs/view/") === true) {
                document.getElementsByClassName("jobs-top-card__actions")[0].appendChild(resumePuppyButton)
                document.getElementsByClassName("jobs-apply-button")[0].addEventListener("click", isApplyClicked);
                console.log("Save URL: "+saveUrl)
                console.log("Apply URL: "+applyUrl)
                console.log("Job Title: "+document.querySelector(".entry-jobs-top-card__job-title")?.textContent);
                console.log("Company Name: "+document.querySelector(".jobs-top-card__company-url")?.textContent);
                console.log(document.querySelector(".jobs-description-content__text")?.textContent);

            }
        }
    });
}

function isApplyClicked(){
    console.log("Apply Clicked");
}
function exitApp(){
    // console.log('app exiting');
    var resumePuppyButton = document.querySelector('#resume-puppy-button');
    if(!(resumePuppyButton == null)){
        resumePuppyButton.remove()
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request);
      // listen for messages sent from popup.js
      if (request.message === 'enabled') {
            startApp()
      }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
      // listen for messages sent from background.js
      if (request.message === 'disabled') {
        exitApp();
      }
  });