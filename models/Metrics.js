const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model('Metrics', metricsSchema);
