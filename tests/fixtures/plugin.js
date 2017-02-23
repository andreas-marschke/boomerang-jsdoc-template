/**
 * @memberof BOOMR.plugins.Example.impl
 * @type {string}
 * @const
 * @desc
 * A simple timer constant
 */
var constant_t = 1000;

/**
 * @memberof BOOMR.plugins.Example
 * @desc
 * Implementation object containing functionality and state for [Example]{@link BOOMR.plugins.Example}
 */
var impl = {
	/**
	 * @const
	 * @type {Number}
	 * @desc
	 * A simple constant used to time something
	 */
	constant: 500,
	/**
	 * @desc function called to do XYZ
	 */
	test: function() {

	},
	/**
	 * @ConfigProperty
	 * @type {string}
	 * @desc
	 * A property of the implementation that is changed
	 */
	changeable: ""
};

/**
 * @desc
 * A simple Boomerang Plugin
 * Here is a [Simple Link]{@link http://www.google.com}
 * 
 *
 * @BeaconParam {string} ex.var - Simple beacon param with a string
 * @example
 * //Usage with BOOMR.init()
 * BOOMR.init({
 *   Example: {
 *     enabled: true
 *   }
 * });
 */
BOOMR.plugins.Example = {
	/**
	 * @desc
	 * Initialization function
	 * 
	 * @param {BOOMRConfig} config - BOOMR Config Object
	 * @example
	 * // Example init call
	 * BOOMR.plugins.Example.init({ foo: bar });
	 */
	init: function (config) {

	},
	/**
	 * @desc
	 * Called to check if plugin is complete
	 * @returns {boolean} - true if everything is okay
	 */
	is_complete: function () {
		return false;
	}
};
