'use strict';
var express = require('express.io');
var conf = require('./conf');
console.log('Running app.js in', conf.env, 'environment');

var app = express();

app.get('/env', function (req, res) {
	res.send(conf);
});

app.listen(3000);
