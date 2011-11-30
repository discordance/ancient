/**
 * @author Aymeric Nunge [dscrd]
 *
 * utility functions
 */
/**
 * Add leading zeros (useful for dumping phrases)
 */
exports.leadZero = function (n, totalDigits) {
  n = n.toString();
  var pd = '', i=0;
  if (totalDigits > n.length) {
    for (i; i < (totalDigits - n.length); i++) {
      pd += '0';
    }
  }
  return pd + n.toString();
};

/**
 * Takes two nibbles and concat to one byte
 */
exports.nib2byte = function (a, b) {
  return (a << 4) | b;
};

/**
 * Takes one byte and extract two nibbles in an array
 */
exports.byte2nib = function (by) {
  var res = [];
  res[0] = (by >> 4) & 0x0F;
  res[1] = (by & 0x0F);
  return res;
};

/**
 * Generate a fast normal distributed random number based on mean and standard deviation passed in parametters.
 */ 
exports.normalRand = function(mean, stdev) {
  var rnd = (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
  return rnd*stdev+mean;
};