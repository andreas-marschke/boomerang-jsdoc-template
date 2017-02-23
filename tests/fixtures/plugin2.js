/**
 * @desc
 * A second plugin to test a list of plugins with
 */
BOOMR.plugins.Plugin2 = {
	/**
	 * @desc
	 * Initialization function
	 * 
	 * @param {BOOMRConfig} config - BOOMR Config Object
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
