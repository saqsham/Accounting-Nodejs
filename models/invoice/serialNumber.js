const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SerialNumberSchema = new Schema({
    invoiceItemId: {type: String, trim: true ,default: ''},
    serialNumber: {type: String, trim: true, default: ''}
})


SerialNumberSchema.statics.findById = async (_id) => {
    console.log(_id)
  const serialNumber = await InvoiceItemSerialNumber.findOne({
    _id
  })

  if (!serialNumber) {
    throw new Error('Unable to find invoice item')
  }

 // console.log(user)
  return serialNumber
}


SerialNumberSchema.statics.deleteinvoice = async (_id) => {
    try{
      //console.log("inside function",companyid,typeof data)
      const res = await InvoiceItemSerialNumber.findByIdAndDelete(_id)
    
      if(!res){
        throw newError('No invoice item with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
  }


SerialNumberSchema.statics.findByInvoiceItemId = async (invoiceItemId)=> {
    //console.log(invoiceItemId)
    const serialNumbers = await InvoiceItemSerialNumber.find({invoiceItemId})
    //console.log(serialNumbers)
    if(!serialNumbers)
    {
        throw new Error('No invoice items found')
    }

    return serialNumbers
}

SerialNumberSchema.statics.updateserialno = async (invoiceItemId, data) => {
    try{
      //console.log("inside function",partyid,typeof data)
      const res = await InvoiceItemSerialNumber.updateOne({invoiceItemId: invoiceItemId}, data)
    
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


const InvoiceItemSerialNumber = mongoose.model('InvoiceItemSerialNumber', SerialNumberSchema);
module.exports = InvoiceItemSerialNumber;