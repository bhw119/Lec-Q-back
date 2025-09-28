const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  page: { type: Number },
  content: { type: String, required: true },
  anonymous: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
