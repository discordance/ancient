/**
 * @author Aymeric Nunge [dscrd]
 *
 * Utility functions and algorithms or other chunck og code that will never be used again in the package, but yet functionnal.
 */

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
    return sum;
}

/**
 * Minkowski distance.
 * Algorithm to compute string similarity score.
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