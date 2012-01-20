// base.js: Very basic shortcut used by almost anything else
// Tested on: IE, Chrome, Mozilla
// Depends on:

if(_$!=null) {
	alert("FATAL: _$ was already defined!!!");
}

// Shotcut to  Get an element By Id
function _$(id) {
	return document.getElementById(id);
}


