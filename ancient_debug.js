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

var a = Gen.phGenerateRecurringSimple(128, 2);
var b = Gen.phGenerateRecurringSimple(128, 0);
var c = Gen.phGenerateRecurringSimple(128, 1, 32);
var d = Gen.phGenerateRecurringSimple(128, 2, 16);
var out = Ext.arr2dpp([a,b,c,d],[42,36,39,46],110);

Fs.writeFile("/Users/nunja/Documents/Lab/mid/ancient/test.dpp", out, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 