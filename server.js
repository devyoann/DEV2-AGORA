// require modules and controllers
const fs        = require('fs')
const express   = require('express')
const session   = require('express-session')
const mysql     = require('mysql')
const bodyParser= require('body-parser')
const twig      = require('twig')
const bcrypt      = require('bcrypt')
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

// connection database (if settings.mysql.cnct is true connection ok => .config.yml)
// if(settings.mysql.cnct === true) {
//     var connection = function() {
//         return mysql.createPool({
//             host    : settings.mysql.host,
//             port    : settings.mysql.port,
//             user    : settings.mysql.user,
//             password: settings.mysql.pssw,
//             database: settings.mysql.dbts,
//         });
//     }
//     console.log('Connexion reussie');
// }


// const insertViews = function() {
//     db().exec('INSERT INTO views (page) VALUES ("index")');
// };

server.get('/', function(req, res) {
    res.render(views('index'));
});

// server.get('/signin', function(req, res) {
//     res.render(views('login/signin'))
// })
//
// server.post('/signin', function(req, res) {
//
//     let _val = {
//         email   : safety.input(req.body.email),
//         password: safety.hashpassword(req.body.password)
//     }
//
//     let _rs = {
//         type    : '',
//         mess    : ''
//     }
//
//     let selectUser = db.query('SELECT email, password FROM users WHERE ?', _val, function(err, data) {
//         console.log(selectUser.sql)
//
//         if(err) {
//             console.log(err)
//         } else {
//             console.log('ok')
//         }
//     })
// })

var connection = function () {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'agora'
    });
}

server.post('/', function(req, res) {
    // fnc.SessionIsConnect(req, res, 0, settings.server.url)

    let _val = {
        lastname   : req.body.lastname,
        firstname   : req.body.firstname,
        email   : req.body.email,
        birthdate   : req.body.birthdate,
        gender   : req.body.gender,
        password   : req.body.password

    }

    let _rs = {
        type    : '',
        mess    : ''
    }

    let co = connection();
    co.connect();
    co.query('INSERT INTO user VALUES(?)', _val, function(error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password).then(function (password) {
                if (password === true) {
                    var sessData = req.session;
                    sessData.someAttribute = results[0].id;
                    res.redirect('/feed');
                } else {
                    res.render('index.twig', {
                        checkPassword : password
                    })
                }
            })
        } else {
            res.render(views('/'))
        }
    })
})

// server.get('/logout', function (req, res) {
//     req.session.destroy()
//
//     res.redirect(settings.server.url)
//
//     res.end()
// })

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