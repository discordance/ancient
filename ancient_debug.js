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
var a = Gen.phGenerateRecurringSimple(128,2);
var b = Gen.phGenerateRecurringSimple(128,0);
console.log(Ext.ph2dppPatts(a,36));