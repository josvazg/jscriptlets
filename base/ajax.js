// ajax.js: Very basic ajax shortcuts
// Tested on: IE, Chrome, Mozilla
// Depends on:

// Returns the first valid funtion
function validFuncOf() {
    var returnValue;
    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }
    return returnValue;
}

// Obtains correct Ajax transport
function getAjaxTransport() {
	return validFuncOf(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) 
}

// Do an ajax GET or POST (if 'post' is not null)
function ajax(uri, cb, post) {
	r=getAjaxTransport();
	r.onreadystatechange=cb;
	method="GET";
	if(post!=null) {
		method="POST";
		if(post.toLowerCase()=="post") {
			post==null;
		}
	}
	r.open(method,uri,true);
	r.send(post);
}

