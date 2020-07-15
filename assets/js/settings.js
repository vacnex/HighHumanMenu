var $IncognitoMode = $('#IncognitoMode');
var $NameorURL = $('#NameorURL');

chrome.storage.sync.get('IncognitoMode',function(res) {
    $IncognitoMode.prop('checked',res.IncognitoMode)
});
$IncognitoMode.change(function() {
    chrome.storage.sync.set({'IncognitoMode': $IncognitoMode.prop('checked')});
});
chrome.storage.sync.get('NameorURL',function(res) {
    $NameorURL.prop('checked',res.NameorURL)
});
$NameorURL.change(function() {
    chrome.storage.sync.set({'NameorURL': $NameorURL.prop('checked')});
});
chrome.storage.sync.get('URLs',function(res) {
    $("#textarea").val('');
    var link = res.URLs
    var newline = '\n'
    var newtext = ''
    $('.linknum').html('Số link: '+ link.length);
    for (let i = 0; i < link.length; i++) {
        newtext = newtext.concat(link[i].concat(newline));
    }
    chrome.extension.getBackgroundPage().console.log(newtext);
    $("#textarea").val(newtext);
});
$('#clear').click(function (e) { 
    chrome.storage.sync.set({'URLs': ''});
    $('.linknum').html('Số link: 0');
    $("#textarea").val('');
});