const express = require('express');
const router = express.Router();
const Party = require('../models/party')
const auth = require('../middleware/auth')


router.get('/edit', auth.isAuthorized, function(req, res, next) {
    res.render('party/edit', {title: "Edit Party", userName: req.session.username, companyName:req.session.companyName});
});

router.get('/list', auth.isAuthorized, function(req, res, next) {
    res.render('party/list', {title: "List Party", userName: req.session.username, companyName:req.session.companyName, party_page:true});
});
  
router.get('/new', auth.isAuthorized, function(req, res, next) {
    res.render('party/new', {title: "New Party", userName: req.session.username, companyName:req.session.companyName});
});

router.post('/new', auth.isAuthorized, async (req, res) => {
    console.log(req.body)
    req.body['companyid'] = req.session.companyId
    if(req.session.companyId == null || req.session.companyId == '')
    {
        res.send("Please select Company")
    }
    const party = new Party(req.body)
    
    try {
        await party.save()
		//res.status(201).send(user)
	    return res.redirect('/party/list')
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/getpartyforlist',async (req,res) =>{
    console.log(req.session.companyId)
    if(req.session.companyId == null || req.session.companyId == '')
    {
        res.send("Please select Company")
    }
    try{
        const parties = await Party.findByCompanyId(req.session.companyId)
        parties1 = []
        parties.forEach(function(party){
            console.log(typeof party)
            //party = JSON.stringify(party)
            x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+party._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+party._id+"\" class=\"party_datatable dropdown-menu tasks-list\"><a href=\"/party/edit/"+party._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a     data-href=\"/party/delete/"+party._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a></div></div></td>"
            //console.log(x)
            //party["actions"] = x

            parties1.push({
                "name" : party.name,
                "city" : party.city,
                "gstin" : party.gstin,
                "contactPersonName" : party.contactPersonName,
                "mobileNumber" : party.mobileNumber,
                "email" : party.email,
                "actions" : x
            })
            //console.log(party)
        })
        console.log({data: parties1})//,json(parties))
        res.send({data: parties1})

    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const party = await Party.findById(_id)
        console.log(party)
        res.render('party/edit',{title: "Edit Party", userName: req.session.username, companyName:req.session.companyName, party:party});
    }
    catch(e){
        console.log(e)
    }
})

router.post('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const data = await Party.updateparty(_id,req.body)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/party/list')
})

router.get('/delete/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        const data = await Party.deleteparty(req.params.id)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/party/list')
})
module.exports = router;
