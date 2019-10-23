const express = require('express');
const router = express.Router();
const Company = require('../models/company')
const auth = require('../middleware/auth')


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

router.get('/new', auth.isAuthorized,function(req, res, next) {
    res.render('company/add_company', {userName: req.session.username, companyName:req.session.companyName, newcompany: true});
});

router.get('/list', auth.isAuthorized,function(req, res, next) {
    res.render('company/list', {userName: req.session.username, companyName:req.session.companyName, company_page:true});
});

router.post('/new', async (req, res) => {
    console.log(req.body)
    req.body['userid'] = req.session.userId
    const company = new Company(req.body)
    
    try {
        await company.save()
		//res.status(201).send(user)
	    return res.redirect('/home')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/select', async (req,res) => {
    console.log('inselect',req.query.companyId)
    try{
        const company = await Company.findById(req.query.companyId)
        console.log(company)
        req.session.companyId = company._id
        req.session.companyName = company.name
        res.json({companyName : req.session.companyName, success : true})
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/getcompanies', async (req,res) =>{
    try{
        const companies = await Company.findByUserId(req.session.userId)
        req.session.companyname = companies[0].name
        req.session.id = companies[0]._id
        res.json({companies : companies, success : true})

    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/getcompanyforlist',async (req,res) =>{
    try{
        const companies = await Company.findByUserId(req.session.userId)
        companies1 = []
        companies.forEach(function(company){
            console.log(typeof company)
            //company = JSON.stringify(company)
            x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+company._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+company._id+"\" class=\"invoice_datatable dropdown-menu tasks-list\"><a href=\"/parties/edit/"+company._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a     data-href=\"/companies/delete/"+company._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a></div></div></td>"
            //console.log(x)
            //company["actions"] = x

            companies1.push({
                "name" : company.name,
                "gstin" : company.gstin,
                "city" : company.city,
                "accountNumber" : company.accountNumber,
                "branch" : company.branch,
                "ifsc" : company.ifsc,
                "actions" : x
            })
            //console.log(company)
        })
        console.log({data: companies1})//,json(companies))
        res.send({data: companies1})

    }
    catch(e)
    {
        console.log(e)
    }
})
module.exports = router;