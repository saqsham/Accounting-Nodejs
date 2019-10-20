const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    username: {type: String, trim: true ,default: ''},
    email: {type: String, trim: true, default: ''},
    password: {type: String, trim:true ,default: ''},
    

})

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
