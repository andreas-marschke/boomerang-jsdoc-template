"use strict";

var rimraf = require("rimraf"),
    fs = require("fs"),
    helper = require("jsdoc/util/templateHelper"),
    Publisher = require("./lib/publisher.js");

exports.publish = function(taffyData, opts, tutorials) {
	// Pre-Flight check for undocumented code:
	taffyData({}).each(function(record) {
		if (record.undocumented) {
			console.warn("Undocumented element in AST: ", record.meta.filename + ":" +
						 record.meta.lineno,
						 "{ kind:", record.kind, "}",
						 "- memberof:", record.memberof,
						 "[longname:", record.longname + "]");
		}
	});
	
	var publisher =  new Publisher(taffyData, opts, tutorials);

	console.log(tutorials._tutorials) ;
	["guides", "howto"].forEach(function(tutorial) {
		var toc = publisher.getTableOfContents(tutorials._tutorials[tutorial]);
		publisher.addTableOfContents(tutorial, toc, tutorials._tutorials[tutorial].title);
	});

	publisher.findPlugins();
	publisher.getBOOMR();
	publisher.getTypes();
	publisher.render();
};
