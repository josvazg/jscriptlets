// autocompleter.js: Autocompleter widget
// Tested on: IE, Chrome, Mozilla
// Depends on: base/base.js, base/types.js, base/events.js, base/gen.js, 
// base/sizenpos.js

// Build autocompleter
function buildAutocompleter(id,config) {
	var el=_$(id);		
	var ac=newElem("div");
	ac.id="autoc_"+el.id;
	ac.display=el;
	el.autocompleter=ac;
	ac.className="autoc";
	copyWidth(el,ac);
	placeBelow(el,ac);
	ac.fixCase=fixCase;
	ac.matches=startsWith;
	ac.cache=new Object();
	ac.localdata=new Object();

	// Autocompleter behaviour 

	// show the options/suggestions
	ac.show=function(data) {
		this.innerHTML="";
		this.data=data;
		this.ops=new Array();
		this.selected=-1;
		this.mouseover=false;
		if(isArray(data)) {
			for(i=0;i<this.data.length;i++) {
				this.addOption(this.data[i]);
			}
		} else {
			for(arg in this.data) {
				this.addOption(arg);
			}
		}
		if(this.ops.length>0) {
			this.style.display="block";
			this.shown=true;
		} else {
			this.hide();
		}
	}

	// hide the options
	ac.hide=function() {
		this.style.display="none";
		this.shown=false;
		this.mouseover=false;
	}		
	
	// Add an option
	ac.addOption=function(key) {
		i=this.ops.length;
		op=newElem("div");
		this.ops[i]=op;
		op.id=this.input.name+"_op"+i;
		op.idx=i;
		op.setAttribute("value",key);
		op.value=key;
		op.innerHTML=this.data[key];
		if(i==this.selected) {
			this.select(i,true);
		}
		op.onclick=function() {
			ac=this.parentNode;
			ac.select(this.idx);
			ac.apply();
		}
		op.onmouseover=function() {
			ac=this.parentNode;
			if(ac.selected!=this.idx) {
				this.className="autocover";
			}
		}
		op.onmouseout=function() {
			ac=this.parentNode;
			if(ac.selected!=this.idx) {
				this.className="";
			}
		}
		this.appendChild(op);
	}

	// Select a new option
	ac.select=function(i) {
		idx=this.selected;
		if(idx>=0 && idx<this.ops.length) {
			this.ops[idx].className="";
		}
		if(i>=0 && i<this.ops.length) {
			this.ops[i].className="autocselected";
			this.selected=i;
		}
	}

	// Select the next option UP wards
	ac.up=function() {
		if(!this.shown || this.selected<=0) {
			return;
		}
		this.select(this.selected-1);
	}

	// Select the next option DOWN wards
	ac.down=function() {
		if(this.selected>=(this.ops.length-1)) {
			return;
		}
		if(!this.shown) {
			this.style.display="block";
			this.shown=true;
			this.update();
		}
		this.select(this.selected+1);
	}
	
	// Apply current option to autocompleted textfield
	ac.apply=function() {
		if(this.selected!=-1) {
			this.display.value=this.ops[this.selected].innerHTML;
			this.input.value=this.ops[this.selected].value;
		}
		this.hide();
	}

	// Focus on this autocompleted textfield
	ac.focus=function() {
		this.display.focus();
	}

	// On mouse over remember not to hide onblur
	ac.onmouseover=function() {
		if(!this.mouseover) {
			this.mouseover=true;
		}
	}

	// On mouse out forget it
	ac.onmouseout=function() {
		if(this.mouseover) {
			this.mouseover=false;
		}
	}

	// Update the autocompleter options with current textfield contents
	ac.update=function() {
		val=this.fixCase(this.display.value);
		data=this.cache[val];
		if(data==null) {
			data=this.load(val);
		}
		this.show(data);
	}

	// Load the options locally from localdata
	ac.localLoad=function(val) {
		data=new Object();
		for(o in this.localdata) {
			if(this.matches(this.fixCase(this.localdata[o]),val)) {
				data[o]=this.localdata[o];
			}
		}
		return data;
	}

	// Textfield behaviour

	// hide the options ONLY when losing focus from the textfield AND the options
	el.onblur=function(e) {
		e= (window.event)? event : e;
		ac=getTarget(e).autocompleter;
		if(!ac.mouseover) {
			ac.hide();
		}
	}

	// Handle arrow keys, enter and textfield updates
	el.onkeyup=function(e) {
		e= (window.event)? event : e;
		ac=getTarget(e).autocompleter;			
		switch(e.keyCode) {
		case 38:
			ac.up();
			break;
		case 40:
			ac.down();
			break;
		case 13:
			ac.apply();
			break;
		default:
			ac.update();
			break;
        }
	}
	insertNext(el,ac);
	ac.load=ac.localLoad;
	id=el.id;
	el.id=id+"_display";
	hidden=newElem("input");
	hidden.type="hidden";
	hidden.id=id;
	insertNext(el,hidden);
	ac.input=hidden;
	return ac;
}

