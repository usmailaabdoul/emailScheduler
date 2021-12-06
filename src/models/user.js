const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  token: {
    type: Object,
    require: true,
    unique: true,
  },
  user: {
    type: Object,
    require: true,
  },
  count: {
    type: Number,
  },
}, {
  timestamps: true,
  strict: true
});

UserSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;