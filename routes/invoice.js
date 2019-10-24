const express = require('express');
const router = express.Router();

router.get('/edit', function(req, res, next) {
    res.render('invoice/edit_invoice', {title: "Edit Invoice"});
});

router.get('/list', function(req, res, next) {
  res.render('invoice/list_invoice', {title: "List Invoice"});
});

router.get('/new', function(req, res, next) {
  res.render('invoice/new_invoice', {title: "New Invoice"});
});

router.get('/print', function(req, res, next) {
  res.render('invoice/print_invoice', {title: "Print Invoice"});
});

router.get('/serialList', function(req, res, next) {
  res.render('invoice/serial_list_invoice', {title: "Serial List Invoice"});
});
module.exports = router;
