const express = require('express');
const router = express.Router();

router.get('/home', function(req, res, next) {
  res.render('homepage/home', {userName: "defautlt"});
});

router.get('/', function(req, res, next) {
  res.render('pages/index', {title: "index"});
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', {title: "login"});
});

router.get('/register', function(req, res, next) {
  res.render('pages/register', {title: "register"});
});

module.exports = router;
