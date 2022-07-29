const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: false },
  organisation_email: {
    type: String,
    required: true,
  },
  personal_email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
