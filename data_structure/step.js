/**
 * @author Aymeric Nunge [dscrd]
 * 
 * Step class data structure
 * [] <- this stuff
 * 
 * max velocity: 15 (0-15)
 *  will be scaled to 0-127 later
 *  each step can be encoded on 4 bits
 * 
 * additional crtl added 
 *  to control another parameter
 */
// construct
function Step(vel, dur, ctrl, lock, drift) {
    // set vel and check
    this.vel = vel;
    if (vel === undefined || typeof (vel) != "number" || vel > 15 || vel < 0) {
        this.vel = 15;
    }

    // set dur and check
    this.dur = dur;
    if (dur === undefined || typeof (dur) != "number" || dur > 64 || dur < 1) {
        this.dur = 1;
    }

    // set ctrl
    this.ctrl = ctrl;
    if (ctrl === undefined || typeof (ctrl) != "object" || !ctrl.length) {
        this.ctrl = [0, 0, 0, 0];
    }

    // set lock and check
    this.lock = lock;
    if (lock === undefined || typeof (lock) != "boolean") {
        this.lock = false;
    }
    
    // set drift and check
    // lock 
    this.drift = drift;
    if (drift === undefined || typeof (drift) != "number" || drift > 0.99 || drift < -0.99) {
        this.drift = 0;
    }
    
    // check if controls values are valid
    this.checkCtrl();
}

// methods
Step.prototype = {

    // get a copy this step
    copy: function () {
        var cpy_step = new Step();
        cpy_step.vel = this.vel;
        cpy_step.dur = this.dur;
        cpy_step.ctrl = this.ctrl.slice();
        cpy_step.lock = this.lock;
        return cpy_step;
    },

    // check ctrl values
    checkCtrl: function () {
        for (var i = 0; i < this.ctrl.length; i++) {
            if (this.ctrl[i] < 0) {
                this.ctrl[i] = 0;
            }
            if (this.ctrl[i] > 15) {
                this.ctrl[i] = 15;
            }
        }
    }
};

// node.js
module.exports = Step;