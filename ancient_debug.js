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

/*
var Fs = require('fs');
var a = new Phrase(16, []);
a.setStrVel("f000f000f000f000");

var b = new Phrase(16, []);
b.setStrVel("00000000ff000000");

var c = Gen.phLinearMorph(a, b, 0.2);
console.log(c.dumpVel());
*/

var seq = new RtSeq();
seq.start();