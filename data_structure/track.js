/**
 * @author Aymeric Nunge [dscrd]
 * 
 * Tracks holds the whole generated data structure, and the instrument connected to the patterns.
 * This contains a multidimensional matrix of Phrases with is used to represent Complexification and Variation.
 * Tracks holds thus the "instrument feel". Generative algorithms will be applied following ruleset and a track
 * defines a ruleset.
 * @TODO think about a structure / architecture here because it's tough
 */
// imports
var Step = require("../data_structure/step");
var Phrase = require("../data_structure/phrase");
var Util = require("../global/utilitor");

// construct
function Track(chan, pitch, size, base) {
  // Complexity ratio. 0.5 is the middle and the result is equal to the base Phrase.
  this.complexity = 0.5;
  // Variation ratio. 0 is the base without any variations.
  this.variation = 0;
  // set (midi)chan and check
  this.chan = chan;
  if (chan === undefined || typeof (chan) != "number" || chan > 15 || chan < 0) {
    this.chan = 10; // default drum track
  }
  // set (midi)pitch and check
  this.pitch = pitch;
  if (pitch === undefined || typeof (pitch) != "number" || pitch > 127 || pitch < 0) {
    this.pitch = 36; // default bassdrum track
  }
  // set size and check
  this.size = size; // max quav in the pharse, the loop size in fact
  if (size === undefined || size > 128 || size < 4) {
    this.size = 32;
  }
  // set base and check
  this.base = base;
  if (base === undefined || !(base instanceof Object)) {
    this.base = new Phrase(this.size, []);
  }
  // Complexity Levels. Stores an Array of 4 precomputed levels of complexity.
  this.levels = [];
  // Result. Is the resulting phrase that after all transformations have been applied;
  this.result = base;
}

// methods
Track.prototype = {
  
}