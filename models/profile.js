const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    registerUsername: {type: String, trim:true ,default: ''},
    registerEmail: {type: String, trim: true, default: ''},
    registerPassword: {type: String, trim:true ,default: ''}
})

//authenticate input against database
ProfileSchema.statics.authenticate = function (username, password, callback) {
    Profile.findOne({ registerUsername: username })
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
ProfileSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.registerPassword, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.registerPassword = hash;
      next();
    })
  });

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
