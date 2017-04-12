var express = require('express');
var router = express.Router();

var _ = require('lodash');
var Promise = require('bluebird');

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// passport.use('local-signup', new LocalStrategy(
//         {
//             usernameField: 'username',
//             passwordField: 'password',
//         },
//         (username, password, done) => {
//             console.log('nani');

//             if (!username) {
//                 return done(null, false, { message: 'No username provided' });
//             }

//             if (!password) {
//                 return done(null, false, { message: 'No password provided' });
//             }

//             if (true) {
//                 console.log('its me');
//             } else {
//                 console.log('not me');

//                 User.findOne({
//                     username: username,
//                 })
//                     .exec()
//                     .then(user => {
//                         if (user) {
//                             return done(null, false, {
//                                 message: 'Username already taken',
//                             });
//                         }

//                         return User.create({
//                             username,
//                             password,
//                         }).exec();
//                     })
//                     .then(newUser => {
//                         return done(null, user);
//                     })
//                     .catch(err => {
//                         return done(err);
//                     });
//             }
//         }
//     )
// );


router.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        next();
    }
});

router.post(
    '/login',
    (req, res, next) => {
        console.log('sup boys');
        console.log('body parsing', req.body);
    }
    // passport.authenticate('local'),
    // (req, res) => {
    //     // If this function gets called, authentication was successful.
    //     // `req.user` contains the authenticated user.
    //     // res.redirect('/users/' + req.user.username);
    //     res.json({
    //         user: req.user,
    //     });
    // }
);

module.exports = router;
