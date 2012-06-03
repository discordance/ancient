var midi = require('midi');
var Phrase = require("../data_structure/phrase");
var Util = require("../global/utilitor");

function RtSeq() {
	
	this.on = false;
	this.ivid = null;
	this.max = 3072; // max ticks at 96 ppqn for 128 squav
	this.ticks = 0;
	this.bpm = 118;
	this.pmap = [36, 38, 40, 42, 46, 47, 48, 50] // for testing pitchs
	this.dly = (60000/this.bpm)/96;
	this.rtmidi = null;

	// Set up a new output.
	this.out = new midi.output();
}

RtSeq.prototype = {
	/**
	*
	* phParse, another test:/\ 
	*/
	phParse2: function(phrases) {
		var i=0, 
			j=0,
			k=0, 
			l=phrases.length, 
			maxst=this.max/24, 
			cp=0, // current phrase
			pl=0, // current phrase length
			modj=0, // modulus current step
			cs, // current step
			cst=0, // current start tick
			cet=0, // current end tick
			dr=0, // drift, in ticks
			cv=0, // current step vel
			arr=[], 
			arrl=0;

		var map = Util.map, rnd = Math.round;
		this.reset(); // resets the events array
		for (i = 0; i < l; i++) {
			cp = phrases[i]; // curent phrase
			pl=cp.size;  // phrase length
			arr=[];
			for (j = 0; j < maxst; j++) {
				modj=j%pl;
				cs = cp.steps[modj]; // current step
				if(cs.vel){
					cst = j * 24; // current start tick
					dr = rnd(24*(1+cp.steps[modj].drift)) - 24;
					cst += dr;
					cet = cst + (cs.dur*24);
					cet = (cet >= this.max) ? this.max - 1: cet; // secure the last dur
					cv = rnd(map(cs.vel,0,15,0,127));
					arr.push([cst,cet,cv,this.pmap[i]]);
				}
			}
			arrl=arr.length;
			for (k = 0; k < arrl; k++){
				if(k){
					if(arr[k][0] <= arr[k-1][1]){
						arr[k-1][1] = arr[k][0]-1;
					}
					this.events[arr[k-1][0]].push({s:153,p:arr[k-1][3],v:arr[k-1][2]});
					this.events[arr[k-1][1]].push({s:137,p:arr[k-1][3],v:arr[k-1][2]});
					if(k == arrl-1){
						this.events[arr[k][0]].push({s:153,p:arr[k-1][3],v:arr[k-1][2]});
						this.events[arr[k][1]].push({s:137,p:arr[k-1][3],v:arr[k-1][2]});
					}
				}
			}
		}
		// fixing velocities
	},	
	/**
	* Test a raw array of phrases
	* Final version would be Tracks ?	
	*/
	phParse: function(phrases) {

		this.reset();
		var i=0, j=0, l=phrases.length, cp, pl=0, st, subi=0, ct=0, cv=0, dr=0;
		var odr=0;// mem
		var map = Util.map, rnd = Math.round;
		
		for (var i = 0; i < l; i++) {
			cp = phrases[i];
			pl=cp.size;
			for (var j = 0; j < 128; j++) {
				subi = j%pl;
				st = cp.steps[subi];
				if(st.vel){
					//check overlaps here because momorized
					odr = ct + dr;
					ct = rnd((j * 24)+(24*(1+st.drift)));
					if(odr >= ct && typeof this.events[ct-1] !== "undefined"){
						this.events[ct-1].push({s:137,p:this.pmap[i],v:cv})
					}
					cv = map(st.vel,0,15,0,127);
					// duration compute
					dr = (st.dur * 24)-1;

					if(ct+1 <= this.max-1){
						if(typeof this.events[ct] !== "undefined"
							&& typeof this.events[(ct+dr)%this.max-1] !== "undefined"){
							this.events[ct].push({s:153,p:this.pmap[i],v:cv})
							// not cool here (sometimes it bugs out)
							this.events[(ct+dr)%this.max-1].push({s:137,p:this.pmap[i],v:cv})
						}
					}
				}
			};
		};
	},
	start: function() {
		// Open the first available output port.
		this.out.openPort(0);
		oThis = this; // this reference to callbacks
		this.ivid = setInterval(function() { oThis.tick() }, this.dly);
		this.on = true;
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
		// send note off on chan 10;
		for (var i = this.pmap.length - 1; i >= 0; i--) {
			this.out.sendMessage([137,this.pmap[i],0]);
		}
		this.out.closePort();
		this.ticks = 0;
		this.on = false;
	},
	reset: function(){
		this.events = new Array(this.max);
		for (var i = this.max - 1; i >= 0; i--) {
			this.events[i] = [];
		};
	}
}; 


// node.js
module.exports = RtSeq;

