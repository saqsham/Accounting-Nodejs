const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {website: "index"});
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', {website: "login"});
});

router.get('/company', function(req, res, next) {
  res.render('company/company', {website: "comapny"});
});

router.get('/addCompany', function(req, res, next) {
  res.render('company/add_company', {website: "add_company"});
});

router.get('/invoice', function(req, res, next) {
  res.render('pages/invoice', {website: "invoice"});
});

router.get('/home', function(req, res, next) {
  res.render('homepage/home', {userName: "defautlt"});
});

router.get('/item', function(req, res, next) {
  res.render('pages/item', {website: "item"});
});

router.get('/party', function(req, res, next) {
  res.render('pages/party', {website: "party"});
});

router.get('/register', function(req, res, next) {
  res.render('pages/register', {website: "register"});
});

module.exports = router;
