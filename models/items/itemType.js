const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemTypeSchema = new Schema({
    type: {type: String, trim: true ,default: ''},
    companyId: {type: String, trim: true, default: '', required:true}
})


ItemTypeSchema.statics.findById = async (_id) => {
    console.log(_id)
  const itemType = await ItemType.findOne({
    _id
  })

  if (!itemType) {
    throw new Error('Unable to find item type')
  }

 // console.log(user)
  return itemType
}

ItemTypeSchema.statics.findByItemType = async (type) => {
  console.log(type)
const itemType = await ItemType.findOne({
  type
})

if (!itemType) {
  throw new Error('Unable to find item type')
}

// console.log(user)
return itemType
}


ItemTypeSchema.statics.findByCompanyId = async (companyId)=> {

    const itemTypes = await ItemType.find({companyId})

    if(!itemTypes)
    {
        throw new Error('No item types found')
    }

    return itemTypes
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

const ItemType = mongoose.model('ItemType', ItemTypeSchema);
module.exports = ItemType;
