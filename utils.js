this.inlets = 1;
this.outlets = 1;

function enumerate(inch, outch) {
    for (var i=0; i<inch; i++) {
	for (var j=0; j<outch; j++) {
	    outlet(0, [i, j, 1.0]);
	}
    }
}