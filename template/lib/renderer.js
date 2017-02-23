var marked = require("marked");

marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	},
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

function isArray(array) {
	return Object.prototype.toString.call(array) === "[object Array]";
}

module.exports = function () {
	this.nunjucksEnv.addFilter("lookupType", this.lookupType.bind(this));
	this.nunjucksEnv.addFilter("lookupTypes", this.lookupTypes.bind(this));
	
	var content = Object.keys(this.content).map(function(key) {
		return this.content[key];
	}, this);
	renderList.bind(this)(content);
}

function renderList(list) {
	return list.map(render.bind(this));
}

function render(object) {
	if (object.template !== "api-list") {
		if (object.children && object.children.length > 0) {
			renderList.bind(this)(object.children);
		}
	}

	if (typeof object.title === "undefined" || object.file === "undefined") {
		return;
	}
	if (object.examples) {
		console.log(object.examples);
	}
	var rendered = renderChild(renderChildProperties(object));
	renderWrite.bind(this)(rendered);
}

var childrenNames = ["functions", "config", "constants", "events", "params", "properties", "content", "children"];

function renderChildProperties(object) {

	for (var childIndex = 0; childIndex < childrenNames.length; childIndex++) {
		var childName = childrenNames[childIndex];
		if (object[childName] && isArray(object[childName]) && object[childName].length > 0) {
			object[childName] = object[childName].map(renderChild);
			object[childName] = object[childName].map(renderChildProperties);
		}
	}
	
	return object;
}

function checkChildKeys(object) {
	var keys = Object.keys(object);
	return childrenNames.find(function(name) {
		for (var ix = 0; ix < keys.length; ix++) {
			if (keys[ix] === name) {
				return true;
			}
		}
	});
}

function renderChild(object) {
	
	if (object.description) {
		object.description = marked(object.description);
	}

	if (object.content) {
		object.content = marked(object.content);
	}
	
	return object;
}

function findLink(str) {
	var linkWithContentRE = /\[(+*)\]\{@link\s(+*)\}/g,
		linkNoContentRE = /\s\{@link\s(+*)\}/g;

	var linkWithContent = str.match(linkWithContentRE),
		linkNoContent = str.match(linkNoContentRE);

	if (linkWithContent) {
		
	}
}

function renderWrite(object) {
	console.log("File:", object.file, "Template:", object.template + ".html");

	try {
		this.write(this.nunjucksEnv.render(object.template + ".html",
										   object), object.file);
	}
	catch(exception)
	{
		console.error("Rendering Failed!");
		console.error(exception.message, exception.stack);
		console.error(object.name);
		console.error(object.title);
		console.error(object.file);
		console.error(object.template);
	}
}

function log(object) {
	console.log(JSON.stringify(object, null, 2));
} 
