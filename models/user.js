const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type:String,
        required: true,
    },
    name: {
        type:String,
        required: true,
    },
    age: {
        type:Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema = Joi.object({
      user_name: Joi.string().required(),
      name: Joi.string().required(),
      age: Joi.number().required(),
      address: Joi.string().required(),
    });
    
    return schema.validate(user);
  }

  function validateUpdateUser(upUser) {
    const schema = Joi.object({
        user_name: Joi.string(),
        name: Joi.string(),
        age: Joi.number(),
        address: Joi.string(),
    });
    
    return schema.validate(upUser);
  }

  module.exports = {
    User,
    validateUser,
    validateUpdateUser
  }