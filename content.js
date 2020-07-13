window.addEventListener("click", function() {
    chrome.extension.sendMessage({
        type: "dom-loaded", 
        data: {
            SelectedText: window.getSelection().toString()
        }
    });
}, true);