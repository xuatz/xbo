if (!process.env.NODE_ENV) {
    require("dotenv").config({
        path: ".env.development"
    });
}

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { uri } = require("./models/mongoose.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");

const User = require("./models/user");

//==============================================================

passport.serializeUser(function(user, cb) {
    console.log("serializeUser()");
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    console.log("deserializeUser()");
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

//==============================================================

let corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "https://www.pushbullet.com/authorize"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
};

let sessionOptions = {
    store: new MongoDBStore({
        uri,
        collection: "sessions"
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {}
};

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    sessionOptions.cookie.secure = true; // serve secure cookies
}

//==============================================================
//==============================================================

let app = express();

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

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};
//==============================================================

// app.use(require('./api/random.js'));
app.use("/auth", require("./api/auth.js"));
app.use("/bookmarks", isLoggedIn, require("./api/bookmarks.js").router);

//==============================================================

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
