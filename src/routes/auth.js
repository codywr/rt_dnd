
const express = require('express');

const users = require('../models/users');

const authRouter = express.Router();

//
// TODO: Lot of error handling here that isn't actually being handled correctly
//

//
// Create a new user
authRouter.route('/signUp').post((req, res, next) => {
  if (req.body.signUpUser && req.body.signUpPass) {
    const userData = {
      username: req.body.signUpUser,
      password: req.body.signUpPass,
    };
    users.create(userData, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/Games');
    });
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

//
// Login to an existing user
authRouter.route('/login').post((req, res, next) => {
  if (req.body.loginUser && req.body.loginPass) {
    users.authenticate(req.body.loginUser, req.body.loginPass, (err, user) => {
      if (err || !user) {
        const error = new Error('Wrong username or password.');
        error.status = 401;
        return next(error);
      }
      return res.redirect('/Games');
    });
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});


module.exports = authRouter;
