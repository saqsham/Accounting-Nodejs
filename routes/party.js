const express = require('express');
const router = express.Router();

router.get('/edit', function(req, res, next) {
    res.render('party/edit_party', {title: "party"});
});

router.get('/list', function(req, res, next) {
    res.render('party/list_party', {title: "party"});
});
  
router.get('/new', function(req, res, next) {
    res.render('party/new_party', {title: "party"});
});

module.exports = router;
