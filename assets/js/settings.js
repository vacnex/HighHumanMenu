var $IncognitoMode = $('#IncognitoMode');
var $NameorURL = $('#NameorURL');
chrome.storage.sync.get('IncognitoMode',function(res) {
    $IncognitoMode.prop('checked',res.IncognitoMode)
    // chrome.extension.getBackgroundPage().console.log(res.IncognitoMode)
});
$IncognitoMode.change(function() {
    chrome.storage.sync.set({'IncognitoMode': $IncognitoMode.prop('checked')}, function() {
        // chrome.extension.getBackgroundPage().console.log('Settings saved');
    });
});
chrome.storage.sync.get('NameorURL',function(res) {
    $NameorURL.prop('checked',res.NameorURL)
    // chrome.extension.getBackgroundPage().console.log(res.NameorURL)
});
$NameorURL.change(function() {
    chrome.storage.sync.set({'NameorURL': $NameorURL.prop('checked')}, function() {
        // chrome.extension.getBackgroundPage().console.log('Settings saved');
    });
});