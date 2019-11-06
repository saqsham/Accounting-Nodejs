const mongoose = require('mongoose')
const ItemCompany = require('./itemCompany') 
const ItemType = require('./itemType') 
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    companyName: {type: String, trim: true ,default: ''},
    newModelName: {type: String, trim: true ,default: ''},
    hsn: {type: String, trim:true ,default: ''},
    itemType: {type: String, trim: true ,default: ''},
    tax: {type: Number, trim: true ,default: ''},
    price: {type: Number, trim: true ,default: ''},
    companyId: {type: String, trim: true ,default: '',required: true}
})


ItemSchema.statics.findById = async (_id) => {
    console.log(_id)
  const item = await Item.findOne({
    _id
  })

  if (!item) {
    throw new Error('Unable to find company')
  }

 // console.log(user)
  return item
}

ItemSchema.statics.getByName = async (newModelName) => {
  console.log(newModelName)
const item = await Item.findOne({
  newModelName
})

if (!item) {
  throw new Error('Unable to find company')
}

// console.log(user)
return item
}


ItemSchema.statics.updateitem = async (companyid, data) => {
    try{
      //console.log("inside function",companyid,typeof data)
      const res = await Item.updateOne({_id: companyid}, data)
    
      if(!res){
        throw newError('No item with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
  }
  
ItemSchema.statics.deleteitem = async (_id) => {
    try{
      //console.log("inside function",companyid,typeof data)
      const res = await Item.findByIdAndDelete(_id)
    
      if(!res){
        throw newError('No item with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
  }


  ItemSchema.statics.findByCompanyId = async (companyId)=> {

    const items = await Item.find({companyId})

    if(!items)
    {
        throw new Error('No items found')
    }

    return items
}

ItemSchema.statics.updateitem = async (itemid, data) => {
    try{
      //console.log("inside function",itemid,typeof data)
      const res = await Item.updateOne({_id: itemid}, data)
    
      if(!res){
        throw newError('No item with given id')
      }
  
      return true
    }
    catch(e)
    {
      console.log(e)
    }
}


ItemSchema.statics.countTotalDoucments = async (companyId) => {
  try{
    console.log(companyId)
    const res = await Item.where({companyId:companyId}).countDocuments()
  
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



//hashing a password before saving it to the database
ItemSchema.pre('save', async function (next) {
  const item = this;
  var flag1 = 0
  var flag2 = 0
  try{
  const itemCompany = await ItemCompany.findByCompanyName(item.companyName)
  //console.log("in try " + itemCompany)
  
  }
  catch(e)
  {
    flag1 = 1
    console.log(e)
  }
  if(flag1 == 1)
  {
    const newItemCompany = new ItemCompany({
                                            name: item.companyName, 
                                            companyId: item.companyId
                                          }) 
      newItemCompany.save()
      console.log('New company created') 
  }
  try{
    const itemType = await ItemType.findByItemType(item.itemType)
  }
  catch(e)
  {
    flag2 = 1
    console.log(e)
  }

  if(flag2==1)
  {
      const newItemType = new ItemType({
                                            type: item.itemType, 
                                            companyId: item.companyId
                                          }) 
      console.log(newItemType)
      newItemType.save()
      console.log('New item created') 
  }

  next()

})



const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
