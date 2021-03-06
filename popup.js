var subListBtn = document.querySelector(".get-sub-list");
var favSubsBtn = document.querySelector("#favs");
var courseListUl = document.querySelector('#list');
var userName = document.querySelector("#username");
var cwidSpan = document.querySelector("#cwid");
var goBack = document.querySelector(".go-back");
var httpReq = new XMLHttpRequest();

chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    var tab = tabs[0].url;
    var link = "https://ilearn.marist.edu/portal";
    
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
        chrome.tabs.create({url: "https://login.marist.edu/cas/login?service=https%3A%2F%2Filearn.marist.edu%2Fsakai-login-tool%2Fcontainer"});
    }
});

function printListOfCourses() {
    console.log("Trying to get the List of courses...");
    
    httpReq.onreadystatechange = function() {
            
        if(httpReq.readyState == 4 && httpReq.status == 200) {
            var courses = "";
            var obj = JSON.parse(httpReq.responseText);
            var courseLinkUrl = "https://ilearn.marist.edu/portal/site/";

            console.log(courses.length);

            for(var i=0; i<obj.gradebook_collection.length; i++) {
                var newLi = document.createElement("LI");
                var newA = document.createElement("a");

                console.log(courseLinkUrl+""+obj.gradebook_collection[i].siteId);

                courseListUl.appendChild(newLi);
                newLi.appendChild(newA);
                newA.setAttribute("href", courseLinkUrl+""+obj.gradebook_collection[i].siteId);
                newA.setAttribute("target", "_blank");
                newA.innerHTML = obj.gradebook_collection[i].siteName;
            }
        } else {
            console.log("Something went wrong with the list of courses!");
        }
    }
    
    httpReq.open("GET", "https://ilearn.marist.edu/direct/gradebook/my.json", false);
    httpReq.send();
}

function getUserName() {
    console.log("Trying to get the Username");
    
    httpReq.onreadystatechange = function() {
        if(httpReq.readyState == 4 && httpReq.status == 200) {        
            document.write("You are logged in successfully now!"); 

            var user = JSON.parse(httpReq.responseText);
            userName.textContent = user.content_collection[0].author;
    
        } else {
            console.log("There's something wrong with retrieving the username")
        }        
    }

    httpReq.open("GET", "https://ilearn.marist.edu/direct/content/my.json", false);
    httpReq.send();
}

function getCwid() {
    console.log("Trying to get CWID...");
    
    httpReq.onreadystatechange = function() {
        if(httpReq.readyState == 4 && httpReq.status == 200) {
            var cwid = JSON.parse(httpReq.responseText);
            console.log("cwid: "+cwid);
            
            if(cwid.session_collection[0].userEid == null) {
                console.log("Trying again for CWID...");
                httpReq.open("GET", "https://ilearn.marist.edu/direct/session.json", false);
                httpReq.send();
            } else {
                cwidSpan.textContent = cwid.session_collection[0].userEid.substring(0,8);   
            }
        } else {
            console.log("There's something wrong!")
        }
    }
    
    httpReq.open("GET", "https://ilearn.marist.edu/direct/session.json", false);
    httpReq.send();
}

function goBackFromCoursesList() {
    goBack.style.display = "none";
    subListBtn.style.display = "block";
}

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

window.onload = getUserName();
window.onload = getCwid();