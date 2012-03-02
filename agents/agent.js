/**
 *  @author Aymeric Nunge [dscrd]
 *	The track agent class contains the necessary 'intelligence' 
 * 	to perform with beats inside a track.
 */


/**
* @class Agent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see GlobalAgent
* @see TrackAgent
*/
Agent = function() {
	/**
	* @property callbacks
	* @type 
	*/
	this.callbacks = null;
	/**
	* @property ticks
	* @type 
	*/
	this.ticks = null;
}


/**
* @method generate
* @return 
*/
Agent.prototype.generate = function() {
	
}

/**
* @method get
* @return 
*/
Agent.prototype.get = function() {
	
}

/**
* @method mutate
* @return 
*/
Agent.prototype.mutate = function() {
	
}

/**
* @method onChange
* @param callback (Object) callback parameter.
* @return 
*/
Agent.prototype.onChange = function(callback) {
	
}

/**
* @method scale
* @return 
*/
Agent.prototype.scale = function() {
	
}

/**
* @method tick
* @return 
*/
Agent.prototype.tick = function() {
	
}

/**
* @event 
*/

/**
* @class TrackAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see Agent
* @see TankAgent
* @see FreemindAgent
* @see RandomerAgent
* @see PowerAgent
*/
TrackAgent = function() {
	/**
	* @property track
	* @type 
	*/
	this.track = null;
}

TrackAgent.prototype = new Agent();

/**
* @method get
* @return 
*/
TrackAgent.prototype.get = function() {
	
}

/**
* @event 
*/

/**
* @class GlobalAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see Agent
* @see EvolverAgent
* @see BassAgent
*/
GlobalAgent = function() {
	/**
	* @property tracks
	* @type 
	*/
	this.tracks = null;
}

GlobalAgent.prototype = new Agent();

/**
* @method get
* @return 
*/
GlobalAgent.prototype.get = function() {
	
}

/**
* @event 
*/

/**
* @class EvolverAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see GlobalAgent
*/
EvolverAgent = function() {
	
}

EvolverAgent.prototype = new GlobalAgent();

/**
* @method evolve
* @return 
*/
EvolverAgent.prototype.evolve = function() {
	
}

/**
* @method generate
* @return 
*/
EvolverAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
EvolverAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
EvolverAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

/**
* @class BassAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see GlobalAgent
*/
BassAgent = function() {
	
}

BassAgent.prototype = new GlobalAgent();

/**
* @method break
* @return 
*/
BassAgent.prototype.break = function() {
	
}

/**
* @method generate
* @return 
*/
BassAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
BassAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
BassAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

/**
* @class TankAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see TrackAgent
*/
TankAgent = function() {
	
}

TankAgent.prototype = new TrackAgent();

/**
* @method generate
* @return 
*/
TankAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
TankAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
TankAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

/**
* @class FreemindAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see TrackAgent
*/
FreemindAgent = function() {
	
}

FreemindAgent.prototype = new TrackAgent();

/**
* @method generate
* @return 
*/
FreemindAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
FreemindAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
FreemindAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

/**
* @class RandomerAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see TrackAgent
*/
RandomerAgent = function() {
	
}

RandomerAgent.prototype = new TrackAgent();

/**
* @method generate
* @return 
*/
RandomerAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
RandomerAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
RandomerAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

/**
* @class PowerAgent
* @tooltip No description available.
* @author Aymeric Nunge
* @version N/A
* @see TrackAgent
*/
PowerAgent = function() {
	
}

PowerAgent.prototype = new TrackAgent();

/**
* @method generate
* @return 
*/
PowerAgent.prototype.generate = function() {
	
}

/**
* @method mutate
* @return 
*/
PowerAgent.prototype.mutate = function() {
	
}

/**
* @method scale
* @return 
*/
PowerAgent.prototype.scale = function() {
	
}

/**
* @event 
*/

