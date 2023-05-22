const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');     
// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,   
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'subadmin', 'user'],
    default: 'user',
  },
});
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
