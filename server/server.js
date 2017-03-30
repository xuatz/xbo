if (!process.env.NODE_ENV) {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');

let corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8011',
        'https://pb.xuatz.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
};

let app = express();

app.set('trust proxy', true); //for express to trust nginx for https delivery
app.use(cors(corsOptions));
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", (req,res,next) => {
    console.log(req.method + " " + req.url)
    next()
})

app.get('/', (req, res) => {
    res.send('hi guys');
});

app.use(
    // '/api',
    // cors(corsOptions), isAuth,
    require('./api/random.js')
);

app.listen(9000, function() {
    console.log('Example app listening on port 9000!');
});
