// types.js: Javascript type testing and handling helpers
// Tested on: IE, Chrome, Mozilla
// Depends on:

// Shorcut to test for an Array
function isArray(obj) {
   	if (obj.constructor.toString().indexOf("Array") == -1) {
   		return false;
	} else {
		return true;
	}
}

