function is_hexadecimal(str) {
regexp = /^[0-9a-fA-F]+$/;
if (regexp.test(str))
    return true;
else
    return false;
}
function hex_to_ascii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}
const isUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch  {
        return false;  
    }
}
function isUrlList(urls) {
    let curl = 0
    urls.forEach(element => {
        if (isUrl(element))
            curl++
    });
    if (curl==urls.length) return true;
    else return false;  
}
document.addEventListener("mousedown", function (event) {
    if (event.button !== 2) {
        return false;
    }

    var selected = window.getSelection().toString().trim().replace(/\s/g, '');
    list = hex_to_ascii(selected)
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\0/g, '')
        .split(/(?=http)/);
    console.log(list)
    if (list.length == 1) {
        if (isUrl(list[0])) {
            if (event.button == 2 && list != '') {
                chrome.extension.sendMessage({
                    urls: list.toString(),
                });
            }
        }
    } else {
        if (isUrlList(list)) {
            if (event.button == 2 && list != '') {
                chrome.extension.sendMessage({
                    urls: list
                });
            }
        }
    }
}, true);