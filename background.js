function copyToClipboard (str){
    document.oncopy = function(event) {
        event.clipboardData.setData("Text", str);
        event.preventDefault();
    };
    document.execCommand("Copy");
    document.oncopy = undefined;
}
chrome.contextMenus.create({
    title: "HighHuman Menu", 
    contexts:["selection"],
    id : "MainMenu"
});
chrome.contextMenus.create({
    title: 'Pls select hex',
    contexts: ['selection'],
    enabled: false,
    id: 'hexdecode',
    parentId: 'MainMenu',
    onclick: accessUrl,
});
chrome.contextMenus.create({
    title: "Not nhentai number",
    contexts:["selection"], 
    enabled : false,
    id : "nhentai",
    parentId: "MainMenu",
    onclick: accessNhentai
});
var seltext = null;
function accessNhentai(info,tab) {
    var selected = info.selectionText
    chrome.storage.sync.get('IncognitoMode',function(res) {
        var isIncognitoMode  = res.IncognitoMode
        chrome.extension.getBackgroundPage().console.log(isIncognitoMode);
        if (!isIncognitoMode) {
            chrome.tabs.create({"url": `https://nhentai.net/g/${selected}`})
        }
        else{
            chrome.windows.create({"url": `https://nhentai.net/g/${selected}`, "incognito": true})
        }
    });
}
function accessUrl(info,tab) {
        chrome.storage.sync.get('IncognitoMode', function (res) {
            var isIncognitoMode = res.IncognitoMode
            chrome.extension.getBackgroundPage().console.log(isIncognitoMode);
            if (!isIncognitoMode) {
                chrome.tabs.create({ url: window.seltext });
            }
            else {
                chrome.windows.create({ url: window.seltext, incognito: true });
            }
        });
}
function isNhentaiCode(selectedNumber) {
    var its 
    if (!isNaN(selectedNumber)) {
        if (selectedNumber.length <= 6) {
            its = true
        } else its = false
    } else its = false
    return its
}
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.urls;
    if (Array.isArray(url)) {
        chrome.storage.sync.set({ URLs: url });
        chrome.extension.getBackgroundPage().console.log(url);
        chrome.contextMenus.update("hexdecode",{
            title: "Click on extension to view multiple url",
            enabled : false,
        })
    }
    else {
        window.seltext = url;
        chrome.storage.sync.set({ URLs: '' });
        chrome.extension.getBackgroundPage().console.log(url);
        copyToClipboard(url);
        chrome.storage.sync.get('NameorURL', function (res) {
            var isNameorURL = res.NameorURL;
            if (!isNameorURL) {
                chrome.contextMenus.update('hexdecode', {
                    title: 'Open ' + url,
                    enabled: true,
                });
            } else {
                var hostname = new URL(url);
                chrome.contextMenus.update('hexdecode', {
                    title: 'Open ' + hostname.hostname,
                    enabled: true,
                });
            }
        });
    }
    if (isNhentaiCode(request.SelectedText)) {
        chrome.contextMenus.update("nhentai",{
            title: "Open nhentai.net/g/" + request.SelectedText,
            enabled : true,
        })
    }
    if (!isNhentaiCode(request.SelectedText)) {
        chrome.contextMenus.update("nhentai",{
            title: "Not nhentai number",
            enabled : false,
        })
    }
});