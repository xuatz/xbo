const express = require('express');
const router = express.Router();

const _ = require('lodash');
const Promise = require('bluebird');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = router;
