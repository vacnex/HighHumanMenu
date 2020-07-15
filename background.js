const isUrl = (str) => {
    try {
        new URL(str);
        return true;
    } catch  {
        return false;  
    }
}
chrome.contextMenus.create({
    title: "Hex Convert", 
    contexts:["selection"],
    id : "MainMenu"
});
chrome.contextMenus.create({
    title: "pls select hex",
    contexts:["selection"], 
    enabled : false,
    id : "hexdecode",
    parentId: "MainMenu",
    onclick: accessUrl
});
function accessUrl(info,tab) {
    var selected = info.selectionText
    var url = h2t(selected)
    chrome.storage.sync.get('IncognitoMode',function(res) {
        var isIncognitoMode  = res.IncognitoMode
        chrome.extension.getBackgroundPage().console.log(isIncognitoMode);
        if (!isIncognitoMode) {
            chrome.tabs.create({"url": url})
        }
        else{
            chrome.windows.create({"url": url, "incognito": true})
        }
    });
}
function h2t(selectedhex) {
    var decodetext =[];
    for (let i = 0; i < selectedhex.length; i+=2) {
        decodetext.push(String.fromCharCode(parseInt(selectedhex.replace(/\s/g, "").substring(i,i+2), 16)))
    }
    var url = decodetext.join('')
    return url
}
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var url = h2t(request.SelectedText)
    if (isUrl(url) == true) {
        var link = url
        var linkgroup = []
        for(let i of link.split(/[\n\s]/))
            i && linkgroup.push(i);
        link = linkgroup;
        if (link.length > 1)
        {
            chrome.extension.getBackgroundPage().console.log(link);
            chrome.storage.sync.set({'URLs': link});
            chrome.contextMenus.update("hexdecode",{
                title: "Click on extension to view multiple url",
                enabled : false,
            })
        }
        else
        {
            chrome.storage.sync.set({'URLs': ''});
            chrome.extension.getBackgroundPage().console.log('one url '+link);
            chrome.storage.sync.get('NameorURL',function(res) {
                var isNameorURL  = res.NameorURL
                if (!isNameorURL) {
                    chrome.contextMenus.update("hexdecode",{
                        title: "go " + link,
                        enabled : true,
                    })
                }
                else{
                    var hostname = new URL(link);
                    chrome.contextMenus.update("hexdecode",{
                        title: "go " + hostname.hostname,
                        enabled : true,
                    })
                }
            });
        }
    }
    if (isUrl(url) == false)
    {
        chrome.contextMenus.update("hexdecode",{
            title: "pls select hex",
            enabled : false,
        })
    }
});


