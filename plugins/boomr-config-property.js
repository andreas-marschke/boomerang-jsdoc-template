/**
 * @description
 * Define a ConfigProperty Tag applied to plugin implementation properties changed during `init()` via BOOMRConfig
 *
 * Documentation usage example:
 * @example
 * var impl = {
 *   /**
 *    * @ConfigProperty
 *    * @type {string}
 *    * @desc
 *    * Property changeable through BOOMR.init({})
 *    * \/
 *   example: "abc"
 * }
 *
 * Publishing usage example:
 * @example
 * // for all BOOMR.plugins get configurable flags
 * taffyData({memberof: "BOOMR.plugins"}).each(function(recordPlugin) {
 *   taffyData({ 
 *     memberof: recordPlugin.longname + ".impl",
 *     pluginConfig: {
 *       is: true
 *     }
 *   }).each(function(implRecord) {
 *    console.log(implRecord.name, "-", implRecord.type.names[0]);
 *   });
 * });
 */
exports.defineTags = function (dictionary) {
  dictionary.defineTag("ConfigProperty", {
      canHaveType: false,
      canHaveName: true,
      isNamespace: false,
      mustHaveValue: false,
      mustNotHaveValue: true,
      onTagged: function (doclet) {
	  doclet.pluginConfig = true;
      }
  });
};
