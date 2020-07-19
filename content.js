document.addEventListener("mouseup", function(event){
    if (event.button !== 2) {
        return false;
    }
    setTimeout(function(){
        var selected = window.getSelection().toString().trim();
        if(event.button == 2 && selected != '') {
            chrome.extension.sendMessage({
                'SelectedText' : selected,
            });
        } 
    }, 50);
}, true);