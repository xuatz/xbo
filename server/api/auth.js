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

module.exports = router;
