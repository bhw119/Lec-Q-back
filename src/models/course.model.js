const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  professor: { type: String, required: true },
  status: { type: String, enum: ['ongoing', 'ended'], default: 'ongoing' },
  description: { type: String },
  pdfUrl: { type: String }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
