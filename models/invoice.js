const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    partyId: {type: String, trim: true ,default: ''},
    itemId: {type: String, trim: true ,default: ''},
    numberId: {type: String, trim: true ,default: ''},
    date: {type: Date, trim: true, default: ''},
    quantity: {type: Number, trim:true ,default: ''},
    ratePer: {type: Number, trim:true ,default: ''},
    amountPrice: {type: Number, trim:true ,default: ''},
    serialNumber: {type: Number, trim:true ,default: ''},
    comment: {type: String, trim:true ,default: ''},    
})

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
