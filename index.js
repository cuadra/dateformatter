var format = function (v) {
    if (v.length >= 2) {
        v = `${v.substring(0, 2)}/${v.substring(2, v.length)}`;
    }
    if (v.length >= 5) {
        v = `${v.substring(0, 5)}/${v.substring(5, v.length)}`;
    }
    return v;
}
var isNum = function (string) {
    return !isNaN(Number(string));
}
var removeFormat = function (string) {
    return string.replace(/\//g, '');
}
var arrow = function (string) {
    return true;
}
var shouldFormat = function (evt) {
    var btn = evt.keyCode;
    if (evt.shiftKey || btn === 8 || btn === 37 || btn === 38 || btn === 39 || btn === 40) {
        return false;
    } else {
        return true;
    }
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
var Formatter = function (evt) {
    if (shouldFormat(evt)) {

        //Save Cursor Position
        var posS = evt.target.selectionStart;
        var posE = evt.target.selectionEnd;

        var val = String(evt.target.value);
        var formatted = format(removeFormat(val));
        evt.target.value = formatted;

        //Adjust Cursor Position
        if (val.charAt(posE) === "/") {
            evt.target.setSelectionRange(posS, posE);
        } else {
            evt.target.setSelectionRange(posS + 1, posE + 1);
        }

    }
}
var SwapToNumber = function (evt) {
    //evt.target.setAttribute("type", "number");
    //pattern="\d*"
    document.getElementById('dob').setAttribute("type", "tel");
    document.getElementById('dob').setAttribute("inputmode", "numeric");
    //document.getElementById('dob').setAttribute("pattern", "[0-9]*");
}
var SwapToText = function (evt) {
    evt.target.setAttribute("type", "text");
    evt.target.removeAttribute("inputmode");
}

document.getElementById('date').addEventListener('keyup', Formatter);
document.getElementById('dob').addEventListener('keyup', Formatter);
document.getElementById('dob2').addEventListener('keyup', Formatter);

var copy = document.getElementById('dob').cloneNode(true);

copy.setAttribute("id", "dob3");
copy.setAttribute("type", "tel");
copy.setAttribute("placeholder", "MM/DD/YY (Copied)");
copy.addEventListener('keyup', Formatter);
document.getElementsByTagName('body')[0].appendChild(copy);

//document.getElementById('dob').addEventListener('focus', SwapToNumber);
window.addEventListener('load', SwapToNumber);
//document.getElementById('dob').addEventListener('blur', SwapToText);
