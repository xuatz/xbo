if (!process.env.NODE_ENV) {
    require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { uri } = require("./models/mongoose.js");
const User = require("./models/user");

let corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
};

//==============================================================

passport.serializeUser(function(user, cb) {
    // console.log("serializeUser()");
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    // console.log("deserializeUser()");
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

//==============================================================
//==============================================================

let app = express();

//==============================================================

let sessionOptions = {
    store: new MongoDBStore({
        uri,
        collection: "sessions"
    }),
    secret: "truly a secretive secret",
    resave: true,
    saveUninitialized: true,
    cookie: {}
};

if (app.get("env") === "production") {
    sessionOptions.cookie.secure = true; // serve secure cookies
}

//==============================================================

app.set("trust proxy", true); //for express to trust nginx for https delivery
app.use(cors(corsOptions));

// app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//==============================================================

app.all("*", (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    } else {
        next();
    }
});

//==============================================================

app.use("/auth", require("./api/auth.js"));

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
