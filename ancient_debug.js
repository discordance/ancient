/**
 *  @author Aymeric Nunge [dscrd]
 * 
 * Debugger to test the application in the console. 
 */
var Step = require("./data_structure/step");
var Phrase = require("./data_structure/phrase");
var Util = require("./global/utilitor");
var Gen = require("./global/generator");
var RtSeq = require("./midi/rtseq");

// files
var Fs = require('fs');

// tty exit process nice
var tty = require("tty");


// make rndm drift
var rdm = function(){
	return (Math.random()-0.5)*1.9;
}

var dr = [];
for (var i = 8 - 1; i >= 0; i--) {
	dr.push(rdm());
}


var a = new Phrase(16, []);
a.setStrVel("f000f000f000f000");

var b = new Phrase(16, []);
b.setStrVel("0000f0000000f000");

var c = new Phrase(16, []);
c.setStrVel("c6c6c6c6c6c6c6c6");
c.setDrifts(dr);


var seq = new RtSeq();
// seq.start();
seq.phParse([a,b,c]);
seq.start();

// out process
process.openStdin().on("keypress", function(chunk, key) {
  //
  if(key && key.name === "o"){
  	if(seq.on){
  		seq.stop();
  	}else{
  		seq.start();
  	}
  }
  // QUIT
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ancient Said Bye");
    seq.stop();
    process.exit();
  }
});

tty.setRawMode(true);
