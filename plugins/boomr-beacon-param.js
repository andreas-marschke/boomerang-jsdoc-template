/**
 * @description
 * Define a BeaconParam tag defining a parameter added to the list of params added to the beacon
 * by a plugin.
 * 
 * Documentation usage example:
 * @example
 * /**
 *  * @BeaconParam {string} ex.var - example var added to the beacon
 *  *\/
 * BOOMR.plugins.Example = {
 *   init: function () {
 *     BOOMR.addVar("ex.var", "foobar");
 *   },
 *   is_complete: function() {
 *     return true;
 *   }
 * };
 *
 * Publishing usage example:
 * @example
 * // for all BOOMR.plugins get beacon params
 * taffyData({memberof: "BOOMR.plugins"}).each(function(recordPlugin) {
 *   taffyData({
 *     memberof: recordPlugin.longname,
 *     has: "boomerang"
 *   }).each(function(beaconParamRecord) {
 *     var names = beaconParamRecord.beaconParam.map(function(param) {
 *       return param.name;
 *     });
 *     console.log(recordPlugin.name, names.join(","));
 *   });
 * });
 */
exports.defineTags = function (dictionary) {
    dictionary.defineTag("BeaconParam", {
	canHaveType: true,
	canHaveName: true,
	onTagged: function (doclet, tag) {
	    doclet.boomerang = doclet.boomerang || { beaconParams: [] };
	    doclet.boomerang.beaconParams.push({
		name: tag.value.name,
		description: tag.value.description
	    });
	}
    });
};
