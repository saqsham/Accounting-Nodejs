const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    companyId: {type: String, trim: true ,default: ''},
    modelName: {type: String, trim: true ,default: ''},
    companyName: {type: String, trim: true, default: ''},
    hsn: {type: String, trim:true ,default: ''},
    itemType: {type: String, trim: true ,default: ''},
    tax: {type: Number, trim: true ,default: ''},
    price: {type: Number, trim: true ,default: ''},
})

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
