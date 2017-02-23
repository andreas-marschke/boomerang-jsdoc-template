var path = require("path"),
	helper = require("jsdoc/util/templateHelper"),
	nunjucks = require("nunjucks");

var Extractor = require("./extract.js");

Publisher.prototype.log = function () {
	if (this.debug)
	{
		console.log.apply(null, arguments);
	}
}

function Publisher(taffyData, opts, tutorials) {
	this.taffyData = taffyData;

	// Text Encoding
	this.encoding = opts.encoding || "utf8",

	// README.md file
	this.readme = opts.readme || "",

	// [plugins/*.js]
	this.plugins = {};

	// configuration object of jsdoc.conf.json
	this.conf = opts.configure && require(path.resolve(opts.configure)),

	// enable/disable debug based on conf.templates.debug in jsdoc.conf
	this.debug = this.conf.templates && this.conf.templates.debug,

	// Nunjucks config
	this.njOpts = {
		autoescape: false,
		lstripBlocks: true
	};

	// PackageJson file path
	var packageJson = opts.package && require(path.resolve(opts.package));

	// Prefilling with generic data
	this.packageJson = packageJson || {
		name: "genericPackage",
		version: "9.9.9",
		repository: {
			url : "http://example.com",
		},
		license: "WTFL",
		bugs: {
			url: "http://bugs.example.com"
		}
	};

	// Path to template and this file
	this.templPath = path.resolve(path.join(__dirname, ".."));

	// nunjucks templates
	this.loaderDirs = [
		path.resolve(path.join(this.templPath, "views", "layout")),
		path.resolve(path.join(this.templPath, "views", "util")),
		path.resolve(path.join(this.templPath, "views", "titles")),
		path.resolve(path.join(this.templPath, "views"))
	];

	this.paths = {
		// <destination>/<package-name>/<version>/
		base: opts.versioned ? path.join(this.packageJson.name, this.packageJson.version) : "",
		destination: path.resolve(opts.destination)
	};

	// <destination>/<package-name>/<version>/api
	this.paths.api = path.join(this.paths.base, "api"),
	// <destination>/<package-name>/<version>/api/plugins
	this.paths.apiPlugin = path.join(this.paths.api, "plugins"),
	// <destination>/<package-name>/<version>/guides
	this.paths.guides = path.join(this.paths.base, "guides"),
	// <destination>/<package-name>/<version>/howto
	this.paths.howto = path.join(this.paths.base, "howto");

	// FS Loader for Nunjucks Templates
	this.loader = new nunjucks.FileSystemLoader(this.loaderDirs);

	// Nunjucks Environment
	this.nunjucksEnv = new nunjucks.Environment(this.loader, this.njOpts);

	this.tutorials = tutorials;
	this.helper = helper;
	this.helper.setTutorials(this.tutorials);
	
	this.baseRenderOptions = {
		license: this.packageJson.license,
		github: this.packageJson.repository && this.packageJson.repository.url,
		contrib: this.packageJson.bugs && this.packageJson.bugs.url
	};

	this.content = {};

	if (this.readme && this.readme.hasOwnProperty("length") && this.readme.length > 0) {
		var url = path.join(this.paths.base, "index.html");
		var indexPath = path.resolve(path.join(this.paths.destination, url));
		var title = this.getTitle("Boomerang", "simple");
		this.content["index"] = {
			file: indexPath,
			url: url,
			template: "simple",
			content: this.readme,
			title: title,
			children: []
		};
	}
};

Publisher.prototype.findPlugins = function() {
	this.content["api"] = {
		children: [],
		file: path.resolve(path.join(this.paths.destination, this.paths.api, "index.html")),
		title: this.getTitle("API", "toc"),
		template: "sub-toc",
		content: ""
	};

	var plugins = "BOOMR.plugins";
	var pluginChild = {
		name: "Plugins",
		file: path.resolve(path.join(this.paths.destination, this.paths.apiPlugin, "index.html")),
		content: "",
		template: "sub-toc",
		title: this.getTitle("Plugins", "toc"),
		children: []
	};
	this.taffyData({
		memberof: plugins
	}).each(function(record) {
		var name = [plugins, record.name].join("."),
			implName = [plugins, record.name, "impl"].join(".");

		var extractor = new Extractor(name, this.taffyData),
			extractorImpl = new Extractor(implName, this.taffyData);

		var url = path.join(this.paths.apiPlugin, record.name + ".html");
		var pluginObject = {
			file: path.resolve(path.join(this.paths.destination, url)),
			url: url,
			name: record.name,
			title: this.getTitle(record.name, "plugin"),
			template: "api-module",
			description: record.description,
			examples: record.examples,
			config: extractor.getConfig(),
			constants: extractor.getConstants(),
			functions: extractor.getFunctions(),
			events: extractor.getEvents(),
			implementation: {
				functions: extractorImpl.getFunctions(),
				constants: extractorImpl.getConstants()
			}
		};
		pluginChild.children.push(pluginObject);
	}.bind(this));

	this.content.api.children.push(pluginChild);
}

Publisher.prototype.getBOOMR = function() {
	var extractor = new Extractor("BOOMR", this.taffyData),
		extractorImpl = new Extractor("BOOMR.impl", this.taffyData);

	var url = path.join(this.paths.api, "BOOMR.html");
	this.content.api.children.push({
		url: url,
		name: "BOOMR",
		template: "api-module",
		file: path.resolve(path.join(this.paths.destination, url)),
		title: this.getTitle("BOOMR", "simple"),
		description: extractor.getDescription(),
		
		config: extractor.getConfig(),
		constants: extractor.getConstants(),
		functions: extractor.getFunctions(),
		events: extractor.getEvents(),
		implementation: {
			functions: extractorImpl.getFunctions(),
			constants: extractorImpl.getConstants(),
			events: extractorImpl.getEvents()
		}
	});

}

Publisher.prototype.getTypes = function() {
	var extractor = new Extractor("*", this.taffyData);
	var url = path.join(this.paths.api, "Types.html");
	var types = extractor.getTypeDefs();
	
	this.content.api.children.push({
		file: path.resolve(path.join(this.paths.destination, url)),
		url: url,
		name: "Types",
		template: "api-list",
		title: this.getTitle("Types", "simple"),
		description: "",
		children: types
	});
}

Publisher.prototype.write = require("./write.js").write;
Publisher.prototype.getTitle = require("./title.js");

// TODO: Rename/Refactor this because it also includes the contents
var tutorials = require("./tutorials.js");
Publisher.prototype.getChildren = tutorials.getChildren;
Publisher.prototype.getTableOfContents = tutorials.getTableOfContents;
Publisher.prototype.buildTableOfContents = tutorials.buildTableOfContents;
Publisher.prototype.addTableOfContents = tutorials.addTableOfContents;

var lookup = require("./nunjucks/lookupType.js");
Publisher.prototype.lookupType = lookup.lookupType;
Publisher.prototype.lookupTypes = lookup.lookupTypes;


Publisher.prototype.render = require("./renderer.js");

module.exports = Publisher;
