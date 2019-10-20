const express = require('express');
const router = express.Router();

// router.get('/edit', function(req, res, next) {
//     res.render('company/add_company', {website: "add_company"});
// });

router.get('/edit', function(req, res, next) {
    res.render('company/edit_company', {website: "add_company"});
});
  

module.exports = router;
