# Plugin

A plugin implements a feature in Boomerang that is initialized by BOOMR
Following functions are expected to be implemented by the plugin:

- `init(config)` - Initialization of the plugin, passed the BOOMR config
- `is_complete()` - A function telling BOOMR if the plugin has finished running
