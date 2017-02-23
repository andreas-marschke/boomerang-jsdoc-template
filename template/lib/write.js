var path = require("path"),
    fs = require("fs"),
    mkdirp = require("mkdirp");

/**
 * Writes rendered HTML output to destination file
 * @param {string} rendered - Rendered HTML data
 * @param {string} destination - destination fileName
 */
exports.write = function (rendered, destination) {
    var directory = path.dirname(destination);
    var fileName = path.basename(destination);
    if (!path.isAbsolute(directory)) {
	directory = path.resolve(directory);
    }
    
    // Check if the api directory is available or not
    try {
	fs.accessSync(directory, fs.FS_OK);
    }
    catch(exception) {
	mkdirp.sync(directory);
    }

    var destFile = path.join(directory, fileName);
    try
    {
	fs.writeFileSync(destFile, rendered, {encoding: "utf8"});
    }
    catch(exception)
    {
	return false;
    }

    return true;
}
