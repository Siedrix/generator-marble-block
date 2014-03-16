'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var hat = require('hat');


var MarbleBlockGenerator = module.exports = function MarbleBlockGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MarbleBlockGenerator, yeoman.generators.Base);

MarbleBlockGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'projectName',
		message: 'What is your project name?'
	}];

	this.prompt(prompts, function (props) {
		this.projectName     = props.projectName;
		this.redisProdSecret = hat(Math.pow(2, 8));

		cb();
	}.bind(this));
};

MarbleBlockGenerator.prototype.app = function app() {
	this.copy('_package.json', 'package.json');
	this.copy('_app.js', 'app.js');
	this.copy('_conf.js', 'conf.js');

	// Config files
	this.mkdir('config');
	this.copy('config/_dev.json',  'config/dev.json');
	this.copy('config/_prod.json', 'config/prod.json');
	this.copy('config/_test.json', 'config/test.json');
};
