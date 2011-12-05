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

var a = Gen.phGenerateRecurringSimple(128, 0, 1);
var b = Gen.phGenerateRecurringSimple(128, 0, 4);

a.swing(0.33);
b.swing(0.33);
var out, ba;
for (j = 0; j < 3; j++) {
    ba = a.getBytesVel();
    for (var i = 0; i < ba.length; i++) {
        ba[i] = ba[i]&Math.random()*255;
    }
    a.setBytesVel(ba);
    a.filter(5);
    out = Ext.arr2dpp([a,b],[42,36],110);
    Fs.writeFile("/Users/nunja/Documents/Lab/mid/ancient/test"+j+".dpp", out, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 
}
