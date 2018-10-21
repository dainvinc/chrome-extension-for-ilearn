var httpReq = new XMLHttpRequest();

chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    var tab = tabs[0].url;
    var link = "https";
    console.log(tab);
    
    if(tab.startsWith(link))
    	console.log('Its already a secured link');
    else
        // Appends https to the url
    	chrome.tabs.create({url: "https:"+tab.substring(5,tab.length)});
});