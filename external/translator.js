/**
 * @author Aymeric Nunge [dscrd]
 * 
 * Translate Ancient's datastructures into something else that can be used to generate events.
 */
var Phrase = require("../data_structure/phrase");
var Util = require("../global/utilitor");


/**
 * Exports an array of phrases in Drums plus plus format http://www.mikekohn.net/music/drumsplusplus.php
 * Nice MIDI util used to generate SMF Files.
 */
exports.arr2dpp = function (phrases, pitchs, bpm) {
    var out=this.dppHead(bpm), i = 0, x = 0, y = 0, max = 0, all=[], names=[], pname='', defo=35;
    // get dpp arrays
    for (i; i < phrases.length; i++) {
        all.push(this.ph2dppPatts(phrases[i], pitchs[i] || defo));
        if(!max){
            max = all[i].length;
        }else{
            if(all[i].length>max){
                max=all[i].length;
            }
        }
    }
    // create patterns
    for (x; x < max; x++) {
        // patt
        pname = 'p'+x;
        names.push(pname);
        out += 'pattern '+pname+'\n{\n\t';
        for(y; y < all.length; y++){
            if(all[y][x]){
                out+=all[y][x] +'\n\t';
            }    
        }
        out += '\n}\n\n';
        y=0;
    }
    out += this.dppButt(names);
    return out;
};

/**
 * Transform a phrase into an array of Dpp patterns
 */
exports.ph2dppPatts = function(phrase, pitch){
    var i=0, nb=0, nn=0, map=Util.map, patt='', out=[], fval=0;
    for (i; i < phrase.steps.length; i++) {     
        if(i%16 == 0){ // dpp do not allow more than 4 beats per pattern, so we must make several patterns %16
            if(i!==0){
                patt += ';';
                out.push(patt);
                patt='';
            }
            patt+=pitch+': ';
            nb++;
        }
        if(phrase.steps[i].vel){
            nn = (i%16)+1;
            fval = map(nn, 1, 17, 1, 5); 
            fval += phrase.steps[i].drift*0.25;
            patt += fval.toFixed(2)+':'+map(phrase.steps[i].vel,0,15,0,255) + ' ';
        }
        if(i == phrase.steps.length-1){
            patt += ';';
            out.push(patt);
        }
    }
    return out;
};

/**
 * @TODO To remove because useless now
 * Exports a phrase in Drums plus plus format http://www.mikekohn.net/music/drumsplusplus.php
 * Nice MIDI util used to generate SMF Files.
 */
/*
exports.ph2dppSong = function (phrase, pitch, bpm) {
    var i=0, nb=0, nn=0, pname='', names=[], endl='', map=Util.map, out=this.dppHead(bpm);
    for (i; i < phrase.steps.length; i++) {
        if(i%16 == 0){ // dpp do not allow more than 4 beats per pattern, so we must make several patterns %16
            if(i!==0){
                out += ';\n}\n\n';
            }
            nb++;
            pname = 'p'+pitch+'_'+nb;
            names.push(pname);
            out += 'pattern '+pname+'\n{\n\t'+pitch+': ';
        }else{
            if(i == phrase.steps.length-1){
                endl=';\n}\n\n';
            }else{
                endl='';
            }
        }
        if(phrase.steps[i].vel){
            nn = (i%16)+1;
            out += map(nn, 1, 17, 1, 5).toFixed(2)+':'+map(phrase.steps[i].vel,0,15,0,255) + ' ';
        }
        out += endl;
    }
    out += this.dppButt(names);
    return out;
};
*/

/**
 * Dumps Header of DPP file
 */
exports.dppHead = function(bpm){
    var out='';
    out+="set bpm="+bpm+";\n";
    out+="set defaultvolume=127;\n";
    out+="set drift=10;\n";
    out+="set timesignature=4/4;\n\n";
    return out;
};

/**
 * Dumps Footer of DPP file
 */
exports.dppButt = function(patterns){
    var out='';
    out+='\n\n';
    out+='song test \n{\n\tplay: ';
    for (i = 0; i < patterns.length; i++) {
        out+=patterns[i];
        if(i==patterns.length-1){
            out+=';'
        }else{
            out+=', '
        }
    }
    out+='\n}\n';
    return out;
}