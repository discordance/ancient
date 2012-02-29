var midi = require('midi');
var Phrase = require("../data_structure/phrase");
var Util = require("../global/utilitor");

function RtSeq() {
	
	this.ivid = null;
	this.max = 3072; // max ticks at 96 ppqn for 128 squav
	this.ticks = 0;
	this.bpm = 120;
	this.events = new Array(this.max);
	for (var i = this.max - 1; i >= 0; i--) {
		this.events[i] = [];
	};
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
	phParse: function(phrases) {
		var i=0, j=0, l=phrases.length, cp, pl=0, st, subi=0, ct=0, cv=0;
		var map = Util.map;
		var pmap = [36, 38, 40, 42, 46, 47, 48, 50] // for testing pitchs
		for (var i = 0; i < l; i++) {
			cp = phrases[i];
			pl=cp.size;
			for (var j = 0; j < 128; j++) {
				subi = j%pl;
				st=cp.steps[subi];
				if(st.vel){
					ct = map(j, 0, 128, 0, this.max);
					cv=map(st.vel,0,15,0,127);
					if(ct+1 <= this.max-1){
						this.events[ct].push({s:153,p:pmap[i],v:cv})
						this.events[ct+1].push({s:137,p:pmap[i],v:cv})
					}
				}
				//console.log(st.drift);
			};
		};

		//console.log(this.events);
	},
	start: function() {
		// Open the first available output port.
		this.out.openPort(0);
		oThis = this; // this reference to callbacks
		this.ivid = setInterval(function() { oThis.tick() }, this.dly);
	},
	tick: function() {
		var l = this.events[this.ticks].length, ob;
		if(l){
			for (var i = l - 1; i >= 0; i--) {
				ob=this.events[this.ticks][i];
				this.out.sendMessage([ob.s,ob.p,ob.v]);
			};
		}

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

