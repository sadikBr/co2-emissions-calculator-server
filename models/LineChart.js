const mongoose = require('mongoose');

const lineChartSchema = new mongoose.Schema({
  data: { type: Array, required: true },
});

module.exports = mongoose.model('LineChart', lineChartSchema);
