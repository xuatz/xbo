if (!process.env.NODE_ENV) {
    require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

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
    cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
    // console.log("deserializeUser()");
    return User.get(id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
});

//==============================================================
//==============================================================

let app = express();

//==============================================================

let sessionOptions = {
    // store: new MongoDBStore({
    //     uri,
    //     collection: "sessions"
    // }),
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

app.use("/auth", require("./api/auth.js").router);
// app.use("/bookmarks", require("./api/bookmarks.js").router);

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
