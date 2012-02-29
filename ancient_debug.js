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
var swng = 0.0;
var a = new Phrase(16, []);
a.setStrVel("f000f00f6000f000");

var b = new Phrase(16, []);
b.setStrVel("f5f5f5f5f5f5f5f5");
b.swing(swng);

var c, d, e, f;
c = Gen.phGenerateUniform(32,0.5).swing(swng);
d = Gen.phGenerateUniform(32,0.4).swing(swng);
e = Gen.phGenerateUniform(32,0.3).swing(swng);
f = Gen.phGenerateUniform(32,0.2).swing(swng);

var seq = new RtSeq();
// seq.start();
seq.phParse([a,b,c,d,e,f]);
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
