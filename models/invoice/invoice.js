const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const InvoiceItem = require('./invoiceItem')
const InvoiceItemSerialNumber = require('./serialNumber')


const InvoiceSchema = new Schema({
    partyId: {type: String, trim: true ,default: '', required:true},
    date: {type: Date, trim: true, default: ''},
    number: {type: String, trim: true, default: ''},
    totalAmount: {type: Number, trim:true ,default: ''},
    narration: {type: String, trim:true ,default: ''},
    eWay: {type: String, trim:true ,default: ''},
    companyId: {type: String, trim: true ,default: '', required: true}    
})


InvoiceSchema.statics.findById = async (_id) => {
    console.log(_id)
  const invoice = await Invoice.findOne({
    _id
  })

  if (!invoice) {
    throw new Error('Unable to find invoice')
  }

 // console.log(user)
  return invoice
}


InvoiceSchema.statics.deleteinvoice = async (_id) => {
  try{
    //console.log("inside function",companyid,typeof data)
    const res = await Invoice.findByIdAndDelete(_id)
  
    if(!res){
      throw newError('No invoice with given id')
    }

    return true
  }
  catch(e)
  {
    console.log(e)
  }
}


InvoiceSchema.statics.findByCompanyId = async (companyId)=> {

    const invoices = await Invoice.find({companyId})

    if(!invoices)
    {
        throw new Error('No invoice found')
    }

    return invoices
}

InvoiceSchema.statics.updateinvoice = async (partyid, data) => {
    try{
      //console.log("inside function",partyid,typeof data)
      const res = await Invoice.updateOne({_id: partyid}, data)
    
      if(!res){
        throw newError('No invoice with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
}

InvoiceSchema.statics.countTotalDoucments = async (companyId) => {
  try{
    console.log(companyId)
    const res = await Invoice.where({companyId:companyId}).countDocuments()
  
    if(!res){
      throw new Error('No invoice with given id')
    }

    return res
  }
  catch(e)
  {
    console.log(e)
  }
}

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
