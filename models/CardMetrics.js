const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
  packaging: { type: String, required: true },
  inbound: { type: String, required: true },
  flow_opening: { type: String, required: true },
});

module.exports = mongoose.model('CardMetrics', metricsSchema);
