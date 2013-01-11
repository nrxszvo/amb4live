this.inlets = 1;
this.outlets = 2;

var Ambisonics = {
    source: 0,
    mode: "aed",
    track: null,    
    a: 0,
    e: 0,
    d: 0,
    x: 0,
    y: 0,
    z: 0,
    
    sendCoordinates: function() {
	switch (this.mode) {
	case "aed":
	    outlet(0, [this.mode,
		       this.source,
		       this.a,
		       this.e,
		       this.d,
		       1]);
	    break;
	case "xyz":
	    outlet(0, [this.mode,
		       this.source,
		       this.x,
		       this.y,
		       this.z,
		       ""]);
	    break;
	}		
    },
    
    remove: function() {
	outlet(1, this.source);
    },
    
    apiCallback: function(args) {
	post("args:", args, "\n");
	switch (args[0]) {
	case "current_output_sub_routing":
	    if (Ambisonics.track.get("current_output_routing") == "Ext. Out") {
		if (parseInt(args[1]) != Ambisonics.source) {
		    Ambisonics.remove();
		    Ambisonics.source = parseInt(args[1]);
		    Ambisonics.sendCoordinates();
		}
	    } else {
		Ambisonics.source = 0;
	    }
	    post("source:", Ambisonics.source,"\n");
	    break;
	}
    }
};

function setProperty(property, value) {
    Ambisonics[property] = value;
    Ambisonics.sendCoordinates();
}
  
function bang() {
    Ambisonics.track = new LiveAPI(Ambisonics.apiCallback, "this_device canonical_parent");
    Ambisonics.track.property = "current_output_sub_routing";
}
