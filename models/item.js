const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    companyid: {type: String, trim: true ,default: ''},
    newModelName: {type: String, trim: true ,default: ''},
    companyName: {type: String, trim: true, default: ''},
    hsn: {type: String, trim:true ,default: ''},
    itemType: {type: String, trim: true ,default: ''},
    tax: {type: Number, trim: true ,default: ''},
    price: {type: Number, trim: true ,default: ''},
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


ItemSchema.statics.updatecompany = async (companyid, data) => {
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


  ItemSchema.statics.findByCompanyId = async (companyid)=> {

    const parties = await Item.find({companyid})

    if(!parties)
    {
        throw new Error('No parties found')
    }

    return parties
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

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
