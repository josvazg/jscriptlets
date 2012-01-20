// gen.js: Javascript html's elements generation
// Tested on: IE, Chrome, Mozilla
// Depends on:

// Shortcut to create HTMLElements
function newElem(type) {
	return document.createElement(type);
}

// Inserts el2 next to el (as a sibling within the same html element parent)
function insertNext(el, el2) {
	prt=el.parentNode;
	next=el.nextSibling;
	if(next==null) {
		prt.appendChild(el2);
	} else {
		prt.insertBefore(el2,next);
	}
}
