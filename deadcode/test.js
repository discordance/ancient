var str = "";

var supermax_repeats = function (in_str, min_c, max_c) {
        var l = in_str.length;
    }

var sample = [15,0,0,9,15,0,0,0,15,0,0,0,15,0,12,0];

var test = function (sample) {
        var i = 0, j = 0, l = sample.length, res = 0, tt = 0, rep = 0;
        var devs = [
            [],
            [],
            [],
            []
        ];
        var repartition = function (arr) {
                if(!arr.reduce(function(a,b){return a+b;})){
                    return 1;
                }
                var scr = function (arr){
                    var i = 0,l = arr.length, score = 0;
                    for (i; i < l+1; i++) {
                        if(i){
                            if(arr[i%l] == arr[(i-1)%l]){
                                score += arr[i%l];
                            }
                        }
                    }
                    return score;
                };   
                var fullmod = function (x, m) {
                        var r = x % m;
                        return r < 0 ? r + m : r;
                    }
                var i = 0,
                    l = arr.length,
                    j = 0,
                    ll = 0,
                    lll = 0,
                    score = 0,
                    active = [],
                    dev = [],
                    diff = 0;
                for (i; i < l; i++) {
                    if (arr[i]) {
                        active.push(i);
                    }
                }
                ll = active.length;
                lll = ll + active[0];
                j = j + active[0];
                for (j; j < lll; j++) {
                    diff = (active[fullmod(j, ll)] - active[fullmod(j - 1, ll)]) / l;
                    diff = diff < 0 ? diff + 1 : diff;

                    if (diff) {
                        dev.push(diff);
                    }
                }
                return scr(dev.sort());
            };

        for (i = 0; i < l; i++) {
            var range = Math.floor(sample[i] / 4);
            devs[range].push(sample[i]);
            for (j = 0; j < 4; j++) {
                if (j != range) {
                    devs[j].push(0);
                }
            }
        }

        for(j = 0; j < 4; j++){
           rep = repartition(devs[j]);
           
            tt += (j+1);
            res += (j+1) * rep;
           
        }
        return res/tt;
    }

console.log(test(sample));