const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    name: {type: String, trim: true ,default: ''},
    gstin: {type: String, trim:true ,default: ''},
    address: {type: String, trim: true ,default: ''},
    city: {type: String, trim: true ,default: ''},
    state: {type: String, trim: true ,default: ''},
    pincode: {type: Number, trim: true ,default: ''},
    country: {type: String, trim: true ,default: ''},
    contactPersonName: {type: String, trim: true ,default: ''},
    email: {type: String, trim: true ,default: ''},
    mobileNumber: {type: Number, trim: true ,default: ''},
    altMobileNumber: {type: Number, trim: true ,default: ''},
    companyid: {type: String, trim: true ,default: '', required: true},
})

PartySchema.statics.findById = async (_id) => {
    console.log(_id)
  const party = await Party.findOne({
    _id
  })

  if (!party) {
    throw new Error('Unable to find company')
  }

 // console.log(user)
  return party
}

PartySchema.statics.findByGstin = async (gstin) => {
  console.log(gstin)
const party = await Party.findOne({
  gstin
})

if (!party) {
  throw new Error('Unable to find company')
}

// console.log(user)
return party
}

PartySchema.statics.deleteparty = async (_id) => {
    try{
      //console.log("inside function",companyid,typeof data)
      const res = await Party.findByIdAndDelete(_id)
    
      if(!res){
        throw newError('No party with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
  }


  PartySchema.statics.findByCompanyId = async (companyid)=> {

    const parties = await Party.find({companyid})

    if(!parties)
    {
        throw new Error('No parties found')
    }

    return parties
}

PartySchema.statics.updateparty = async (partyid, data) => {
    try{
      //console.log("inside function",partyid,typeof data)
      const res = await Party.updateOne({_id: partyid}, data)
    
      if(!res){
        throw newError('No party with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
  }

PartySchema.statics.countTotalDoucments = async (companyid) => {
    try{
      console.log(companyid)
      const res = await Party.where({companyid:companyid}).countDocuments()
    
      if(!res){
        throw new Error('No party with given id')
      }
  
      return res
    }
    catch(e)
    {
      console.log(e)
    }
  }
  

const Party = mongoose.model('Party', PartySchema);
module.exports = Party;
