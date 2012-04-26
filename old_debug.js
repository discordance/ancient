/**
 *  @author Aymeric Nunge [dscrd]
 * 
 * Debugger to test the application in the console. 
 */
var Step = require("./data_structure/step");
var Phrase = require("./data_structure/phrase");
var Util = require("./global/utilitor");
var Gen = require("./global/generator");
var RtSeq = require("./midi/rtseq");

// files
var Fs = require('fs');

// tty exit process nice
var tty = require("tty");


var rnd_short_groov = function(){
  var dr = [];
  var rdm = function(){
	return (Math.random()-0.5)*1.9;
  }
  for (var i = 4 - 1; i >= 0; i--) {
    if(i%2){
      dr.push(0.0);
    }else{
      dr.push(rdm());
    }
  }
  return dr;
}

var drifts = rnd_short_groov();

var a = new Phrase(16, []);
a.setStrVel("f00f0000f000f000");
a.setDrifts(drifts);


var b = Gen.phGenerateUniform(16,0.2);
b.setDrifts(drifts);


var c = Gen.phGenerateUniform(16,0.23);
c.setDrifts(drifts);

var d = new Phrase(16, []);
d.setStrVel("60f060f060f060f0");
d.setDrifts(drifts);

var e = Gen.phGenerateUniform(64,0.13);
e.setDrifts(drifts);


var seq = new RtSeq();
seq.phParse([a,b,c,d,e]);
seq.start();


var replaygr = function(){
	
  //drifts = rnd_short_groov();
  var rr = [ [ 0, 0.46218620687723155, 0, 0.3350753579987213 ],
  [ 0, 0.009116608719341456, 0, 0.05734961244743317 ],
  [ 0, 0.6584319620393216, 0, 0.223948274878785 ],
  [ 0, 0.6658368475036696, 0, 0.3443060998572037 ],
  [ 0, 0.12319144064094871, 0, 0.07328604019712656 ],
  [ 0, 0.21208627531304955, 0, 0.09831007523462176 ],
  [ 0, 0.4628883871948346, 0, 0.4089777279412374 ],
  [ 0, 0.09563347508665174, 0, 0.21420855696778743 ],
  [ 0, 0.16631282372400163, 0, 0.16253884334582835 ],
  [ 0, 0.7640080730430782, 0, 0.4365656287875026 ] ]
  drifts = rr[Math.round(Math.random()*9)];


	a.setDrifts(drifts);
	b.setDrifts(drifts);
  c.setDrifts(drifts);
  d.setDrifts(drifts);
  e.setDrifts(drifts);
	seq.stop();
	seq.phParse([a,b,c,d,e]);
	seq.start();
}

var tojson;

// files
Fs.readFile('./learning/db/short_grooves.json', 'utf8', function(err, data){
  if(data == ''){
     tojson = [];
  }else{
    //tojson = JSON.parse(data);
  }
});


// out process
process.openStdin().on("keypress", function(chunk, key) {
  
  var res = {};

  // poor
  if(key && key.name === "z"){
  	res = {input: drifts, output: [0.0]};
    tojson.push(res);
    replaygr();
  }
  // so/so/weird
  if(key && key.name === "s"){
  	res = {input: drifts, output: [0.33]};
    tojson.push(res);
    replaygr();
  }
  // interesting
  if(key && key.name === "w"){
  	res = {input: drifts, output: [0.66]};
    tojson.push(res);
    replaygr();
  }
  // wonder
  if(key && key.name === "f"){
  	res = {input: drifts, output: [1.0]};
    tojson.push(res);
    replaygr();
  }

  // start stop seq
  if(key && key.name === "p"){
  	if(seq.on){
  		seq.stop();
  	}else{
  		seq.start();
  	}

    Fs.writeFile('./learning/db/short_grooves.json', JSON.stringify(tojson), function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
    }); 

  }

  // quit
  if(key && key.name === "c" && key.ctrl) {
    console.log("Ancient Said Bye");
    seq.stop();
    process.exit();
  }
});

tty.setRawMode(true);
