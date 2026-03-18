const mongoose = require('mongoose');
module.exports = mongoose.model('Course', new mongoose.Schema({
  title: String, ageGroup: String, subject: String
}));
