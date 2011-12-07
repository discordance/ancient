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
 * Performs an array rotation
 * Not obvious code but fast.
 * @TODO find a more readable solution?
 */
exports.rotateArray = function(a, c) {
    for(var b = a.length, c = (Math.abs(c) >= b && (c %= b), 0 > c && (c += b), c), d, e;c;c = (Math.ceil(b / c) - 1) * c - b + (b = c)) {
        for(d = b;d > c;e = a[--d], a[d] = a[d - c], a[d - c] = e) {
        }
    }    
    return a;
};

/**
 * Famous function that maps a value from one scale to another, extracted from Processing.org
 */ 
exports.map = function (value, min1, max1, min2, max2)
{
    var norm = function(val, min, max){
        return (val - min) / (max - min);
    }
    var interp = function(val, min, max){
        return min + (max - min) * val;
    }
    return interp( norm(value, min1, max1), min2, max2);
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
    var random=Math.random, rnd = (random()*2-1)+(random()*2-1)+(random()*2-1);
    return rnd*stdev+mean;
};

/**
 * Algorithm to compute string similaity score.
 * @TODO
 */
exports.strScore = function(s1, s2) {
  
}