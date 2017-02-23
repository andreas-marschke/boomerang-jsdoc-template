/**
 * @typedef {Object} Resource
 * @memberof AutoXHR
 *
 * @desc
 * Resource objects define properties of a page element or resource monitored by {@link AutoXHR}.
 *
 * @property {string} initiator - Type of source that initiated the resource to be fetched:
 * 				  `click`, `xhr` or SPA initiated
 * @property {string} url - Path to the resource fetched from either the HTMLElement or XHR request that triggered it
 * @property {object} timing - Resource timing information gathered from internal timers or ResourceTiming if supported
 * @property {Timing} timing - Object containing start and end timings of the resource if set
 * @property {?onComplete} [onComplete] - called once the resource has been fetched
 */

/**
 * @callback BOOMR~onComplete
 * @desc
 * Hook called once a resource is found to be loaded and timers have been set.
 */

/**
 * @typedef PendingEvent
 * @memberof AutoXHR
 * @private
 * @desc
 * An event on a page instrumented by {@link AutoXHR#MutationHandler} and monitored by AutoXHR
 *
 * @property {string} type - The type of event that we are watching (`xhr`, `click`, [SPAs]{@link BOOMR#constants.BEACON_TYPE_SPAS})
 * @property {number} nodes_to_wait - Number of nodes to wait for before event completes
 * @property {Resource} resource - The resource this event is attached to
 * @property {boolean} complete - `true` if event completed `false` if not
 * @property {?Resource[]} resources - multiple resources that are attached to this event
 */

/**
 * @typedef Timing
 * @memberof AutoXHR
 * @private
 * @desc
 * Timestamps for start of a request and end of loading
 *
 * @property {TimeStamp} loadEventEnd - Timestamp when the resource arrived in the browser
 * @property {TimeStamp} requestStart - High resolution timestamp when the resource was started to be loaded
 */

/**
 * @memberof BOOMR
 * @desc
 * Event fired when a beacon is to be sent
 * @event BOOMR#onbeacon
 * @type {object}
 * @property {object[]} vars - Configuration
 */

/**
 * @memberof BOOMR
 * @desc
 * Fired when a page is ready. ie
 * - onload
 * - SPA nav is done
 * @event BOOMR#page_ready
 * @property {object} event - Event object
 */

/**
 * @memberof BOOMR
 * @desc
 * Fired when an XHR event comes back or manual triggered a responseEnd()
 * @event BOOMR#xhr_load
 * @property {string} name - Source name
 * @property {object} data - Data for the Event
 */

/**
 * @memberof BOOMR
 * @desc
 * Implementation object containing functionality and state for [BOOMR]{@link BOOMR}
 */
var impl =	{

}

/**
 * @desc
 * Main Object accessible on the global scope
 */
var BOOMR = {
	/**
	 * @desc
	 * Simple function call on BOOMR
	 * @method
	 */
	func: function() {
	},
	/**
	 * @desc
	 * Fires event {@link BOOMR#page_ready} when page is ready
	 */
	firePageReady: function() {
		
	},
	/**
	 * @desc
	 * Propery containing event names and function handle callbacks
	 * @property events
	 * @type {object}
	 */
	events: {
		/**
		 * @property {function[]} events.event1 - Array of callbacks for event1
		 */
		event1: []
	},
	/**
	 * @desc
	 * Attaches listener to [page_ready]{@link BOOMR#page_ready}
	 * @param {module:BOOMR~event:page_ready} event - page ready EventObject
	 * @listens module:BOOMR~event:page_ready
	 */
	onPageReady: function(event) {
		
	},
	/**
	 * @desc
	 * Function with multiple optional params
	 * @param {(null|object|string|number[])} item - some description
	 */
	multi: function(item) {

	} 
};
