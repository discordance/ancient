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


var tem = Gen.phGenerateRecurringSimple(16, 0, 4);


var rnd = new Gen.phGenerateUniform(16, tem.getDensity());

console.log(Util.levenshtein(tem.getStrVel(), rnd.getStrVel()));
console.log(Util.jaccard(tem.getStrVel(), rnd.getStrVel()));
console.log(Util.dice(tem.getStrVel(), rnd.getStrVel()));
console.log(Util.minkowski(tem.getStrVel(), rnd.getStrVel()));
console.log(Util.lee(tem.getStrVel(), rnd.getStrVel()));
console.log(tem.getStrVel(), rnd.getStrVel());



