# How to Write a Plugin

```javascript
/**
 * Skeleton template for all boomerang plugins.
 */

(function() {

	// First make sure ...
	BOOMR.plugins = BOOMR.plugins || {};

	var impl = {
	};

	BOOMR.plugins.Plugin = {
		init: function(config) {
			var properties = ["prop1", "prop2"];	// list of user configurable properties in O

			// ...
			BOOMR.utils.pluginConfig(impl, config, "MyPlugin", properties);
			return this;
		},

		// Any other public methods would be defined here
		is_complete: function() {
			// ...
		}
	};

}());
```
