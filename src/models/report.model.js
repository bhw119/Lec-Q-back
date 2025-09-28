const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  summary: { type: String },
  difficultSections: [String],
  recommendations: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
