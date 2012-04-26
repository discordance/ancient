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


var a = new Phrase(16, []);
a.setStrVel("f000f000f000f000");

console.log(a.dumpVel());
a.addDelayVel(6,0.3);

var seq = new RtSeq();
seq.phParse([a]);
seq.start();


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
