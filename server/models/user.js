const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const secretKeyForJWT = 'abc123';

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
  let token = jwt.sign({_id: user._id.toHexString(), access}, secretKeyForJWT).toString();

  user.tokens.push({access, token});
  return token;
  // return user.save().then(()=>{
  //   return token;
  // })
}

// MODEL (Static or Class level) METHODS
UserSchema.statics.findByToken = function(token) {
  let User = this;   // this === the model
  let decoded;

  try{
    decoded = jwt.verify(token, secretKeyForJWT);
  }
  catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
}

UserSchema.pre('save', function (next) {
  let user = this;
  let hashedPassword;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) =>{
        user.password = hash;
        next();
      })
    });
  }
  else{
    next();
  }
});

let User = mongoose.model('User', UserSchema);


module.exports = {User}
