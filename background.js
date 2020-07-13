function HexConvert(info,tab) {
    var strhex = info.selectionText;
    var decodetext = [];
    for (let i = 0; i < strhex.length; i+=2) {
        decodetext.push(String.fromCharCode(parseInt(strhex.replace(/\s/g, "").substring(i,i+2), 16)))
    }
    var newtext = decodetext.join('')
    if (validURL(decodetext.join('')) == true) {
        chrome.tabs.create({  
            url: newtext
        });
    }
    if (validURL(decodetext.join('')) == false)
    {
        chrome.extension.getBackgroundPage().console.log('Error');
    }
    
}
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}
chrome.contextMenus.create({
    title: "Hex Convert", 
    contexts:["selection"],
    id : "MainMenu"
});
chrome.contextMenus.create({
    title: "Decode", 
    contexts:["selection"], 
    id : "SubMenu",
    parentId: "MainMenu",
    onclick: HexConvert
});