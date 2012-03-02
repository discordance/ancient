/**
 *  @author Aymeric Nunge [dscrd]
 * 
 * Debugger to test the application in the console. 
 */
var Step = require("./data_structure/step");
var Phrase = require("./data_structure/phrase");
var Util = require("./global/utilitor");
var Gen = require("./global/generator");
var Ext =  require("./external/translator");
var RtSeq = require("./midi/rtseq");

// files
var Fs = require('fs');

// tty exit process nice
var tty = require("tty");

/////
var swng = 0.2;
var a = new Phrase(16, []);
a.setStrVel("f000f00f6000f000");
a.swing(swng);

var b = new Phrase(16, []);
b.setStrVel("0ff0");
b.swing(swng);

var c, d, e, f;
c = Gen.phGenerateUniform(36,0.5).swing(swng);
d = Gen.phGenerateUniform(9,0.4).swing(swng);
e = Gen.phGenerateUniform(16,0.3).swing(swng);
f = Gen.phGenerateUniform(12,0.2).swing(swng);

var seq = new RtSeq();
// seq.start();
seq.phParse([a,b]);
seq.start();

// out process
process.openStdin().on("keypress", function(chunk, key) {
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ancient Said Bye");
    seq.stop();
    process.exit();
  }
});

tty.setRawMode(true);
