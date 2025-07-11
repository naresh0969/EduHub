const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  branch: String,
  username: {
    type: String,
    unique: true,       
    required: true,     
    trim: true,         
    lowercase: true     
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
