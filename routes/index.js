const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Party = require('../models/party')
const Invoice = require('../models/invoice/invoice')
const Item = require('../models/items/item')
const Company = require('../models/company')

router.get('/', function(req, res, next) {
  res.render('pages/index', {title: "Index"});
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', {title: "Login"});
});

router.get('/register', function(req, res, next) {
  res.render('pages/register', {title: "Register"});
});

router.get('/home', auth.isAuthorized, async (req, res) =>{
  totalInvoices = await Invoice.countTotalDoucments(req.session.companyId)
  totalParties = await Party.countTotalDoucments(req.session.companyId)
  totalItems = await Item.countTotalDoucments(req.session.companyId)
  totalCompanies = await Company.countTotalDoucments(req.session.userId)
  console.log(totalInvoices,totalItems,totalParties,totalCompanies)
  res.render('homepage/home', {userName: req.session.username, companyName:req.session.companyName, 
                              title: "Home",totalInvoices:totalInvoices,totalItems:totalItems,
                              totalParties:totalParties,totalCompanies:totalCompanies,
                              totalInvoices10000: totalInvoices/100,totalItems500: (totalItems/500)*100,
                              totalParties2000: (totalParties/2000)*100,totalCompanies5: (totalCompanies/5)*100});
});

router.get('/logout', auth.isAuthorized,function(req, res, next) {
  req.session.userId = null;
  res.redirect('/');
});


module.exports = router;
