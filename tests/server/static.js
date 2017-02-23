var path = require("path"),
    fs = require("fs"),
    http = require("http"),
    express = require("express"),
    serveStatic = require("serve-static");

var rootPath = path.join(__dirname, "..", "..");
var assetsPath = path.resolve(path.join(rootPath, "template", "assets"));
var generatedHtmlPath = path.resolve(path.join(rootPath, "out"));

var app = express();
app.use("/assets", express.static(assetsPath));
app.use(express.static(generatedHtmlPath));

var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
	console.log("HTTP Server Running");
});
