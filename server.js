// require modules and controllers
const fs = require('fs')
const express = require('express')
const session = require('express-session')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const twig = require('twig')
const bcrypt = require('bcrypt')
const stringify = require('json-stringify')
const yaml = require('js-yaml')
const fnc = require('./controllers/function.js')
const routes = require('./controllers/views.js')
const safety = require('./controllers/secur.js')

// defined express
const server = express()

// configuration file
const settings = yaml.safeLoad(
    fs.readFileSync('.config.yml', 'utf8')
)

// console.log
var wr = function (str) {
    console.log('[-] ' + str)
    return;
}

// function views for live link
var views = function (link) {
    return __dirname + settings.links.views + link;
}

// function assets for live link
var assets = function (type, link) {
    var assets;
    if (type == 'public') {
        assets = settings.links.assets.public + link + '/';
    } else if (type == 'private') {
        assets = __dirname + settings.links.assets.private + link;
    } else {
        return;
    }

    return assets;
}

// twig
server.set('view engine', 'twig');


// bodyParser => form (input)
server.use(bodyParser.urlencoded({
    extented: false
}));

// stylesheets / javascript / images / fonts
server.use(assets('public', 'css'),
    express.static(assets('private', 'css'))
);

server.use(assets('public', 'js'),
    express.static(assets('private', 'js'))
);

server.use(assets('public', 'img'),
    express.static(assets('private', 'img'))
);

server.use(assets('public', 'fonts'),
    express.static(assets('private', 'fonts'))
);

// connection database (if settings.mysql.cnct is true connection ok => .config.yml)
if (settings.mysql.cnct == true) {
    var db = mysql.createConnection({
        host: settings.mysql.host,
        user: settings.mysql.user,
        password: settings.mysql.pssw,
        database: settings.mysql.dbts
    })
}

db.connect((err) => {
    if (err) throw err;
    wr('Connexion reussie');
});

server.get('/', function (req, res) {
    res.render(views('index'));
});

server.post('/', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, 10);
    let sql = 'INSERT INTO user(`lastname`, `firstname`, `email`, `birthdate`, `gender`, `password`, `repassword`) VALUES("' + req.body.lastname + '", "' + req.body.firstname + '", "' + req.body.email + '", "' + req.body.birthdate + '", "' + req.body.gender + '", "' + hash + '", "' + hash + '")';
    db.query(sql, (err, result) => {

        if (err) throw err;
        wr('Insertion reussie');
        res.send('You are now signed up');
    })
});

server.get('/feed', function (req, res) {
    res.render(views('feed'));
});

server.get('/weather', function (req, res) {
    res.render(views('weather'));
});

server.get('/chat', function (req, res) {
    res.render(views('chat'));
});

server.get('/profile_timeline', function (req, res) {
    res.render(views('profile_timeline'))
})

server.get('/profile_about', function (req, res) {
    res.render(views('profile_about'))
})

server.listen(settings.port.local, function () {
    wr('server connected on port ' + settings.port.local)
})