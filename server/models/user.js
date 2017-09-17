const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email:{
    type: String,       //Type of the field
    required: true,
    minlength: 1,
    trim: true,        // Trims leading and trailing white spaces
    unique: true,     // Ensures value is unique across all documents within the Collection
    validate:{
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
    password:{
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access:{
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  });

// INSTANCE METHODS
UserSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();  //converts from mongoose object to regular object

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return token;
  // return user.save().then(()=>{
  //   return token;
  // })
}

let User = mongoose.model('User', UserSchema);


module.exports = {User}
