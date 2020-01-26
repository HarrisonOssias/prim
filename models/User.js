const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: this.name
  },
  password: {
    type: String,
    required: true
  }
});

// exports the model as a mongoose model called user
module.exports = mongoose.model('user', UserSchema);
