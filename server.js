// require modules and controllers
const fs        = require('fs')
const express   = require('express')
const session   = require('express-session')
const mysql     = require('mysql')
const bodyParser= require('body-parser')
const twig      = require('twig')
const stringify = require('json-stringify')
const yaml      = require('js-yaml')
const fnc       = require('./controllers/function.js')
const routes    = require('./controllers/views.js')
const safety     = require('./controllers/secur.js')

// defined express
const server = express()

// configuration file
const settings  = yaml.safeLoad(
    fs.readFileSync('.config.yml', 'utf8')
)

// console.log
var wr = function(str) {
    console.log('[-] '+str)
    return;
}

// function views for live link
var views = function(link) {
    return __dirname+settings.links.views+link;
}

// function assets for live link
var assets = function(type, link) {
    var assets;
    if(type == 'public'){
        assets = settings.links.assets.public+link+'/';
    } else if(type == 'private') {
        assets = __dirname+settings.links.assets.private+link;
    } else {
        return;
    }

    return assets;
}

// connection database (if settings.mysql.cnct is true connection ok => .config.yml)
if(settings.mysql.cnct === true) {
    var db = function() {
        return mysql.createPool({
            host    : settings.mysql.host,
            port    : settings.mysql.port,
            user    : settings.mysql.user,
            password: settings.mysql.pssw,
            database: settings.mysql.dbts,
        });
    }

    db().getConnection(function(err) {
        if(err) wr(err);
        else wr('Connexion à la base de donnée réussie.');
    });

    var db = db();
} else {
    wr('La connexion à la base de donnée est désactivée.');
}

// twig
server.set('view engine', 'twig');

server.use(
    session({
        secret: "%dDFy6g#v!ITP3e65oEmneawJ&zuj7iG",
        resave: true,
        saveUninitialized: true
    })
)

// bodyParser => form (input)
server.use(bodyParser.urlencoded({
    extented : false
}));

server.use(bodyParser.json());

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

// const insertViews = function() {
//     db().exec('INSERT INTO views (page) VALUES ("index")');
// };

server.get('/', function(req, res) {
    res.render(views('index'));
});

server.get('/signin', function(req, res) {
    res.render(views('login/signin'))
})

server.post('/app/signin', function(req, res) {
    let _val = {
        email   : safety.input(req.body.email),
        password: safety.hashpassword(req.body.password)
    }

    let _rs = {
        type    : '',
        mess    : ''
    }

    let selectUser = db.query('SELECT email, password FROM users WHERE ?', _val, function(err, data) {
        console.log(selectUser.sql)

        if(err) {
            console.log(err)
        } else {
            console.log('ok')
        }
    })
})

server.get('/signup', function(req, res) {
    res.render(views('login/signup'))
})

server.post('/signup', function(req, res) {
    // fnc.SessionIsConnect(req, res, 0, settings.server.url)

    let _val = {
        email   : req.body.email
    }

    let _rs = {
        type    : '',
        mess    : ''
    }

    let selectEmail = db.query('INSERT INTO user WHERE ?', _val, function(err, data) {
        if(data != '') {
            console.log(err)
            _rs.type = 'error'
            _rs.mess = 'L\'adresse email est déjà utilisée.'
            res.send(_rs.mess)
        } else {
            let _valNewUser = {
                username    : fnc.Times(),
                firstname   : safety.input(req.body.firstname),
                lastname    : safety.input(req.body.lastname),
                email       : safety.input(req.body.email),
                gender      : safety.input(req.body.gender),
                birthday    : safety.input(req.body.birthday),
                password    : safety.hashpassword(req.body.password)
            }

            let insertNewUser = db.query('INSERT INTO users SET ?', _valNewUser, function(err, data) {
                if(err) {
                    console.log(err)
                    res.send(err)
                } else {
                    req.session.connect = 1
                    req.session.email = 'dmyoann'

                    _rs.type = 'success'
                    _rs.mess = settings.server.url+'/profile'
                    res.send(_rs)

                    res.end()
                }
            })
        }
    })
})

server.get('/logout', function (req, res) {
    req.session.destroy()

    res.redirect(settings.server.url)

    res.end()
})

server.get('/feed', function(req, res) {
    res.render(views('feed'));
});

server.get('/weather', function(req, res) {
    res.render(views('weather'));
});

server.get('/chat', function(req, res) {
    res.render(views('chat'));
});

server.get('/content', function (req, res) {
    console.log(req.session)
    console.log(req.session.user)
    res.send("You can only see this after you've logged in.")
})

server.get('/profile_timeline', function(req, res) {
    res.render(views('profile_timeline'))
})

server.get('/profile_about', function(req, res) {
    res.render(views('profile_about'))
})


let users = function (email, password) {
    console.log(email)
    console.log(password)
}

server.get('/profile', function(req, res) {
    // fnc.SessionIsConnect(req, res, 1, settings.server.url)

    res.render(views('profile'), {
        session : req.session
    })
})

server.listen(settings.port.local, function() {
    wr('server connected on port '+settings.port.local)
})