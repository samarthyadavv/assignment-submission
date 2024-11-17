const mongoose = require('mongoose');

//assignment schema
const assignmentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  task: { type: String, required: true },
  admin: { type: String, required: true }, 
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;