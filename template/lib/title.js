module.exports = function(title, type, category) {
	var pkgName = this.packageJson.name,
	    version = this.packageJson.version;

	var config = {
		title: title,
		category: category,
		pkgName: pkgName,
		version: version
	};
	
	return this.nunjucksEnv.render(type + "-title.html", config).replace("\n", "");
}
