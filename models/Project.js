const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  project_name: { type: String, required: true },
  client_name: { type: String, required: true },
  sector: { type: String, required: true },
  department: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Project', projectSchema);
