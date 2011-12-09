/**
 * @author Aymeric Nunge [dscrd]
 * 
 * Basic (simple) Beat Generation and Variations algorithms
 */
var Step = require("../data_structure/step");
var Phrase = require("../data_structure/phrase");
var Util = require("./utilitor");

/**
 * Generates a random Phrase of <size> steps, using the <density> parameter.
 * <density> is used as a 'chance to happen' parametter.
 * Probability distribution is uniform.
 * No special algorithm used here except Math.random();
 */
exports.phGenerateUniform = function (size, density) {
    var i = 0,
    res = [],
    score = 0,
    rand = Math.random,
    floor = Math.floor,
    step, vel = 0;
    
    for (i; i < size; i++) {
        score = rand();
        if (score < density) {
            vel = floor(Util.normalRand(10, 4)); // using normal function, better results that a plain random
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
 * Generates a recurring Phrase of <size> steps, using the <bdiv> parameter. The <cycle> is 4 steps by default.
 * <bdiv> correspond to a beat division and cycle to the loop. Therefor, the bdiv should not be equal or greater than the <cycle>.
 * In fact, this <bdiv> parameter defines the beat division where a more important probability should to be applied.
 */
exports.phGenerateRecurringSimple = function (size, bdiv, cycle, offset) {
    var i = 0,
    res = [],
    prob = 0,
    score = 0,
    step, vel, dist = 0,
    loop = cycle || 4,
    of = offset || 0,
    rand = Math.random,
    floor = Math.floor,
    abs = Math.abs;
    
    for (i; i < size; i++) {
        dist = abs(((i+of) % loop) - bdiv); // get the dist from modulo
        if(dist){
            prob = 1/(dist+2);
        } else {
            prob=0.98; // almost impossible to miss here, but life is a bitch sometimes
        }
        score=rand(); // pure random here
        if(score<prob){
            vel = floor(Util.normalRand(14*prob, 1)); // using normal function, in relation to the prob
            step = new Step(vel, 1, [], false, 0);
        }else{
            vel = 0;
            step = new Step(vel, 1, [], false, 0);
        }
        res.push(step);
    }
    // returns and filter result below 5
    return new Phrase(size, res).filter(5);
};

/**
 * Generates <nb> variations of the <target> Phrase using a Genetic Algorithm.
 * Algo A. String based.
 */
exports.phGAMultipleSimilarVel = function(target, nb){
    var str = target.getStrVel(), pos = 0, res = [], curr = '', ca = '', cb = '', score = 1, ph, i = 0;
    //remove dups
    var unique = function(a) {
        var contains = function(a, e){
            var j;
            for(j=0;j<a.length;j++)if(a[j]==e)return true;
            return false;
        }
        var temp = [];
        for(i = 0; i < a.length; i++){
            if(!contains(temp, a[i])){
                temp.length+=1;
                temp[temp.length-1]=a[i];
            }
        }
        return temp;
    }
    
    while(res.length < nb){
        while(curr.length < str.length){
            ca = str[pos] + str[pos+1];
            while(score > 0.98){
                cb = this.strGenerateNormalVel(ca,9);
                score = Util.wjaccard(ca,cb);
            }
            curr += cb;
            pos += 2;
            score = 1;
        }
        res.push(curr);
        res = unique(res);
        curr = '';
        pos = 0;
    }
    // change to PH
    for (i = 0; i < res.length; i++) {
        ph = new Phrase(target.size, []);
        res[i] = ph.setStrVel(res[i]).filter(5);
    }
    return res;
}

/**
 * Generates a random beat velocity string of the <size> size and a uniform distribution.
 */
exports.strGenerateUniformVel = function(size){
    var res = '', i = 0, v = 0, floor = Math.floor, rand = Math.random;
    if(!size){
        return '';
    }
    for (i; i < size; i++) {
        v = floor(rand()*15);
        res += v.toString(16);
    }
    return res;
}



/**
 * Generates a random beat velocity string of the size of the <target> with a normal distribution.
 * The <noise> arg specifies the standard deviation to apply.
 */
exports.strGenerateNormalVel = function(targ, noise){
    var res = '', l = targ.length, i = 0, v = 0, floor = Math.floor, nrand = Util.normalRand;
    if(!l){
        return '';
    }
    for (i; i < l; i++) {
        v = floor(nrand(parseInt(targ[i],16),noise));
        if(v < 0){
            v = 0; 
        }
        if(v > 15){
            v = 15;
        }
        res += v.toString(16);
    }
    return res;
}