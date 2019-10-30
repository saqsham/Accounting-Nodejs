const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemCompanySchema = new Schema({
    name: {type: String, trim: true ,default: ''},
    companyId: {type: String, trim: true, default: '', required:true}
})


ItemCompanySchema.statics.findById = async (_id) => {
    console.log(_id)
  const itemCompany = await ItemCompany.findOne({
    _id
  })

  if (!itemCompany) {
    throw new Error('Unable to find item')
  }

 // console.log(user)
  return itemCompany
}

ItemCompanySchema.statics.findByCompanyName = async (name) => {
  console.log(name)
const itemCompany = await ItemCompany.findOne({
  name
})


if (!itemCompany) {
  throw new Error('Unable to find item Company')
}

// console.log(user)
return itemCompany
}


ItemCompanySchema.statics.findByCompanyId = async (companyId)=> {

    const itemCompanies = await ItemCompany.find({companyId})

    if(!itemCompanies)
    {
        throw new Error('No items found')
    }

    return itemCompanies
}

// ItemCompanySchema.methods.for_item = async () => {
//   const itemCompany = this

//   const itemCompanydb = itemCompany.model('ItemCompany').findOne({name: itemCompany.name})
//   console.log()
//   if(!itemCompanydb)
//   {
//     itemCompany = itemCompany.save()
//     return itemCompany._id
//   }
//   else{
//     return itemCompanydb._id
//   }
// }

const ItemCompany = mongoose.model('ItemCompany', ItemCompanySchema);
module.exports = ItemCompany;
