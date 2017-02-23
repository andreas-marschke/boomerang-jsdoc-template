var path = require("path");

module.exports.getChildren = function(category, list) {
	var toc = {};
	list.forEach(function(element) {
		var tutFileName = element.name + ".html";
		var tutCategoryFilePath = path.join(category, tutFileName);
		var url = path.join(this.paths.base, tutCategoryFilePath);
		var file = path.resolve(path.join(this.paths.destination, this.paths.base, tutCategoryFilePath));
		
		toc[file] = {
		    file: file,
			url: url,
			title: this.getTitle(element.title, "tutorials", category),
			depth: category.split(path.sep).length,
			template: "guide",
			content: element.content
		};

		if (element.children && element.children.length > 0)
		{
			var children = this.getChildren(path.join(category, element.name), element.children);
			Object.keys(children).forEach(function(child) {
				toc[child] = children[child];
			});
		}
	}.bind(this));

	return toc;
};

module.exports.getTableOfContents = function(tutorials) {
	var categoryFilePath = path.join(tutorials.name, "index.html");
	var categoryFullPath = path.resolve(path.join(this.paths.destination, this.paths.base, categoryFilePath));

	var children = this.getChildren(tutorials.name, tutorials.children);
	
	return {
		file: categoryFullPath,
		template: "guide",
		url: path.join(this.paths.base, categoryFilePath),
		title: this.getTitle(tutorials.title, "toc", tutorials.name),
		content: tutorials.content,
		children: Object.keys(children).map(function(child) {
			return children[child];
		})
	};
};

module.exports.buildTableOfContents = function(name, toc) {
	this.getTableOfContents(toc);
};

module.exports.addTableOfContents = function(name, toc, pageTitle) {
	this.content[name] = toc;
	this.content[name].pageTitle = pageTitle;
};
