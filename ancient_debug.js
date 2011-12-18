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
var Fs = require('fs');

var tem = new Phrase(32, []);
tem.setStrVel("f000f000f000f000f000f000f000f000");
console.log(tem.dumpVel());
tem.addDelayVel(5, 1);
console.log(tem.dumpVel());
