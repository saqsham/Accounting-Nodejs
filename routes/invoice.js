const express = require('express');
const router = express.Router();

router.get('/edit', function(req, res, next) {
    res.render('invoice/edit_invoice', {title: "invoice"});
});

router.get('/list', function(req, res, next) {
  res.render('invoice/list_invoice', {title: "invoice"});
});

router.get('/new', function(req, res, next) {
  res.render('invoice/new_invoice', {title: "invoice"});
});

router.get('/print', function(req, res, next) {
  res.render('invoice/print_invoice', {title: "invoice"});
});

router.get('/serialList', function(req, res, next) {
  res.render('invoice/serial_list_invoice', {title: "invoice"});
});
module.exports = router;
