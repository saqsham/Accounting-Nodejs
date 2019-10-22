const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {type: String, trim: true ,default: '',required:true},
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
    userid: {type: String, trim: true, default: '', required: true}
})

CompanySchema.statics.findById = async (_id) => {
      console.log(_id)
    const company = await Company.findOne({
      _id
    })
  
    if (!company) {
      throw new Error('Unable to find company')
    }
  
   // console.log(user)
    return company
  }

CompanySchema.statics.findByUserId = async (userid)=> {

    const companies = await Company.find({userid})

    if(!companies)
    {
        throw new Error('No companies found')
    }

    return companies
}

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;




