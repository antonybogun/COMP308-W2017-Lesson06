// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// define game model
let game = require('../models/games');

// function  to check if the user is authorized

function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  // check to see if the user is already logged in
  if (!req.user) {
    res.render('auth/login', {
      title: 'Login',
      games: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/games');
  }
});

/* POST /login - process login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/games',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;