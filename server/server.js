if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/user');

let corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
};

//==============================================================

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        (username, password, done) => {
            console.log('nani');

            if (!username) {
                return done(null, false, { message: 'No username provided' });
            }

            if (!password) {
                return done(null, false, { message: 'No password provided' });
            }

            User.findOne({
                username: username,
            })
                .exec()
                .then(user => {
                    if (user) {
                        console.log('hmmm?');
                        return done(null, false, {
                            message: 'Username already taken',
                        });
                    }

                    return User.create({
                        username,
                        password,
                    });
                })
                .then(newUser => {
                    return done(null, newUser);
                })
                .catch(err => {
                    return done(err);
                });
        }
    )
);

passport.serializeUser(function(user, cb) {
    console.log('serializeUser()');
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    console.log('deserializeUser()');
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

//==============================================================
//==============================================================

//==============================================================
//==============================================================

let app = express();

app.set('trust proxy', true); //for express to trust nginx for https delivery
app.use(cors(corsOptions));

// app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ store: new RedisStore(), secret: 'keyboard cat' }));
app.use(require('cookie-parser')());

app.use(passport.initialize());
app.use(passport.session());

//==============================================================

app.all('*', (req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.send('hi guys');
});

// app.use(require('./api/random.js'));
// app.use(require('./api/auth.js'));
// require('./routes')(app);

app.post(
    '/signup',
    (req, res, next) => {
        console.log('sup boys');
        console.log('body parsing', req.body);
        next();
    },
    passport.authenticate('local-signup'),
    (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // res.redirect('/users/' + req.user.username);
        console.log('aaaaaaaaaaaaa', req.user);

        res.json({
            user: req.user,
        });
    }
);

app.listen(9000, function() {
    console.log('Example app listening on port 9000!');
});
// ================================================
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         console.log('hi');
//         return cb(null, {
//             id: 1,
//             username: 'huat ah',
//             password: 'raichu'
//         });
//     }
// ));
//     if (username) {
//         if (username && password) {
//             User.findOne({
//                 username: username,
//             })
//                 .exec()
//                 .then(user => {
//                     if (user) {
//                         return cb(null, false, {
//                             message: 'Username already taken',
//                         });
//                     }
//                     return User.create({
//                         username,
//                         password,
//                     }).exec();
//                 })
//                 .then(newUser => {
//                     return cb(null, user);
//                 })
//                 .catch(err => {
//                     return cb(err);
//                 });
//         } else {
//             return cb(null, false, {
//                 message: 'username or password is invalid',
//             });
//         }
//     }
// }));
// app.post('/signup', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
//         console.log('user', user);
//         return next(null, {
//             id: 1,
//             username: 'username',
//             password: 'password',
//         });
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.redirect('/login');
//         }
//         req.logIn(user, function(err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/users/' + user.username);
//         });
//     })(req, res, next);
// });
// app.post('/signup', passport.authenticate('local'), function(req, res) {
//     console.log('huuuuuu');
//     res.redirect('/raaaa');
// });
// app.get('/login', passport.authenticate('local'), function(req, res) {
//     console.log('huuuuuu');
//     res.redirect('/raaaa');
// });
// // app.post('/login', (req, res, next) => {
// //     console.log('sup boys');
// //     console.log('body parsing', req.body);
// // },
// //     passport.authenticate('local'),
// //     (req, res) => {
// //         // If this function gets called, authentication was successful.
// //         // `req.user` contains the authenticated user.
// //         // res.redirect('/users/' + req.user.username);
// //         res.json({
// //             user: req.user,
// //         });
// //     }
// // );
// app.post(
//     '/signup',
//     (req, res, next) => {
//         console.log('sup boys');
//         console.log('body parsing', req.body);
//         next();
//     },
//     passport.authenticate('local'),
//     (req, res, next) => {
//         console.log('round 2');
//         next();
//     },
//     (req, res) => {
//         console.log('impt check');
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         // res.redirect('/users/' + req.user.username);
//         res.json({
//             user: req.user,
//         });
//     }
// );
