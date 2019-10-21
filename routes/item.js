const express = require('express');
const router = express.Router();
const Item = require('../models/item')

router.get('/edit', function(req, res, next) {
    res.render('item/edit', {title: "item"});
});
  
router.get('/list', function(req, res, next) {
    res.render('item/list', {title: "item"});
});
  
router.get('/new', function(req, res, next) {
    res.render('item/new', {title: "item"});
});  

router.post('/new', function (req, res, next) {
    const newItemData = new Item ({
        newModelName: req.body.modelName,
        newCompany: req.body.newCompany || req.body.addCompany,
        hsn: req.body.hsn,
        newItem: req.body.newItem || req.body.addItem,
        tax: req.body.tax,
        price: req.body.price,
    });
    
    Item.create(newItemData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            // req.session.userId = user._id;
            res.render('item/new', {
                msgItemNew: "Details registered successfully",
            });
        }
    });
});



module.exports = router;
