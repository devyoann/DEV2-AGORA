const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const bodyParser = require('body-parser');
const twig = require('twig');
const port = 1337;

const server = express();

server.set('view engine', 'twig');

server.use('/assets/css', express.static(__dirname + '/public/assets/css'));
server.use('/assets/js', express.static(__dirname + '/public/assets/js'));
server.use('/assets/img', express.static(__dirname + '/public/assets/img'));
server.use('/assets/fonts', express.static(__dirname + '/public/assets/fonts'));


server.get('/', function(req, res) {
    res.render(__dirname + '/views/index');
});

server.get('/feed', function(req, res) {
    res.render(__dirname + '/views/feed');
});

server.get('/weather', function(req, res) {
    res.render(__dirname + '/views/weather');
});

server.listen(port, function() {
    console.log('Server listining on port ' + port);
});