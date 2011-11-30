/**
 * @author Aymeric Nunge [dscrd]
 * 
 * Basic (simple) Beat Generation and Variations algorithms
 */
var Step = require("../data_structure/step");
var Phrase = require("../data_structure/phrase");
var Util = require("./utilitor");

/**
 * Generate a random Phrase using <size> steps, using the <density> parameter.
 * <density> is used as a 'chance to happen' parametter.
 * Probability distribution is uniform.
 * No special algorithm used here except Math.random();
 */
exports.phGenerateUniform = function (size, density) {
  var i = 0,
  res = [],
  score = 0,
  step, vel = 0;
  for (i; i < size; i++) {
    score = Math.random();
    if (score < density) {
      vel = Math.floor(Util.normalRand(10, 4)); // using normal function, better results that a plain random
      step = new Step(vel, 1, [], false, 0);
    } else {
      vel = 0;
      step = new Step(vel, 1, [], false, 0); // silent step
    }
    res.push(step);
  }
  return new Phrase(size, res);
};

/**
 * Generate a recurring Phrase using <size> steps, using the <modulo> parameter.
 * this modulo parameter defines the beat division where a more important probability should to be applied.
 */
exports.phGenerateRecurring = function (size, modulo) {
  var i = 0,
  res = [],
  prob = 0,
  score = 0,
  step, vel, dist = 0,
  abs = Math.abs;
  for (i; i < size; i++) {
    dist = abs(i % 4 - modulo);
    
    if(dist){
      prob = 1/(dist+1);
    } else {
      prob=0.95;
    }
    score=Math.random(); // pure random here
    if(score<prob){
      vel = Math.floor(Util.normalRand(13*prob, 2)); // using normal function, in relation to the prob
      step = new Step(vel, 1, [], false, 0);
    }else{
      vel = 0;
      step = new Step(vel, 1, [], false, 0);
    }
    res.push(step);
  }
  return new Phrase(size, res);
};