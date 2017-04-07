const express = require('express');
const router = express.Router();

const _ = require('lodash');
const Promise = require('bluebird');

router.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        next();
    }
});

router.post('/signup', (req, res) => {
    console.log('req.data', req.data);
    console.log('req.body', req.body);

    res.json({
        error: 'username taken',
    });
});

app.post(
    '/login',
    (req, res, next) => {
        console.log('sup boys');
        console.log('body parsing', req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // res.redirect('/users/' + req.user.username);
        res.json({
            user: req.user,
        });
    }
);

module.exports = router;
