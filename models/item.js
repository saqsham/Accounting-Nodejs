const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    newModelName: {type: String, trim: true ,default: ''},
    newCompany: {type: String, trim: true, default: ''},
    hsn: {type: String, trim:true ,default: ''},
    newItem: {type: String, trim: true ,default: ''},
    tax: {type: Number, trim: true ,default: ''},
    price: {type: Number, trim: true ,default: ''},
})

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
