const isUrl = (str) => {
    try {
        new URL(str);
        return true;
    } catch  {
        return false;  
    }
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "dom-loaded":
            var decodetext =[];
            var strhex = request.data.SelectedText
            for (let i = 0; i < strhex.length; i+=2) {
                decodetext.push(String.fromCharCode(parseInt(strhex.replace(/\s/g, "").substring(i,i+2), 16)))
            }
            var url = decodetext.join('')
            if (isUrl(url) == true) {
                var link = url
                chrome.contextMenus.remove("hextdecode",function () {  
                    chrome.contextMenus.create({
                        title: "Go " + link, 
                        contexts:["selection"], 
                        id : "hextdecode",
                        parentId: "MainMenu"
                    });
                })
                
                
                
            }
            if (isUrl(url) == false)
            {
                chrome.contextMenus.remove("hextdecode")
                chrome.extension.getBackgroundPage().console.log('not link');

            }
        break;
    }
    return true;
});


// function HexConvert(info,tab) {
//     var strhex = stext
//     for (let i = 0; i < strhex.length; i+=2) {
//         decodetext.push(String.fromCharCode(parseInt(strhex.replace(/\s/g, "").substring(i,i+2), 16)))
//     }

//     if (validURL(decodetext.join('')) == true) {
//         var newtext = decodetext.join('')
//         chrome.extension.getBackgroundPage().console.log(newtext);
//         chrome.contextMenus.create({
//             title: "Go " + newtext, 
//             contexts:["selection"], 
//             id : "SubMenu",
//             parentId: "MainMenu",
//             onclick: HexConvert
//         });
//     }
//     if (validURL(decodetext.join('')) == false)
//     {
//         chrome.extension.getBackgroundPage().console.log('Error');
//     }
// }
// HexConvert()
chrome.contextMenus.create({
    title: "Hex Convert", 
    contexts:["selection"],
    id : "MainMenu"
});

