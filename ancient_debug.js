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

var tem = Gen.phGenerateRecurringSimple(128, 0, 1);
var score = 1;
console.log("beat to match is: "+tem.getStrVel());

var res = Gen.phGAMultipleSimilarVel(tem,150);

for (var i = 0; i < res.length; i++) {
  console.log(res[i].getStrVel());
}
