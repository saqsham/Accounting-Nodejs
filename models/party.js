const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    partyName: {type: String, trim: true ,default: ''},
    gstin: {type: String, trim:true ,default: ''},
    address: {type: String, trim: true ,default: ''},
    city: {type: String, trim: true ,default: ''},
    state: {type: String, trim: true ,default: ''},
    pincode: {type: Number, trim: true ,default: ''},
    country: {type: String, trim: true ,default: ''},
    contactPersonName: {type: String, trim: true ,default: ''},
    mail: {type: String, trim: true ,default: ''},
    mobileNumber: {type: Number, trim: true ,default: ''},
    altMobileNumber: {type: Number, trim: true ,default: ''},
})

const Party = mongoose.model('Party', PartySchema);
module.exports = Party;
