const express = require('express');
const router = express.Router();

const Company = require('../models/company')
const Party = require('../models/party')

const Invoice = require('../models/invoice/invoice')
const InvoiceItem = require('../models/invoice/invoiceItem')
const SerialNumber = require('../models/invoice/serialNumber')

const Item = require('../models/items/item')
const ItemCompany = require('../models/items/itemCompany')
const ItemType = require('../models/items/itemType')
const auth = require('../middleware/auth')

router.get('/edit', function(req, res, next) {
    res.render('invoice/edit_invoice', {title: "Edit Invoice"});
});



router.get('/new', async (req, res) => {
  if(req.session.companyId == null || req.session.companyId == '')
  {
    res.send("Please select Company")
  }
  company = await Company.findById(req.session.companyId)
  //console.log(company)
  gstin = company.gstin
  parties = await Party.findByCompanyId(req.session.companyId)
  items = await Item.findByCompanyId(req.session.companyId)
  res.render('invoice/new', {title: "New Invoice",userName: req.session.username, gstin:gstin,
                            companyName:req.session.companyName, parties:parties, 
                            items:items, invoice_page: true});
});







router.post('/new', async(req,res) => {
  if(req.session.companyId == null || req.session.companyId == '')
  {
    res.send("Please select Company")
  }
  
 // console.log(req.body)
  try{
  x = await Party.findByGstin(req.body.partyId)
  req.body.partyId = x._id
  }
  catch(e)
  {
    //console.log(e)
  }
  invoice = Invoice({partyId: req.body.partyId,
                    date:  req.body.date,
                    number: req.body.number,
                    totalAmount: req.body.totalAmount,
                    narration: req.body.narration,
                    eWay: req.body.eWay,
                    companyId: req.session.companyId})

  invoice = await invoice.save()
    var items = []
    var num = 0
    var serialNumbersObj = {}
  keys = Object.keys(req.body)
  for(const key of keys){
    x = req.body[key]
    //console.log(key, x)
    if(key.substring(0,12)=="select_item_")
    {
      items.push([key,x.substring(14,)])
    }
    if(key.substring(0,7)=="myModal")
    {
      if(key.substring(7,8)=="_")
      {
        num = Number(key.substring(7,8))*10 + Number(key.substring(8,9))
      }
      else
      {
        num = Number(key.substring(7,8))
      }
      if(serialNumbersObj[num.toString(10)]==undefined)
      {
        serialNumbersObj[num.toString(10)] = []
      }
      serialNumbersObj[num.toString(10)].push(x)
    }
  }
  //console.log("\n\n")
  //console.log(serialNumbersObj)
  //console.log(items)
  var itemDetails = []
  //console.log("\n\n")
  for(const item in items)
  {
    //console.log(items[item])
    const item1 = items[item][0].substring(12,)
    const quantity = req.body['quantity_' + item1]
    const rate_per = req.body['rate_per_' + item1]
    itemDetails.push([item1, items[item][1], quantity, rate_per, serialNumbersObj[item1]])
  }
  //console.log("\n\n")
  //console.log(itemDetails)
  for(const itemDetail in itemDetails)
  {
    //console.log(itemDetails[itemDetail])
    try{
    item_id  = await Item.getByName(itemDetails[itemDetail][1])
    }
    catch(e)
    {
      console.log(e)
    }
    //console.log(invoice._id, item_id, Number(itemDetails[itemDetail][3]), Number(itemDetails[itemDetail][2]))

    invoice_item = InvoiceItem({
                                invoiceId : invoice._id, 
                                itemId: item_id._id, 
                                ratePer : Number(itemDetails[itemDetail][3]), 
                                quantity : Number(itemDetails[itemDetail][2])
                              })

    invoice_item = await invoice_item.save()
    console.log(invoice_item)
    for(const serial of itemDetails[itemDetail][4])
    {
      serialNo = SerialNumber({
                                invoiceItemId : invoice_item._id,
                                serialNumber : serial
                              })
      serialNo.save()
    }
  }
  //x.forEach(function(key, ))

  return res.redirect('/invoice/list')
})


router.get('/serialList', async (req, res) => {
  res.render('invoice/serial_list_invoice', {title: "Serial List Invoice"});
});



router.get('/list', function(req, res, next) {
  res.render('invoice/list', {title: "List Invoice",userName: req.session.username, companyName:req.session.companyName, invoice_list:true});
});


router.get('/getinvoiceforlist',async (req,res) =>{
  var invoices1
  console.log(req.session.companyId)
  if(req.session.companyId == null || req.session.companyId == '')
  {
      res.send("Please select Company")
  }
  try{
      const invoices = await Invoice.findByCompanyId(req.session.companyId)
      invoices1 = []
      //invoices.forEach(function(invoice){
      for(const y in invoices){
        invoice = invoices[y]
          party = await Party.findById(invoice.partyId)
          //console.log(party)
          //console.log(invoice)
          //item = JSON.stringify(item)
          //x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+invoice._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+invoice._id+"\" class=\"invoice_datatable dropdown-menu tasks-list\"><a href=\"/invoice/edit/"+invoice._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a data-href=\"/invoice/delete/"+invoice._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a></div></div></td>"
          //x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+invoice._id+"\" href=\"#\" data-toggle=\"dropdown\"aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+invoice._id+"\" class=\"invoice_datatable dropdown-menu tasks-list\"><a href=\"/invoices/print/"+invoice._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-file-pdf-o fa fw\" style=\"margin-right: 6px;padding-left: 3px;\"></i>Print</strong></div></a></div></div></td>"
          x = "<td><div class=\"dropdown-content\"><a id=\"navbarDropdownMenuLink"+invoice._id+"\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"nav-link tasks-toggle\"><i class=\"icon-new-file\"></i></a><div aria-labelledby=\"navbarDropdownMenuLink"+invoice._id+"\" class=\"invoice_datatable dropdown-menu tasks-list\"><a href=\"/invoice/edit/"+invoice._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-pencil fa-fw\"></i>  Edit</strong></div></a><a     data-href=\"/invoice/delete/"+invoice._id+"\" data-toggle=\"modal\" data-target=\"#confirm-delete\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-trash-o fa-fw\"></i>  Delete</strong></div></a><a href=\"/invoice/print/"+invoice._id+"\" class=\"dropdown-item\"><div class=\"text d-flex justify-content-between\"><strong><i class=\"fa fa-file-pdf-o fa fw\" style=\"margin-right: 6px;padding-left: 3px;\"></i>  Print</strong></div></a></div></div></td>"

          //console.log(x)
          //item["actions"] = x

          invoices1.push({
              "number" : invoice.number,
              "date" : invoice.date,
              "partyAcName" : party.name,
              "partyCity" : party.city,
              "totalAmount" : invoice.totalAmount,
              "partyContactPersonName" : party.contactPersonName,
              "partyContact" : party.mobileNumber,
              "actions" : x
              // "newModelName" : item.newModelName,
              // "companyName" : item.companyName,
              // "hsn" : item.hsn,
              // "itemType" : item.itemType,
              // "tax" : item.tax,
              // "price" : item.price,
              // "actions" : x
          })
          //console.log(item)
      }
      //console.log({data: invoices1})//,json(items))
      res.send({data: invoices1})

  }
  catch(e)
  {
      console.log(e)
  }
})



function formatAddress(x){
  var j = 0
  var k = 0
  for(var i=0; i<x.length; i++)
  {
    k+=1
    if(x.charAt(i) == ','){
      if(j==1 || k>=25)
      {
        j=0
        x = x.substring(0,i+1) + '<br>' + x.substring(i+1,)
        k=0
      }
      else
      {
        j+=1
      }
    }
  }
  return x
}

function Rs(amount){
  var words = new Array();
  words[0] = 'Zero';words[1] = 'One';words[2] = 'Two';words[3] = 'Three';words[4] = 'Four';words[5] = 'Five';words[6] = 'Six';words[7] = 'Seven';words[8] = 'Eight';words[9] = 'Nine';words[10] = 'Ten';words[11] = 'Eleven';words[12] = 'Twelve';words[13] = 'Thirteen';words[14] = 'Fourteen';words[15] = 'Fifteen';words[16] = 'Sixteen';words[17] = 'Seventeen';words[18] = 'Eighteen';words[19] = 'Nineteen';words[20] = 'Twenty';words[30] = 'Thirty';words[40] = 'Forty';words[50] = 'Fifty';words[60] = 'Sixty';words[70] = 'Seventy';words[80] = 'Eighty';words[90] = 'Ninety';var op;
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if(n_length <= 9){
  var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
  var received_n_array = new Array();
  for (var i = 0; i < n_length; i++){
  received_n_array[i] = number.substr(i, 1);}
  for (var i = 9 - n_length, j = 0; i < 9; i++, j++){
  n_array[i] = received_n_array[j];}
  for (var i = 0, j = 1; i < 9; i++, j++){
  if(i == 0 || i == 2 || i == 4 || i == 7){
  if(n_array[i] == 1){
  n_array[j] = 10 + parseInt(n_array[j]);
  n_array[i] = 0;}}}
  value = "";
  for (var i = 0; i < 9; i++){
  if(i == 0 || i == 2 || i == 4 || i == 7){
  value = n_array[i] * 10;} else {
  value = n_array[i];}
  if(value != 0){
  words_string += words[value] + " ";}
  if((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)){
  words_string += "Crores ";}
  if((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)){
  words_string += "Lakhs ";}
  if((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)){
  words_string += "Thousand ";}
  if(i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)){
  words_string += "Hundred and ";} else if(i == 6 && value != 0){
  words_string += "Hundred ";}}
  words_string = words_string.split(" ").join(" ");}
  return words_string;
}

function RsPaise(n){
  nums = n.toString().split('.')
  var whole = Rs(nums[0])
  if(nums[1]==null)nums[1]=0;
  if(nums[1].length == 1 )nums[1]=nums[1]+'0';
  if(nums[1].length> 2){nums[1]=nums[1].substring(2,length - 1)}
  if(nums.length == 2)
  {
    if(nums[0]<=9){nums[0]=nums[0]*10} else {nums[0]=nums[0]};
    var fraction = Rs(nums[1])
    if(whole=='' && fraction==''){op= 'Zero only';}
    if(whole=='' && fraction!=''){op= 'paise ' + fraction + ' only';}
    if(whole!='' && fraction==''){op='Rupees ' + whole + ' only';} 
    if(whole!='' && fraction!=''){op='Rupees ' + whole + 'and paise ' + fraction + ' only';}
    
  // amt=document.getElementById('amt').value;
  // if(amt > 999999999.99){op='Oops!!! The amount is too big to convert';}
  // if(isNaN(amt) == true ){op='Error : Amount in number appears to be incorrect. Please Check.';}
  // document.getElementById('op').innerHTML=op;
  return op
  }
}
  
// RsPaise(Math.round(document.getElementById('amt').value*100)/100);


router.get('/print/:id', async (req, res) => {
  var _id = req.params.id
  console.log(req.session.companyId)
  if(req.session.companyId == null || req.session.companyId == '')
  {
      res.send("Please select Company")
  }
  company = await Company.findById(req.session.companyId)
  company.address = formatAddress(company.address.toUpperCase())
  company.city = company.city.toUpperCase()
  //company['nameUpper'] = company.name.toUpperCase()
  company.gstin = company.gstin.toUpperCase()
  company.bankName = company.bankName.toUpperCase()
  company.accountNumber = company.accountNumber.toUpperCase()
  company.branch = company.branch.toUpperCase()
  company.ifsc = company.ifsc.toUpperCase()
  company.city = company.city.toUpperCase()

  invoice = await Invoice.findById(_id)
  invoiceItems = await InvoiceItem.findByInvoiceId(_id)
  invoicePackage = {}

  invoicePackage['invoice'] = invoice
  invoicePackage['companyNameUpper'] = company.name.toUpperCase()
  party = await Party.findById(invoice.partyId)
  console.log(party.address)
  party.address = formatAddress(party.address.toUpperCase())
  party.name = party.name.toUpperCase()
  party.city = party.city.toUpperCase()
  party.gstin = party.gstin.toUpperCase()
  party.state = party.state.toUpperCase()
  party['partyGstinStateCode'] = party.gstin.substring(0,2)

  invoicePackage['party'] = party
  
  if(company.gstin.substring(0,2)==party.gstin.substring(0,2))
  {
    taxType = "gst"
  }
  else
  {
    taxType = "igst"
  }


  var tax = 0.0
  var igst = 0.0
  var roundOff = 0.0
  var totalAmount = 0.0
  var hsnTaxableTot = 0.0
  var totalQuantity = 0
  
  hsnList = {}

  invoicePackage['invoiceItems'] = []

  sr = 0

  lenInvoiceItems = invoiceItems.length

  for(const invoiceItem of invoiceItems)
  {
    //console.log('\n\n')
    //console.log(invoiceItem)
    //console.log('\n\n')
    sr+=1
    serialNos = await SerialNumber.findByInvoiceItemId(invoiceItem._id)
    //console.log(serialNos)
    for(const serialNo of serialNos)
    {
      serialNo.serialNumber = serialNo.serialNumber.toUpperCase()
    }

    totalQuantity += invoiceItem.quantity

    item = await Item.findById(invoiceItem.itemId)

    item.newModelName = item.newModelName.toUpperCase()
    item.hsn = item.hsn.toUpperCase()

    amountItem = Number(invoiceItem.quantity)*Number(invoiceItem.ratePer)

    if(hsnList[item.hsn]==undefined)
    {
      hsnList[item.hsn] = [0,invoiceItem.ratePer,0,0,item.tax]
    }

    if(taxType == "gst")
    {
      tax1 = amountItem * Number(item.tax)/200
      totalAmount+=(tax1*2)
    }
    else{
      tax1 = amountItem * Number(item.tax)/100
      totalAmount+=(tax1*2)
    }

    hsnList[item.hsn][2] += tax1
    hsnList[item.hsn][0] += amountItem

    if(taxType=="gst")
    {
      hsnList[item.hsn][3] += tax1*2
    }
    else{
      hsnList[item.hsn][3] += tax1
    }

    hsnTaxableTot += amountItem
    tax += tax1
    // console.log(item)
    //item.typeId = await ItemType.findById(item.typeId)
    item.itemType = item.itemType.toUpperCase() 
    console.log('\n\n')
    invoicePackage['invoiceItems'].push({
      "invoiceItem":invoiceItem,
      "item" : item,
      "serialNos" : serialNos,
      "amount" : amountItem,
      "sr_no": sr,
      "sr_noequaltotalitems" : sr == lenInvoiceItems
    })
  }
    if(taxType=="gst")
    {
      x = tax*2
    }
    else{
      x = tax
    }

    invoicePackage['totalTaxAmount'] = x
    invoicePackage['totalTaxAmount2'] = x/2
    total = hsnTaxableTot + x
    roundOff = Math.abs((Math.round(total*100)/100) - total)
    
    invoicePackage['hsnTaxableTotal'] = hsnTaxableTot 
    invoicePackage['tax'] = tax 
    invoicePackage['totalItems'] = invoiceItems.length 
    invoicePackage['totalItems13'] = 13 - invoiceItems.length
    invoicePackage['totalItems14'] = 14 - invoiceItems.length
    invoicePackage['roundOff'] = roundOff
    invoicePackage['total'] = total
    invoicePackage['iftotalg50k'] = Number(total) >= 50000

    invoicePackage['taxType'] = taxType
    invoicePackage['taxTypeGst'] = taxType=="gst"
    invoicePackage['company'] = company
    invoicePackage['companyPan'] = company.gstin.substring(2,)
    invoicePackage['companyGstinStateCode'] = company.gstin.substring(0,2)
    invoicePackage['totalWords'] = RsPaise(Math.round(total*100)/100)
    if(taxType == "gst")
    {
      invoicePackage['taxWords'] = RsPaise(Math.round(tax*200)/100)
    } 
    else{
      invoicePackage['taxWords'] = RsPaise(Math.round(tax*100)/100)
    }
    invoicePackage['hsnList'] = hsnList
    invoicePackage['totalQuantity'] = totalQuantity
  
    
  console.log(invoicePackage,hsnList)
  res.render('invoice/print', {title: "Print Invoice",userName: req.session.username, companyName:req.session.companyName, invoicePackage:invoicePackage});


});




module.exports = router;
