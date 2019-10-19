const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

/* GET users listing. */
router.post('/login', (req, res, next) => {
    console.log(req, body);
    const schema = Joi.object().keys({
    loginUsername : Joi.string().trim().required(),
    loginPassword : Joi.string().min(8).max(10).required()
    });
    Joi.validate(req.body,schema, (err, result) => {
        if (err) {
            console.log(err);
            res.render('errors/loginError');
        } else {
            console.log(result);
            res.render('pages/invoices');
        }
    })
});

module.exports = router;
