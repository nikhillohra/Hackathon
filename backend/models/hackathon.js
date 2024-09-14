const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, 
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  status: { type: String, enum: ['Upcoming', 'Active', 'Past'], required: true },
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
