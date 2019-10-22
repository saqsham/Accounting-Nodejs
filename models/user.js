const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    registerUsername: {type: String, trim:true ,default: ''},
    registerEmail: {type: String, trim: true, default: ''},
    registerPassword: {type: String, trim:true ,default: ''}
})

//creating function to authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ registerUsername: username })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          const err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.registerPassword, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.registerPassword, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.registerPassword = hash;
      next();
    })
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;
