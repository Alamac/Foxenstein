chrome.browserAction.onClicked.addListener(function(tab) 
{ 
    chrome.cookies.getAll({domain: "adfox.ru"}, function(cookies) {
    for(var i=0; i<cookies.length;i++) {
        chrome.cookies.remove({url: "http://adfox.ru" + cookies[i].path, name: cookies[i].name});
    }
});
        chrome.cookies.getAll({domain: "maxlab.ru"}, function(cookies) {
    for(var i=0; i<cookies.length;i++) {
        chrome.cookies.remove({url: "http://maxlab.ru" + cookies[i].path, name: cookies[i].name});
    }
});
  
});
