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
var handler = function (evt) {
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

document.getElementById('dob').addEventListener('keyup', handler);
