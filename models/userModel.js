const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  avatarURL: String,
  token: {
    type: String,
    default: '',
  },
});

userSchema.post('save', handleMongooseError);
const User = model('user', userSchema);

module.exports = User;
