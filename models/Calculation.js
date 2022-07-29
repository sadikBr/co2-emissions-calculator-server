const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  category: { type: String, required: true },
  emission_factor: { type: String, required: true },
  source: { type: String, required: true },
  co2: { type: Number, default: null },
  ch4: { type: Number, default: null },
  n2o: { type: Number, default: null },
  co2e: { type: Number, required: true },
  co2e_unit: { type: String, required: true },
  co2e_calculation_method: { type: String, required: true },
  scope: { type: Number, required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  parameters: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Calculation', calculationSchema);
