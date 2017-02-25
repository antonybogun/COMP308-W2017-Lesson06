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
  //check if the user is logged
  if (!req.isAuthenticated()) {
    return res.redirect('auth/login');
  }
  next();
};

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    games: ''
  });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    games: ''
  });
});

module.exports = router;