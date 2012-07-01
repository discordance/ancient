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

var swng = 0.4;
var a = Gen.phGenerateUniform(8,0.6);
var b = Gen.phGenerateUniform(64,0.1);
var c = Gen.phGenerateUniform(32,0.2);
var d = Gen.phGenerateUniform(8,0.2);
a.swing(swng);
b.swing(swng);
c.swing(swng);
d.swing(swng);

a = new Phrase(16);
a.setStrVel("000000ffff000000");
a.setStrVel("fffff00000000000");
a.setStrVel("f000f000f000f000");
a.setStrVel("f0f0ff00f00ff0f0");
a.setStrVel("f000f000f000f0f0");


console.log(a.dumpVel());
console.log("recurrence: "+a.getRecurrenceVel())
console.log("repartition: "+a.getRepartitionVel());
console.log("density: "+a.getDensityVel());

//console.log(a.dumpDrift());
//a.addDelayVel(6,0.3);

var seq = new RtSeq();
seq.phParse2([a,b,c,d]);
//seq.start();


// out process
process.openStdin().on("keypress", function(chunk, key) {

  // quit
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ancient Said Bye");
    seq.stop();
    process.exit();
  }
});

tty.setRawMode(true);
