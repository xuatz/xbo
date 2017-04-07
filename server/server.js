if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

const cors = require('cors');

let corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
};

//==============================================================
//==============================================================
//==============================================================

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    if (!id) {
        return cb(new Error('deserializeUser failed!!!'));
    }

    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }

        return cb(null, user);
    });
});

passport.use(
    new LocalStrategy((username, password, cb) => {
        if (username) {
            if (username && password) {
                User.findOne({
                    username: username,
                })
                    .exec()
                    .then(user => {
                        if (user) {
                            return cb(null, false, {
                                message: 'Username already taken',
                            });
                        }

                        return User.create({
                            username,
                            password,
                        }).exec();
                    })
                    .then(newUser => {
                        return cb(null, user);
                    })
                    .catch(err => {
                        return cb(err);
                    });
            } else {
                return cb(null, false, {
                    message: 'username or password is invalid',
                });
            }
        }
    })
);

//==============================================================
//==============================================================
//==============================================================

let app = express();

app.set('trust proxy', true); //for express to trust nginx for https delivery
app.use(cors(corsOptions));
// app.use(require('morgan')('combined'));

app.use(
    session({
        store: new RedisStore(),
        secret: 'keyboard cat',
    })
);
// app.use(require('cookie-parser')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('hi guys');
});

app.use(require('./api/random.js'));
app.use(require('./api/auth.js'));

app.listen(9000, function() {
    console.log('Example app listening on port 9000!');
});
