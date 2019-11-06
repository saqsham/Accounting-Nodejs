const express = require('express');
const router = express.Router();
const Company = require('../models/company')
const auth = require('../middleware/auth')


router.get('/new', auth.isAuthorized, function(req, res, next) {
    res.render('company/new', {userName: req.session.username, companyName:req.session.companyName, newcompany: true, title: "New Company"});
});

router.get('/list', auth.isAuthorized,function(req, res, next) {
    res.render('company/list', {userName: req.session.username, companyName:req.session.companyName, company_page:true, title: "List Company"});
});

router.post('/new', async (req, res) => {
    console.log(req.body)
    req.body['userid'] = req.session.userId
    const company = new Company(req.body)
    
    try {
        await company.save()
		//res.status(201).send(user)
	    return res.redirect('/company/list')
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
        if (companies) {
            req.session.companyname = companies[0].name
            req.session.id = companies[0]._id
        }
        console.log(req.session.companyname)
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
            x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+company._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+company._id+"\" class=\"company_datatable dropdown-menu tasks-list\"><a href=\"/company/edit/"+company._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a     data-href=\"/company/delete/"+company._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a></div></div></td>"
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

router.get('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const companyid = await Company.findById(_id)
        res.render('company/edit',{userName: req.session.username, companyName:req.session.companyName, company_page:true, company:companyid, title: "Edit Company"});
    }
    catch(e){
        console.log(e)
    }
})

router.post('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const data = await Company.updatecompany(_id,req.body)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/company/list')
})

router.get('/delete/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        const data = await Company.deletecompany(req.params.id)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/company/list')
})

module.exports = router;