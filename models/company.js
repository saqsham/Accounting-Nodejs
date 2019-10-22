const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {type: String, trim: true ,default: ''},
    email: {type: String, trim: true, default: ''},
    gstin: {type: String, trim:true ,default: ''},
    address: {type: String, trim: true ,default: ''},
    city: {type: String, trim: true ,default: ''},
    state: {type: String, trim: true ,default: ''},
    pincode: {type: Number, trim: true ,default: ''},
    country: {type: String, trim: true ,default: ''},
    bankName: {type: String, trim: true ,default: ''},
    branch: {type: String, trim: true ,default: ''},
    ifsc: {type: String, trim: true ,default: ''},
    accountNumber: {type: String, trim: true ,default: ''},
})

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;




