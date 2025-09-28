const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor'], required: true },
}, {
  timestamps: true  // createdAt, updatedAt 자동 관리
});

module.exports = mongoose.model('User', userSchema);
