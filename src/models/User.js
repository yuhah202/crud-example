const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { Schema, ObjectId } = mongoose;

const User = mongoose.model(
  'User',
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: 'Username must be longer than 3 characters',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail,
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    // gender: {
    //   type: String,
    //   enum: {
    //     values: ['Male', 'Female'],
    //     massage: '{VALUE} is not supported'
    //   }
    // }
  }),
);

module.exports = User;
