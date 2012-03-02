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


var rnd_short_groov = function(){
  var dr = [];
  var rdm = function(){
	return (Math.random()-0.5)*1.9;
  }
  for (var i = 8 - 1; i >= 0; i--) {
	dr.push(rdm());
  }
  return dr;
}

var drifts = rnd_short_groov();

var a = new Phrase(16, []);
a.setStrVel("f000f000f000f000");
a.setDrifts(drifts);

var b = new Phrase(16, []);
b.setStrVel("0000f0000000f000");
b.setDrifts(drifts);

var c = new Phrase(16, []);
c.setStrVel("c6c6c6c6c6c6c6c6");
c.setDrifts(drifts);


var seq = new RtSeq();
seq.phParse([a,b,c]);
seq.start();


var replaygr = function(){
	drifts = rnd_short_groov();
	a.setDrifts(drifts);
	b.setDrifts(drifts);
	c.setDrifts(drifts);
	seq.stop();
	seq.phParse([a,b,c]);
	seq.start();
}

// out process
process.openStdin().on("keypress", function(chunk, key) {
  
  // poor
  if(key && key.name === "z"){
  	
  }
  // so/so/weird
  if(key && key.name === "s"){
  	
  }
  // interesting
  if(key && key.name === "w"){
  	
  }
  // wonder
  if(key && key.name === "f"){
  	
  }

  // start stop seq
  if(key && key.name === "p"){
  	if(seq.on){
  		seq.stop();
  	}else{
  		seq.start();
  	}
  }
  // quit
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ancient Said Bye");
    seq.stop();
    process.exit();
  }
});

tty.setRawMode(true);
