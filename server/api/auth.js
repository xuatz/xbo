const express = require("express");
const router = express.Router();

const _ = require("lodash");
const Promise = require("bluebird");
const axios = require("axios");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const OAuth1Strategy = require("passport-oauth1").Strategy;

const User = require("../models/user");

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		(username, password, done) => {
			if (!username) {
				return done(null, false, { message: "No username provided" });
			}

			if (!password) {
				return done(null, false, { message: "No password provided" });
			}

			User.findOne(
				{
					username: username
				},
				"-password"
			)
				.exec()
				.then(user => {
					if (user) {
						console.log("Username already taken");
						return done(null, false, {
							message: "Username already taken"
						});
					}

					return User.create({
						username,
						password
					});
				})
				.then(newUser => {
					// console.log('newUser', newUser)
					// console.log('newUser._id', newUser._id)
					// console.log('newUser.id', newUser.id)
					return User.findOne(newUser._id, "-password").exec();
				})
				.then(newUser => {
					return done(null, newUser);
				})
				.catch(err => {
					return done(err);
				});
		}
	)
);

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		(username, password, done) => {
			if (!username) {
				return done(null, false, { message: "No username provided" });
			}

			if (!password) {
				return done(null, false, { message: "No password provided" });
			}

			User.findOne({
				username: username
			})
				.exec()
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: "No user found"
						});
					} else {
						user.comparePassword(password, (err, isMatch) => {
							if (err) {
								return done(err);
							}

							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, {
									message: "Password is wrong"
								});
							}
						});
					}
				})
				.catch(err => {
					return done(err);
				});
		}
	)
);

// https://www.pushbullet.com/authorize?
// client_id=2TXDmPJN0tukzOqu19qvwNCju16SyMb7
// redirect_uri=localhost%3A9000%2Fapi%2Fauth
// response_type=token&scope=everything

// passport.use(
// 	'pushbullet-connect',
// 	new OAuth1Strategy(
// 		{
// 			passReqToCallback: true,
// 			authorizationURL: 'https://www.pushbullet.com/authorize',
// 			clientID: '2TXDmPJN0tukzOqu19qvwNCju16SyMb7',
// 			// clientSecret: 'IlQ1SBBY9fRnWLRVEFSQMxkB5UIS9Rxt',
// 			callbackURL: 'http://localhost:9000/auth/pushbullet/callback'
// 		},
// 		(req, accessToken, refreshToken, profile, done) => {
// 			console.log(profile);
// 			console.log('profile');

// 			if (!req.user) {
// 				console.log(
// 					'there is something wrong, no user found. is the user logged in?'
// 				);
// 				return done(null, false);
// 			}

// 			User.findById(req.user._id)
// 				.exec()
// 				.then(user => {
// 					let newProvider = {
// 						provider: 'pushbullet',
// 						profile,
// 						accessToken,
// 						refreshToken
// 					};

// 					if (!user.accounts) {
// 						user.accounts = [];
// 					}

// 					user.accounts = user.accounts.concat(newProvider);

// 					return user.save().lean().exec();
// 				})
// 				.then(user => {
// 					console.log('user', user);
// 					done(null, user);
// 				})
// 				.catch(err => {
// 					console.log('there is an error!!!');
// 					console.log(err);
// 					done(err);
// 				});
// 		}
// 	)
// );

// =============================================

// router.get('/connect/pushbullet', passport.authenticate('pushbullet-connect'));
// router.get(
// 	'/connect/pushbullet/callback',
// 	passport.authenticate('pushbullet-connect'),
// 	(req, res) => {
// 		res.sendStatus(200);
// 	}
// );
router.get("/connect/pushbullet", (req, res) => {
	let url =
		"https://www.pushbullet.com/authorize?client_id=" +
		"2TXDmPJN0tukzOqu19qvwNCju16SyMb7" +
		"&redirect_uri=" +
		"http://localhost:9000/auth/connect/pushbullet/callback" +
		"&response_type=" +
		"code";

	res.redirect(url);
});
router.get("/connect/pushbullet/callback", (req, res) => {
	console.log(req);
	axios
		.request({
			url: "https://api.pushbullet.com/oauth2/token",
			method: "post",
			data: {
				grant_type: "authorization_code",
				client_id: process.env.PUSHBULLET_APP_CLIENT_ID,
				client_secret: process.env.PUSHBULLET_APP_CLIENT_SECRET,
				code: req.query.code
			}
		})
		.then(resp => {
			console.log("resp.status", resp.status);
			console.log("resp.headers", resp.headers);
			console.log("resp.data", resp.data);

			return User.findOne({
				_id: req.user.id
			})
				.exec()
				.then(user => {
					if (!user.accounts) {
						user.accounts = {};
					}
					user.accounts.pushbullet = resp.data;
					return user.save();
				});
		})
		.then(user => {
			// console.log(user);
			let access_token = user.accounts.pushbullet.access_token;
			//todo fetch pushbullets

			res.redirect("http://localhost:3000");
		})
		.catch(err => {
			console.log(err);
			res.redirect("http://localhost:3000");
		});
});

router.get("/user", (req, res) => {
	// console.log('req.session', req.session);
	// console.log('req.session.cookie', req.session.cookie);
	// console.log('req.session.id', req.session.id);
	// console.log('req.sessionID', req.sessionID);
	// console.log('req.user', req.user);
	if (req.user) {
		res.sendStatus(200);
	} else {
		res.sendStatus(401);
	}
});

router.post("/signup", passport.authenticate("local-signup"), (req, res) => {
	// console.log('req.session', req.session);
	// console.log('req.session.cookie', req.session.cookie);
	// console.log('req.session.id', req.session.id);
	// console.log('req.sessionID', req.sessionID);
	res.sendStatus(200);
});

router.post("/login", passport.authenticate("local-login"), (req, res) => {
	// console.log('req.session', req.session);
	// console.log('req.session.cookie', req.session.cookie);
	// console.log('req.session.id', req.session.id);
	// console.log('req.sessionID', req.sessionID);
	res.sendStatus(200);
});

router.get("/logout", (req, res) => {
	req.logout();
	res.sendStatus(200);
});

module.exports = router;
