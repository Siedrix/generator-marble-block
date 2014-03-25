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

	// Views files
	this.mkdir('views');
	this.mkdir('views/layouts');
	this.mkdir('views/home');
	this.mkdir('views/login');
	this.mkdir('views/app');
	this.copy('views/_helpers.js',  'views/helpers.js');
	this.copy('views/layouts/_main.html',  'views/layouts/main.html');
	this.copy('views/layouts/_app.html',  'views/layouts/app.html');
	this.copy('views/home/_index.html',  'views/home/index.html');
	this.copy('views/app/_index.html',  'views/app/index.html');
	this.copy('views/login/_login.html',  'views/login/login.html');
	this.copy('views/login/_signup.html',  'views/login/signup.html');

	// Public assets
	this.directory('public/',  'public/');

	// Controllers
	this.directory('controllers/',  'controllers/');

	// Lib
	this.directory('lib/',  'lib/');

	// Models
	this.directory('models/',  'models/');

	// Grunt
	this.copy('_Gruntfile.js',  'Gruntfile.js');
	
};
