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


CompanySchema.statics.updatecompany = async (companyid, data) => {
  try{
    //console.log("inside function",companyid,typeof data)
    const res = await Company.updateOne({_id: companyid}, data)
  
    if(!res){
      throw newError('No company with given id')
    }

    return true
  }
  catch(e)
  {
    console.log(e)
  }
}

CompanySchema.statics.deletecompany = async (_id) => {
  try{
    //console.log("inside function",companyid,typeof data)
    const res = await Company.findByIdAndDelete(_id)
  
    if(!res){
      throw newError('No company with given id')
    }

    return true
  }
  catch(e)
  {
    console.log(e)
  }
}


CompanySchema.statics.countTotalDoucments = async (userid) => {
  try{
    console.log(userid)
    const res = await Company.where({userid:userid}).countDocuments()
  
    if(!res){
      throw new Error('No item with given id')
    }

    return res
  }
  catch(e)
  {
    console.log(e)
  }
}


const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
