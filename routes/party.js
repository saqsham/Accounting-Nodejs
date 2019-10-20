const express = require('express');
const router = express.Router();

router.get('/edit', function(req, res, next) {
    res.render('party/edit_party', {website: "party"});
});

router.get('/list', function(req, res, next) {
    res.render('party/list_party', {website: "party"});
});
  
router.get('/new', function(req, res, next) {
    res.render('party/new_party', {website: "party"});
});

module.exports = router;
