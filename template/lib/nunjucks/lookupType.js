var basicTypes = {
	"object": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
	"string": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
	"number": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
	"null": "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/null"
}

module.exports.lookupTypes = function(arr) {
	return arr.map(function(str) {
		return this.lookupType(str);
	}, this);
}
module.exports.lookupType = function(str) {
	var r, url = "", type, isArray;

	if (!str) {
		return "";
	}
	r = checkArrayAndType(str);
	
	if (r) {
		isArray = true;
		type = r;
		try {
			url = findURL(type);
		}
		catch(exception) {
			url = "undefined";
		}
	}
	else {
		var object = checkModuleReference(str);
		if (object) {
			url = "/" + [this.paths.api, object.module + ".html"].join("/") + "#" + [object.type, object.name].join("~");
			type = object.name
		}
		else {
			type = str;
		}
		
	}


	if (isArray) {
		return this.nunjucksEnv.render("array-type.html", {
			name: type,
			url: url
		});
	} else {
		return this.nunjucksEnv.render("special-type.html", {
			name: type,
			url: url
		});
	}
}

function findURL(name) {
	if (basicTypes[name.toLowerCase()]) {
		return basicTypes[name.toLowerCase()];
	}
	
    return this.content.api.children.filter(function(child) {
		return child.name == "Types";
    })[0].children.filter(function(type) {
		return type.name === name;
	})[0].url;
} 

function checkArrayAndType(str) {
	var re = /^Array\.<(.+)>/;
	var result = str.match(re);
	if (result) {
		return result[result.length - 1];
	} else {
		return null;
	}
} 

function checkModuleReference(str) {
	var re = /^module:(.+)~(event|constant):(.+)$/;
	var result = str.match(re);
	if (result) {
		return {
			module: result[1],
			type: result[2],
			name: result[3]
		}
	} else {
		return null;
	}
} 
