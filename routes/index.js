const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


router.get('/', function(req, res, next) {
  res.render('pages/index', {title: "index"});
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', {title: "login"});
});

router.get('/register', function(req, res, next) {
  res.render('pages/register', {title: "register"});
});




router.get('/home', auth.isAuthorized,function(req, res, next) {
  res.render('homepage/home', {userName: req.session.username, companyName:req.session.companyName});
});

router.get('/logout', auth.isAuthorized,function(req, res, next) {
  req.session.userId = null;
  res.redirect('/');
});

module.exports = router;
