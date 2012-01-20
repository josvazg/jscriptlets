// sizenpos.js: Positioning helping functions
// Tested on: IE, Chrome, Mozilla
// Depends on:


// Calculate the absolute position for an element
function getPos(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
   	}
    return { x: _x,  y: _y  };
}

// Position element el2 above element el
function placeAbove(el, el2) {
	pos=getPos(el);
	el2.style.position="absolute";
	el2.style.left=pos.x+"px";
	el2.style.top=(pos.y-el2.offsetHeight)+"px";
}

// Position element el2 below element el
function placeBelow(el, el2) {
	pos=getPos(el);
	el2.style.position="absolute";
	el2.style.left=pos.x+"px";
	el2.style.top=(pos.y+el.offsetHeight)+"px";
}

// Position element el2 right to element el
function placeRightTo(el, el2) {
	pos=getPos(el);
	el2.style.position="absolute";
	el2.style.left=(pos.x+el.offsetWidth)+"px";
	el2.style.top=pos.y+"px";
}

// Position element el2 left to element el
function placeRightTo(el, el2) {
	pos=getPos(el);
	el2.style.position="absolute";
	el2.style.left=(pos.x-el2.offsetWidth)+"px";
	el2.style.top=pos.y+"px";
}

// Copy element el width in element el
function copyWidth(el, el2) {
	el2.style.width=el.offsetWidth;
}

