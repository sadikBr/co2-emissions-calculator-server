const mongoose = require('mongoose');

const barChartSchema = new mongoose.Schema({
  data: { type: Array, required: true },
});

module.exports = mongoose.model('BarChart', barChartSchema);
