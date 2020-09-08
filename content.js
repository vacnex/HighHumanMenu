document.addEventListener("mousedown", function(event){
    if (event.button !== 2) {
        return false;
    }
    var selected = window.getSelection().toString().trim();
    if(event.button == 2 && selected != '') {
        chrome.extension.sendMessage({
            'SelectedText' : selected,
        });
    }
}, true);