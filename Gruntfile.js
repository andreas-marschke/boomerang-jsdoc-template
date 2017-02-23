/**
 * @overview
 * Grunt build definition for the JSDoc Built project
 * 
 * HOW TO RUN:
 *
 *  Tests: grunt test
 *  Linting: grunt lint
 */

/**
 * @constant
 * Lintable files
 */
var LINT_FILES = [
	"template/**/*.js",
	"tests/**/*.js",
	"Gruntfile.js"
];

var WATCH_FILES = [
	"template/**/*.js",
	"template/**/*.html",
	"template/**/*.css",
	"tests/**/*.js",
	"tests/**/*.md",
	"tests/**/*.json"
]

var TEST_DEBUG_PORT=3000;

module.exports = function (grunt) {

	var gruntConfig = {
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			target: LINT_FILES
		},
		express: {
			options: {
				port: TEST_DEBUG_PORT,
				hostname: "0.0.0.0"
			},
			dev: {
				options: {
					script: "tests/server/static.js"
				}
			}
		},
		jsdoc: {
			dist: {
				src: ["tests/fixtures/boomr.js", "tests/fixtures/plugin.js", "tests/fixtures/plugin2.js"],
				jsdoc: "./node_modules/jsdoc/jsdoc.js",
				options: {
					destination: "out",
					package: "tests/fixtures/package.json",
					readme: "tests/fixtures/README.md",
					template: "./template",
					configure: "./jsdoc.conf.json"
				}
			}
		},
		clean: {
			out: ["./out"]
		},
		watch: {
			template: {
				files: WATCH_FILES,
				tasks: ["clean:out", "jsdoc"]
			}
		}
	};
	
	grunt.initConfig(gruntConfig);
	
	/* Load Tasks from NPM */
	grunt.loadNpmTasks("grunt-mocha-test");
	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks("grunt-express-server");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("test", ["lint"], ["mochaTest:test"]);
	grunt.registerTask("default", ["jsdoc", "express", "watch"]);	
};
