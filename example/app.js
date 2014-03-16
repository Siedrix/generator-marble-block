'use strict';
var express = require('express.io'),
	_       = require('underscore');

// Load conf
var conf = require('./conf');
console.log('Running app.js in', conf.env, 'environment');

var app = express();

// Add session to the app
var RedisStore = require('connect-redis')(express);

app.configure(function () {
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.session({
		store: new RedisStore(conf.redis.options),
		secret: conf.redis.secret
	}));
});

app.get('/env', function (req, res) {
	res.send(conf);
});

app.get('/session', function (req, res) {
	_.each(req.query, function (item, key) {
		req.session[key] = item;
	});

	res.send(req.session);
});

app.listen(3000);