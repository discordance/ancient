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
    var pd = '',
    i = 0;
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
exports.rotateArray = function (a, c) {
    for (var b = a.length, c = (Math.abs(c) >= b && (c %= b), 0 > c && (c += b), c), d, e; c; c = (Math.ceil(b / c) - 1) * c - b + (b = c)) {
        for (d = b; d > c; e = a[--d], a[d] = a[d - c], a[d - c] = e) {}
    }
    return a;
};

/**
 * Famous function that maps a value from one scale to another, extracted from Processing.org
 */
exports.map = function (value, min1, max1, min2, max2) {
    var norm = function (val, min, max) {
        return (val - min) / (max - min);
    }
    var interp = function (val, min, max) {
        return min + (max - min) * val;
    }
    return interp(norm(value, min1, max1), min2, max2);
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
exports.normalRand = function (mean, stdev) {
    var random = Math.random,
    rnd = (random() * 2 - 1) + (random() * 2 - 1) + (random() * 2 - 1);
    return rnd * stdev + mean;
};

/**
 * Levenshtein distance.
 * Algorithm to compute string similarity score.
 */
exports.levenshtein = function (s1, s2) {
    var n = s1.length,
    m = s2.length,
    matrice = [],
    i = 0,
    j = 0,
    min = Math.min,
    res = 0; /* strings must be of equal size and non-zero length */
    if (n == 0 || n !== m) {
        return (-1.0);
    }
    var minimum = function (arr) {
        return min.apply(null, arr);
    }
    for (i = -1; i < n; i++) {
        matrice[i] = [];
        matrice[i][-1] = i + 1;
    }
    for (j = -1; j < m; j++) {
        matrice[-1][j] = j + 1;
    }
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            var cout = (s1.charAt(i) == s2.charAt(j)) ? 0 : 1;
            matrice[i][j] = minimum([1 + matrice[i][j - 1], 1 + matrice[i - 1][j], cout + matrice[i - 1][j - 1]]);
        }
    }
    res = matrice[n - 1][m - 1];
    return res / n;
}

/**
 * Jaccard distance.
 * Algorithm to compute string similarity score.
 */
exports.jaccard = function (s1, s2) {
    var n = s1.length,
    m = s2.length,
    same = 0,
    diff = 0,
    ct = 0; 
    /* strings must be of equal size and non-zero length */
    if (n == 0 || n !== m) {
        return (-1.0);
    }
    if (s1 == s2) {
        return 0;
    }
    while (ct !== n) {
        if (s1[ct] == s2[ct]) {
            same++;
        } else {
            diff++;
        }
        ct++;
    }
    return (1 - (same / (diff + same)));
}

/**
 * Dic's distance coefficient.
 * Algorithm to compute string similarity score.
 */
exports.dice = function(s1, s2) {
    var nx = [], ny = [], i = 0, j = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0, tmp = '', inter = [], gram = 0;
    // duplicates detection
    var contains = function(a, e) {
        for(j=0;j<a.length;j++)if(a[j]==e)return true;
        return false;
    }
    var unique = function(a){
        var temp = [];
        for(i=0;i<a.length;i++){
            if(!contains(temp, a[i])){
                temp.length+=1;
                temp[temp.length-1]=a[i];
            }
        }
        return temp;
    }
    // sets intersect
    var intersect = function(arr1,arr2){
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                r.push(v);
            }
        }
        return r;
    }
    //
    for (i=0; i < s1.length-1; i++) {
        x1 = s1.charAt(i);
        x2 = s1.charAt(i+1);
        tmp = "" + x1 + x2;
        nx.push(tmp);
    }
    for (j=0; j < s2.length-1; j++) {
        y1 = s2.charAt(j);
        y2 = s2.charAt(j+1);
        tmp = "" + y1 + y2;
        ny.push(tmp);
    }
    nx = unique(nx);
    ny = unique(ny);
    inter = intersect(nx,ny);
    gram = inter.length;
    return 1-((2*gram) / (nx.length+ny.length));
}

/**
 * Lee distance.
 * Algorithm to compute string similarity score.
 */
exports.lee = function(s1,s2) {
    var n = s1.length, m = s2.length, q = 16, i = 0, sum = 0, a = 0, b = 0, c = 0, abs = Math.abs, min = Math.min;
    /* strings must be of equal size and non-zero length */
    if (n == 0 || n !== m) {
        return (-1.0);
    }
    for (i = 0; i < n; i++) {
        a = parseInt(s1[i], 16);
        b = parseInt(s2[i], 16);
        c = abs(a-b);
        sum +=  min(c,q-c); 
    }
    return sum/n;
}

/**
 * Minkowski distance.
 * Algorithm to compute string similarity score.
 * @TODO Problem in char codes
 */
exports.minkowski = function (s1, s2) {
    var p = 1,
    k = 0,
    i = 0,
    j = 0,
    n = s1.length,
    m = s2.length,
    cost = 0,
    d = [],
    distance = 0,
    a = 0,
    b = 0,
    uncost = 0,
    pow = Math.pow,
    abs = Math.abs,
    min = Math.min,
    max = Math.max,
    c = 0;

    //Step 1
    if (n !== 0 && m !== 0) {
        d = [];
        m++;
        n++;
        //Step 2
        for (k = 0; k < n; k++){
            d[k] = k;
        }
        for (k = 0; k < m; k++){
            d[k * n] = k;
        }
        
        //Step 3 and 4
        for (i = 1; i < n; i++)
        {
            for (j = 1; j < m; j++) {
                //Step 5
                uncost = pow(abs(parseInt(s1[i - 1],16) - parseInt(s2[j - 1],16)), p);
                if (parseInt(s1[i - 1],16) == parseInt(s2[j - 1],16)){ 
                    cost = 0;
                }else{ 
                    cost = uncost;
                }
                //Step 6
                a = d[(j - 1) * n + i] + uncost;
                b = d[j * n + i - 1] + uncost;
                c = d[(j - 1) * n + i - 1] + cost;
                d[j * n + i] = (min(a, (min(b, c))));
            }
            distance = d[n * m - 1];
        }
        return distance;
    } else {
     
        return (max(m, n));
    }
}