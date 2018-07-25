'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../models/index');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.apiRepr());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});
// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.put('/update', jwtAuth, (req, res) => {
  const username  = req.user.username;
  console.log(req.body);

  return User
    .findOneAndUpdate({username: username},
      {
        'email': req.body.email
      })
    .then(updatedPost => {
      console.log(updatedPost);
      console.log(`Updating profile for \`${username}\``);
      res.status(204).json(updatedPost);
    }).catch(err => {
      console.log(err);
      res.status(500).json({messgae: `Internal server error`})
    });
});

module.exports = {router};