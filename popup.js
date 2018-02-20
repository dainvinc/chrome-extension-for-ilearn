var subListBtn = document.querySelector(".get-sub-list");
var favSubsBtn = document.querySelector("#favs");
var courseListUl = document.querySelector('#list');
var userName = document.querySelector("#username");
var cwidSpan = document.querySelector("#cwid");
var goBack = document.querySelector(".go-back");
var httpReq = new XMLHttpRequest();

chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    var tab = tabs[0].url;
    var link = "https:*";
    
    console.log(JSON.stringify(tabs[1]) +"\n" +link);
    
    if(tab.startsWith(link)) {
        favSubsBtn.addEventListener("click", function() {
            chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
      });
        });
        subListBtn.addEventListener("click", function() {
            fadeOut(subListBtn);
            goBack.style.display = "block";
            printListOfCourses();
        }); 
    } else {
        chrome.tabs.create({url: "https:"+tab.substring(5,100)});
    }
});


// window.onload = getUserName();
// window.onload = getCwid();