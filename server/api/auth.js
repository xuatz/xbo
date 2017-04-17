const express = require('express');
const router = express.Router();

const _ = require('lodash');
const Promise = require('bluebird');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

router.post('/signup',
    (req, res, next) => {
        console.log('sup boys');
        console.log('body parsing', req.body);
        next();
    },
    passport.authenticate('local-signup'),
    (req, res) => {
        console.log('aaaaaaaaaaaaa', req.user);
        res.json({
            user: req.user,
        });
    }
);

module.exports = router;
