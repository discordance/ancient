var midi = require('midi');

function RtSeq() {
	
	this.ivid = null;
	this.max = 3072; // max ticks at 96 ppqn for 128 squav
	this.ticks = 0;
	this.bpm = 120;
	this.events = new Array(this.max);
	this.dly = (60000/this.bpm)/96;
	this.rtmidi = null;

	// Set up a new output.
	this.out = new midi.output();
}

RtSeq.prototype = {
	
	/**
	* Test a raw array of phrases
	* Final version would be Tracks ?	
	*/
	parsePhrases: function(phrases) {
		
	},
	start: function() {
		// Open the first available output port.
		this.out.openPort(0);
		oThis = this; // this reference to callbacks
		this.ivid = setInterval(function() { oThis.tick() }, this.dly);
	},
	tick: function() {
		this.ticks++;
		this.ticks = this.ticks % this.max;
		//console.log(this.ticks);
	},
	stop: function() {
		// Close the port when done.
		clearInterval(this.ivid);
		this.out.closePort();
		this.ticks = 0;
	}
}; 


// node.js
module.exports = RtSeq;

// Send a MIDI message.
//output.sendMessage([153,36,90]);
//output.sendMessage([137,36,90]);

