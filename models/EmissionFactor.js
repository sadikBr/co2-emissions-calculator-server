const mongoose = require('mongoose');

const emissionFactorSchema = new mongoose.Schema({
  name_id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  sector: { type: String, required: true },
  source: { type: String, required: true },
  region: { type: String, required: true },
  year: { type: String, required: true },
  region_name: { type: String, required: true },
  unit_type: { type: String, required: true },
  unit: { type: String, required: true },
  factor_calculation_method: { type: String, required: true },
  factor: { type: Number, required: true },
  constituent_gases: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('EmissionFactor', emissionFactorSchema);
