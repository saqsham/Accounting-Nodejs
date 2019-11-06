const express = require('express');
const router = express.Router();
const Item = require('../models/items/item')
const ItemCompany = require('../models/items/itemCompany')
const ItemType = require('../models/items/itemType')
const auth = require('../middleware/auth')


router.get('/edit', auth.isAuthorized, function(req, res, next) {
    res.render('item/edit', {title: "Edit Item", userName: req.session.username, companyName:req.session.companyName});
});

router.get('/list', auth.isAuthorized, function(req, res, next) {
    res.render('item/list', {title: "List Item", userName: req.session.username, companyName:req.session.companyName, item_page:true});
});
  
router.get('/new', auth.isAuthorized, async (req, res) => {
    console.log(req.session.companyId)
    if(req.session.companyId == null || req.session.companyId == '')
    {
        res.send("Please select Company")
    }
    const itemCompanies = await ItemCompany.findByCompanyId(req.session.companyId) 
    const itemTypes = await ItemType.findByCompanyId(req.session.companyId)
    console.log(itemCompanies,itemTypes)
    res.render('item/new', {title: "New Item", userName: req.session.username, companyName:req.session.companyName, 
                            new_item_page:true, itemCompanies:itemCompanies, itemTypes:itemTypes});
});

router.post('/new', auth.isAuthorized, async (req, res) => {
    //console.log(req.body)
    req.body['companyId'] = req.session.companyId

    //console.log(req.body)
    res.render('item/new')

    if(req.body.newCompanyName!='' && req.body.newCompanyName!=undefined)
    {
        req.body['companyName'] = req.body.newCompanyName
        delete req.body.newCompanyName
    }
    if(req.body.newItemType!='' && req.body.newItemType!=undefined)
    {
        req.body['itemType'] = req.body.newItemType
        delete req.body.newItemType
    }
    //console.log(req.body)
    const item = new Item(req.body)
    
    try {
        item.save()
		//res.status(201).send(user)
	    return res.redirect('/items/list')
    } catch (e) {
        res.status(400).send(e)
    }
    // if(req.session.companyId == null || req.session.companyId == '')
    // {
    //     res.send("Please select Company")
    // }
    // const item = new Item(req.body)
    
    // try {
    //     await item.save()
	// 	//res.status(201).send(user)
	//     return res.redirect('/home')
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    res.send("ok")
})


router.get('/getitemforlist',async (req,res) =>{
    console.log(req.session.companyId)
    if(req.session.companyId == null || req.session.companyId == '')
    {
        res.send("Please select Company")
    }
    try{
        const items = await Item.findByCompanyId(req.session.companyId)
        items1 = []
        items.forEach(function(item){
            console.log(typeof item)
            //item = JSON.stringify(item)
            x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+item._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+item._id+"\" class=\"item_datatable dropdown-menu tasks-list\"><a href=\"/item/edit/"+item._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a data-href=\"/item/delete/"+item._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a></div></div></td>"
            //console.log(x)
            //item["actions"] = x

            items1.push({
                "newModelName" : item.newModelName,
                "companyName" : item.companyName,
                "hsn" : item.hsn,
                "itemType" : item.itemType,
                "tax" : item.tax,
                "price" : item.price,
                "actions" : x
            })
            //console.log(item)
        })
        console.log({data: items1})//,json(items))
        res.send({data: items1})

    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const item = await Item.findById(_id)
        console.log(item)
        const itemCompanies = await ItemCompany.findByCompanyId(req.session.companyId) 
        const itemTypes = await ItemType.findByCompanyId(req.session.companyId)
        console.log(itemCompanies,itemTypes)
        res.render('item/edit', {title: "New Item", userName: req.session.username, companyName:req.session.companyName, 
                            new_item_page:true, itemCompanies:itemCompanies, itemTypes:itemTypes, item:item});

       // res.render("item/edit",{title: "Edit Item", userName: req.session.username, companyName:req.session.companyName, item:item});
    }
    catch(e){
        console.log(e)
    }
})

router.post('/edit/:id', async (req,res) =>{
    var _id = req.params.id
    try{
        const data = await Item.updateitem(_id,req.body)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/item/list')
})

router.get('/delete/:id', async (req,res) =>{
    try{
        console.log(req.params.id)
        const data = await Item.deleteitem(req.params.id)
        //console.log(data,req.body)
    }
    catch(e){
        console.log(e)
    }
    res.redirect('/item/list')
})




module.exports = router;
