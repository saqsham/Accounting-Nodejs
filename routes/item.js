const express = require('express');
const router = express.Router();

router.get('/edit', function(req, res, next) {
    res.render('item/edit_item', {website: "item"});
});
  
router.get('/list', function(req, res, next) {
    res.render('item/list_item', {website: "item"});
});
  
router.get('/new', function(req, res, next) {
    res.render('item/new_item', {website: "item"});
});  

module.exports = router;
