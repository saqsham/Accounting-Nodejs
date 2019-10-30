const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    default: '',
    lowercase: true
  },
  password: {
    type: String,
    trim: true,
    default: ''
  }
})

//creating function to authenticate input against database
UserSchema.statics.authenticate = async (email, password) => {
    console.log(email,password)
  const user = await User.findOne({
    email
  })
  console.log(user,password)
  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  console.log(isMatch,password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  //console.log(user)
  return user
}

UserSchema.statics.findById = async (_id) => {
  //  console.log(email,password)
  const user = await User.findOne({
    _id
  })

  if (!user) {
    throw new Error('Unable to find User')
  }

 // console.log(user)
  return user
}




//hashing a password before saving it to the database
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)

    next()

  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
