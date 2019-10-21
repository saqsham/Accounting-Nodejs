const express = require('express');
const router = express.Router();
const Company = require('../models/company')

router.get('/edit', function(req, res, next) {
    Company.findOne().sort({ _id: -1}).limit(1)
            .exec(function (err, data) {
                res.render('company/edit', {
                    title: "add_company",
                    companyName: data['companyName'],
                    email: data['email'],
                    gstin: data['gstin'],
                    address: data['address'],
                    city: data['city'],
                    state: data['state'],
                    pincode: data['pincode'],
                    country: data['country'],
                    bankName: data['bankName'],
                    branch: data['branch'],
                    ifsc: data['ifsc'],
                    accountNumber: data['accountNumber'],
                });
            });
});
  

router.post('/edit', function (req, res, next) {
    const companyData = new Company ({
        companyName: req.body.companyName,
        email: req.body.email,
        gstin: req.body.gstin,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        country: req.body.country,
        bankName: req.body.bankName,
        branch: req.body.branch,
        ifsc: req.body.ifsc,
        accountNumber: req.body.accountNumber,
    });
    
    Company.create(companyData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            // req.session.userId = user._id;
            Company.findOne().sort({ _id: -1}).limit(1)
            .exec(function (err, data) {
                res.render('company/edit', {
                    msgCompany: "Details registered successfully",
                    title: "add_company",
                    companyName: data['companyName'],
                    email: data['email'],
                    gstin: data['gstin'],
                    address: data['address'],
                    city: data['city'],
                    state: data['state'],
                    pincode: data['pincode'],
                    country: data['country'],
                    bankName: data['bankName'],
                    branch: data['branch'],
                    ifsc: data['ifsc'],
                    accountNumber: data['accountNumber'],
                });
            });
        }
    });
});

module.exports = router;