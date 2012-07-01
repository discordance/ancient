/**
 *  @author Aymeric Nunge [dscrd]
 * 
 * Phrase class data structure
 * [][][][] [][][][] [][][][] [][][][] | [][][][] [][][][] [][][][] [][][][] <- this stuff x4 max
 *  .     .                          .
 *  .     .                          .
 *  .     .                          .
 *   squav beat                       bar 
 *                   
 * * * * * * * * * *
 * max in bar  8   *
 *     in beat 32  * * *
 *     in semiquav 128 *
 * * * * * * * * * * * *
 */
// node.js
var Step = require("../data_structure/step");
var Util = require("../global/utilitor");

// construct
function Phrase(size, steps) {
  // set size and check
  this.size = size; // max quav in the pharse, the loop size in fact
  if (size === undefined || size > 128 || size < 4) {
    this.size = 32;
  }
  // set steps and check
  this.steps = steps;
  if (steps === undefined || !(steps instanceof Array)) {
    this.steps = [];
  }

  this.clean(); // make a correct phrase
  this.fix(); // fix durations
}

// methods
Phrase.prototype = {

  // clean up the steps of the phrase to fit perfectly with the maximum
  clean: function () {
    var l = this.steps.length, i = 0, rest = 0, silStep;
    if (l < this.size) { // need to complete with silent steps
      rest = this.size - l;
      for (i; i < rest; i++) {
        silStep = new Step(0, 1, 15, false);
        this.steps.push(silStep);
      }
    }
    if (l > this.size) { // need to delete extra steps.
      this.steps.length = this.size;
    }
  },
  // repare durations.
  // we don't want to have a step duration that exceeds the start time of the next step.
  fix: function () {
    var l = this.steps.length, i = 0, j = 1, step, ahead = 0;
    for (i; i < l; i++) {
      step = this.steps[i];
      if (step.dur <= 1) {
        step.dur = 1;
      //continue; ?useful ?
      } // no problem
      else {
        if (step.dur > this.size) {
          step.dur = this.size;
        }
        // count how much silent step we need to have ahead
        ahead = step.dur - 1; // steps we need ahead
        //look ahead and correct
        for (j; j < ahead + 1; j++) {
          if (this.steps[i + j].vel) {
            step.dur = (i + j) - i;
            break;
          }
        }
      }
    }
    // allow chaining
    return this;
  },
  // dump velocities
  dumpVel: function () {
    // function to pass to the dumper
    var showVel = function (step) {
      var str = '';
      if (!step.vel) {
        str += '..';
      } else {
        str += Util.leadZero(step.vel, 2);
      }
      return str;
    };
    return this.dumper(showVel);
  },
  // dump if step will generate a sound (on based on velocity)
  dumpOn: function () {
    // show an aspect of the passed step: 
    // if velocity is 0, silence. 
    // if velocity is below 5, considered as noise.
    // else, the step is on
    var showOn = function (step) {
      var str = '';
      if (!step.vel) {
        str += '.';
      } else if (step.vel < 5) {
        str += "x"; // noise
      } else {
        str += "X";
      }
      return str;
    };
    return this.dumper(showOn);
  },
  // dump steps locked
  dumpLock: function () {
    var showLock = function (step) {
      var str = '';
      if (!step.lock) {
        str += '.';
      } else {
        str += "=";
      }
      return str;
    };    
    return this.dumper(showLock);
  },
  // dump steps duration
  dumpDur: function () {
    var showDur = function (step) {
      var str = '';
      if (!step.vel) {
        str +='.*';
      }
      else{
        str +=step.dur;   
      }
      return str;
    };    
    return this.dumper(showDur);
  },
  // dump steps duration
  dumpDrift: function () {
    var showDrift = function (step) {
      var str = '';
      if (!step.drift) {
        str +='.*';
      }
      else{
        str +=step.drift;   
      }
      return str;
    };    
    return this.dumper(showDrift);
  },
  // dumper function show a console formated dump of the phrase, focusing on a specific representation of the steps.
  // focus is defined by a function that we pass to the dumper, this function must accept a step obj and returns a string.
  dumper: function (what) {
    var str = '', l = this.steps.length, step, i = 0;
        
    for (i; i < l; i++) {
      step = this.steps[i];
      str += '[';
      // use the passed what function to represent a specific view of the step
      str += what(step);
      //
      str += ']';
      if ((i + 1) % 4 === 0) {
        str += ' ';
      }
      if ((i + 1) % 16 === 0 && (i + 1) % this.size !== 0) {
        str += ': ';
      }
    }
    return str;
  },
  // get a copy of this phrase
  copy: function () {
    var cpy_steps = [];
    for (var i = 0; i < this.steps.length; i++) {
      cpy_steps[i] = this.steps[i].copy();
    }
    return new Phrase(this.size, cpy_steps);
  },
  // reverse the steps in phrase.
  reverse: function () {
    this.steps.reverse();
    this.fix();
    // allow chaining
    return this;
  },
  // mute steps below a threshold
  filter: function(v) {
    var l = this.steps.length;
    for (var i = 0; i < l; i++) {
      var step = this.steps[i];
      if(step.vel < v){
        step.vel=0;
      }
    }
    // allow chaining
    return this;
  },
  // shift left by the number of steps
  lshift: function(shft){
    shft = shft < 0 ? -shft : shft;
    Util.rotateArray(this.steps, -shft);
    // allow chaining
    return this;
  },
  // shift right by the number of steps
  rshift: function(shft){
    shft = shft < 0 ? -shft : shft;
    Util.rotateArray(this.steps, shft);
    // allow chaining
    return this;
  },
  // swing the phrase by a percent
  // @TODO confirm that this behaviour is good, because duration in not yet useful
  swing: function (amnt){
    var l = this.steps.length, mod=0; 
    amnt = amnt < 0 ? -amnt : amnt;
    for (var i = 0; i < l; i++) {
      var step = this.steps[i];
      mod=i%2;
      if(mod){
        step.drift = amnt;
      }
    }
    // allow chaining
    return this;
  },
  // reset the drift values (de-swing)
  flatten: function (){
    var l = this.steps.length;
    for (var i = 0; i < l; i++) {
      var step = this.steps[i];
      step.drift=0;
    }
    // allow chaining
    return this;
  },
  // get all the Phrase's drift values in an array.
  getDrifts: function(){
    var res=[], i=0, l=this.steps.length;
    for (i = l - 1; i >= 0; i--) {
      res.push(this.steps[i].drift);
    };
    return res;
  },
  // sets all the Phrase's drift values from an array
  setDrifts: function(drifts){
    var i=0, l=this.steps.length, dl = drifts.length;
    for (i = 0; i < l; i++) {
      this.steps[i].drift = drifts[i%dl];
    };
    // allow chaining
    return this;
  },
  // transform step velocities in computable bit string
  getBitVel: function(){
  // @TODO figure out if it should be implemented
  },
  // translate a bit string into real velocities
  setBitVel: function(){
  // @TODO figure out if it should be implemented
  },
  // transform step velocities in computable hex string
  getStrVel: function(){
    var i, l = this.steps.length, str='';
    for (i = 0; i < l; i++) {
      str+=(this.steps[i].vel).toString(16);
    }
    return str;
  },
  // translate a hex string into real velocities
  setStrVel: function(str){
    var i, l = str.length;
    for(i = 0; i < l; i++){
      if(!this.steps[i].lock){
        this.steps[i].vel = parseInt(str[i], 16);
      }
    }
    // allow chaining
    return this;
  },
  // transform steps velocities in byte array
  getBytesVel: function(){
    var i, a, b, ba = [], toByte = Util.nib2byte, l = this.steps.length;
    for (i = 0; i < l; i+=2) {
      a=this.steps[i];
      b=this.steps[i+1];
      if(a && b){
        ba.push(toByte(a.vel, b.vel));
      }
    }
    return ba;
  },
  // gets a byte array and sets this phrase steps velocities from it
  setBytesVel: function(bys){
    var i, toNibs = Util.byte2nib, l = bys.length, nibz=[], s1, s2;
    for (i = 0; i < l; i++) {
      nibz=toNibs(bys[i]);
      s1 = this.steps[i*2];
      s2 = this.steps[(i*2)+1];
      if(!s1.lock){ // check locks
        s1.vel = nibz[0];
      }
      if(!s2.lock){
        s2.vel = nibz[1];
      }
    }
    // allow chaining
    return this;
  },
  // diminution using the AND algorithm. <iter> indicates the number of iteration applied to the algorithm.
  // locked steps are not affected.
  minimizeAnd: function(iter){
    var ba = [],i = 0, j = 0;
    for (i; i < iter; i++) {
      ba = this.getBytesVel();
      for (j = 0; j < ba.length; j++) {
        ba[i] = ba[i]&Math.random()*255;
      }
      this.setBytesVel(ba);
      this.filter(5);
    }
    return this;
  },
  getRecurrenceVel: function(){
    var i = 0, l = this.steps.length, j = 0, ll = 0, score = 0, active = [0], dev = [], diff = 0;

    for(i; i < l; i++){
      if(this.steps[i].vel > 4){
          active.push(i);
      }
    }
    active.push(l);
    ll = active.length;
    for(j; j < ll; j++)
    {
      if(j){
        diff = (active[j] - active[j-1])/l;
        if(diff){
          dev.push(diff);
        }
      }
    }
    
    return dev;
  },
  // evaluate phrase repartition
  getRepartitionVel: function(){
    var i = 0, l = this.steps.length, map = Util.map, floor = Math.floor, tt = 0, active = [], split;
    for(i; i < l; i++){
        if (this.steps[i].vel > 4){
            active.push(i); // record active pos;
        }
    }
   split = floor(active.length/2);
   return active[split] / l; 
  },
  // evaluate phrase loudness density
  getDensityVel: function(){
    var i = 0, l = this.steps.length, map = Util.map, curr = 0, tt = 0;
    for(i; i < l; i++){
      curr = map(this.steps[i].vel, 0, 15, 0, 1);
      tt += curr;
    }
    return tt/l;
  },
  // trial to improve the addDelayVel function below with a new approach.
  // use <time> to set the beat division, and <amount> to set the amount in percent of delay and steepness of the curve.
  // rocks a lot more.
  addDelayVel: function (time, amount){
    var dlys = [], steps = this.steps, j = 0, k = 0, max = Math.max, maxval = 0;
    // fill an array with zero values * nb;
    var getZeroArr = function(nb){
      var i = 0, arr = [];
      for(i; i < nb; i++){
        arr[i] = 0;
      }
      return arr;
    }
    // detect velocities in steps and make a delayed array for each of the steps.
    var fillDlys = function(){
      var i = 0, l = steps.length, dlarr, ct = 0, x = 0, org = 0, veld = 0, floor = Math.floor, maxarr = [];
      var res = [];
      for(i; i < l; i++){
        if(steps[i].vel){ 
          // calculate inverse function delay 
          // temp array of delays values for this step. should be equal to the total length of the phrase.
          dlarr = getZeroArr(l); // we init with 0 vars
          ct = i+time;
          x = 1;
          org = steps[i].vel;
          for(ct; ct < l+i; ct+=time){
            veld = floor(org*(amount/x));
            dlarr[ct%16] = veld;
            x++;
          }
          //
          res.push(dlarr);
        }
      }
      return res;
    }
    // check code (ugly duh)
    amount = (amount > 1) ? 1 : amount;
    amount = (amount < 0) ? 0.1 : amount; 
    time = (time < 1) ? 1 : time;
    dlys = fillDlys(); 
    // got delays per step.
    // doing the mixin to flatten delays
    for (k; k <  steps.length; k++){
      j = 0;
      maxarr = [];
      for (j; j < dlys.length; j++){
        maxarr[j] = dlys[j][k];
      }
      maxval = max.apply(null, maxarr);
      if(steps[k].vel){
        steps[k].vel = max.apply(null, [steps[k].vel, maxval]);
      }else{
        steps[k].vel = maxval;
      }
    }
    return this;
  }
};

// node.js
module.exports = Phrase;