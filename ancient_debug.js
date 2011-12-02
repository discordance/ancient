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

var a = Gen.phGenerateRecurringSimple(32, 0, 1);
var b = Gen.phGenerateRecurringSimple(32, 0);
var c = Gen.phGenerateRecurringSimple(32, 0);
console.log(a.dumpVel());
console.log(b.dumpVel());
var out1 = Ext.arr2dpp([a,b],[42,36],110);
a.swing(0.2);
b.swing(0.2);
var out2 = Ext.arr2dpp([a,b],[42,36],110);


Fs.writeFile("/Users/nunja/Documents/Lab/mid/ancient/test1.dpp", out1, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
Fs.writeFile("/Users/nunja/Documents/Lab/mid/ancient/test2.dpp", out2, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
