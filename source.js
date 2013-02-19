this.inlets = 1;
this.outlets = 2;

function Source(parseCh) {
    this.parseCh = parseCh;
    this.ch = 0;
    this.a = 0;
    this.e = 0;
    this.d = 0;
    this.sendCoordinates = sendCoordinates;
    this.remove = remove;
    this.updateCh = updateCh;
}

function sendCoordinates(spread) {
    if (this.ch > 0) {
	outlet(0, ["aed",
		   this.ch,
		   this.a + spread,
		   this.e,
		   this.d,
		   1]);
    }
}

function remove() {
    outlet(1, this.ch);
}

function updateCh(chs) {
    newCh = this.parseCh(chs);
    if (newCh != this.ch) {
	this.remove();
	this.ch = newCh;
	this.sendCoordinates();
    }
}

function parseLeft(chs) {
    var re = new RegExp("([0-9]+)/?([0-9]+)?");
    return parseInt(re.exec(chs)[1]);
}    

function parseRight(chs) {
    var re = new RegExp("([0-9]+)/?([0-9]+)?");
    ch = re.exec(chs)[2];
    if (ch == null)
	return 0;
    return parseInt(ch);
}

var Sources = {
    sLeft: new Source(parseLeft),
    sRight: new Source(parseRight),
    spread: 0,
    track: null,
    
    setProperty: function(property, value) {
	if (property == "spread") {
	    this.spread = value;	   
	} else { 
	    this.sLeft[property] = value;
	    this.sRight[property] = value;
	}
	this.sendCoordinates();
    },
    
    sendCoordinates: function() {
	if (this.sRight.ch != 0) {
	    this.sLeft.sendCoordinates(-1*this.spread/2.0);
	    this.sRight.sendCoordinates(this.spread/2.0);
	} else {
	    this.sLeft.sendCoordinates(0);
	}
    },

    updateChs: function(chs) {
	this.sLeft.updateCh(chs);
	this.sRight.updateCh(chs);
    }
};

function setProperty(property, value) {
    Sources.setProperty(property, value);
}

function apiCallback(args) {
    if (args[0] == "current_output_sub_routing") {
	if (Sources.track.get("current_output_routing") == "Ext. Out") {
	    Sources.updateChs(args[1]);
	} else {
	    Sources.updateChs('0/0')	       
	}
	post("left: ", Sources.sLeft.ch, " right: ", Sources.sRight.ch, "\n");
	Sources.sendCoordinates();
    }
}

function bang() {
    Sources.track = new LiveAPI(apiCallback, "this_device canonical_parent");
    Sources.track.property = "current_output_sub_routing";
}
