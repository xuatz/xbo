const express = require('express')
const router = express.Router()

const _ = require('lodash')
const Promise = require('bluebird')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(
	'local-signup',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		(username, password, done) => {
			console.log('nani')

			if (!username) {
				return done(null, false, {message: 'No username provided'})
			}

			if (!password) {
				return done(null, false, {message: 'No password provided'})
			}

			User.findOne(
				{
					username: username,
				},
				'-password'
			)
				.exec()
				.then(user => {
					if (user) {
						console.log('Username already taken')
						return done(null, false, {
							message: 'Username already taken',
						})
					}

					return User.create({
						username,
						password,
					})
				})
				.then(newUser => {
					// console.log('newUser', newUser)
					// console.log('newUser._id', newUser._id)
					// console.log('newUser.id', newUser.id)
					return User.findOne(newUser._id, '-password').exec()
				})
				.then(newUser => {
					console.log('newUser', newUser)
					return done(null, newUser)
				})
				.catch(err => {
					return done(err)
				})
		}
	)
)

passport.use(
	'local-login',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		(username, password, done) => {
			if (!username) {
				return done(null, false, {message: 'No username provided'})
			}

			if (!password) {
				return done(null, false, {message: 'No password provided'})
			}

			User.findOne({
				username: username,
			})
				.exec()
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: 'No user found',
						})
					} else {
						user.comparePassword(password, (err, isMatch) => {
							if (err) {
								return done(err)
							}

							if (isMatch) {
								return done(null, user)
							} else {
								return done(null, false, {
									message: 'Password is wrong',
								})
							}
						})
					}
				})
				.catch(err => {
					return done(err)
				})
		}
	)
)

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
	console.log('req.sessionID', req.sessionID)
	res.json({sessionId: req.sessionID})
})

router.post('/login', passport.authenticate('local-login'), (req, res) => {
	console.log('req.sessionID', req.sessionID)
	res.json({sessionId: req.sessionID})
})

module.exports = router
