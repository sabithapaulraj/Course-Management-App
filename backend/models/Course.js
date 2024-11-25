const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  trainer: { type: String, required: true },
  trainees: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  batch: { type: String, required: true },
  timings: { type: String, required: true },
  classroom: { type: String, required: true },
  duration: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);