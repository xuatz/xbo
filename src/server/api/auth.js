const express = require('express');
const router = express.Router();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const axios = require('axios');

const User = require('../models/user');

const { fetchFreshPushbullets } = require('./bookmarks.js');

const loginTasks = (req, res) => {
  let providers = {};
  if (req.user && req.user.providers) {
    Object.keys(req.user.providers).map(key => {
      if (req.user.providers[key]) {
        providers[key] = true;
        switch (key) {
          case 'pushbullet': {
            fetchFreshPushbullets({
              userId: req.user.id,
              access_token: req.user.providers.pushbullet.access_token
            });
          }
        }
      }
    });
  }
  res.send({
    providers
  });
};

passport.use(
  'local-signup',
  new BasicStrategy((username, password, done) => {
    if (!username) {
      return done(null, false, { message: 'No username provided' });
    }

    if (!password) {
      return done(null, false, { message: 'No password provided' });
    }

    User.findOne(
      {
        username: username
      },
      '-password'
    )
      .exec()
      .then(user => {
        if (user) {
          console.log('Username already taken');
          return done(null, false, {
            message: 'Username already taken'
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
        return User.findOne(newUser._id, '-password').exec();
      })
      .then(newUser => {
        return done(null, newUser);
      })
      .catch(err => {
        return done(err);
      });
  })
);

passport.use(
  'local-login',
  new BasicStrategy((username, password, done) => {
    if (!username) {
      return done(null, false, { message: 'No username provided' });
    }

    if (!password) {
      return done(null, false, { message: 'No password provided' });
    }

    User.findOne({
      username: username
    })
      .exec()
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: 'No user found'
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
                message: 'Password is wrong'
              });
            }
          });
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

router.get('/user', (req, res) => {
  // console.log("req.session", req.session);
  // console.log('req.session.cookie', req.session.cookie);
  // console.log('req.session.id', req.session.id);
  // console.log('req.sessionID', req.sessionID);
  // console.log("req.user", req.user);
  if (req.user) {
    loginTasks(req, res);
  } else {
    res.sendStatus(401);
  }
});

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  // console.log("req.session", req.session);
  // console.log('req.session.cookie', req.session.cookie);
  // console.log('req.session.id', req.session.id);
  // console.log('req.sessionID', req.sessionID);
  // console.log(req.user);
  res.sendStatus(200);
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  loginTasks(req, res);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

// ======

router.get('/connect/pushbullet/callback', (req, res) => {
  axios
    .request({
      url: 'https://api.pushbullet.com/oauth2/token',
      method: 'post',
      data: {
        grant_type: 'authorization_code',
        client_id: process.env.PUSHBULLET_APP_CLIENT_ID,
        client_secret: process.env.PUSHBULLET_APP_CLIENT_SECRET,
        code: req.query.code
      }
    })
    .then(resp => {
      // console.log("resp.status", resp.status);
      // console.log("resp.headers", resp.headers);
      // console.log("resp.data", resp.data);
      return User.findOne({
        _id: req.user.id
      })
        .exec()
        .then(user => {
          if (!user.providers) {
            user.providers = {};
          }
          user.providers.pushbullet = resp.data;
          return user.save();
        });
    })
    .then(user => {
      // console.log(user);
      // let access_token = user.providers.pushbullet.access_token;
      //todo fetch pushbullets
      res.redirect('http://localhost:3000/profile');
    })
    .catch(err => {
      console.log(err);
      res.redirect('http://localhost:3000');
    });
});

module.exports = { router };
