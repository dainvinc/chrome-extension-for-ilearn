chrome.storage.local.clear();
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://ilearn.marist.edu/direct/gradebook/my.json", false);
xhr.send();
var stat = xhr.status;
alert(stat);
var res;
if(stat == 200) {  
    alert("Successfully connected");
} else {
    alert("Not an authorized user.");
}
