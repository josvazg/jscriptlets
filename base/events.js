// events.js: Javscript event handling helpers
// Tested on: IE, Chrome, Mozilla
// Depends on:

// Get the event
function getEvent(ev) {
	return (window.event)? event : ev;
}

// Get the Element associated with an event
function getTarget(ev) {
	if(ev.target) {
		return ev.target;
	}
	return ev.srcElement;
}

