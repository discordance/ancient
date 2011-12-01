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
    // dump velocities
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
    }
};

// node.js
module.exports = Phrase;