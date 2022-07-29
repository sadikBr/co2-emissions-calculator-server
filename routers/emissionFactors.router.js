const express = require('express');

const router = express.Router();
const FactorsApi = require('../utils/FactorsApi');
const KeyExtractor = require('../utils/KeyExtractor');

// Getting the emissionFactors Model
const EmissionFactor = require('../models/EmissionFactor');

// Initializing the key extractor
const Extractor = new KeyExtractor();

router.get('/seed', async (req, res) => {
  const response = await FactorsApi.get('/emission-factors');
  const emissionFactors = response.data.results;

  const insertedEmissionFactors = [];

  for (let i = 0; i < emissionFactors.length; i++) {
    const emissionFactor = emissionFactors[i];

    const emissionFactorProperties =
      Extractor.extractEmissionFactorProperties(emissionFactor);
    const emissionFactorToInsert = new EmissionFactor(emissionFactorProperties);

    insertedEmissionFactors.push(emissionFactorToInsert);
    await emissionFactorToInsert.save();

    if (i % 500 === 0) {
      console.log(i + ' emission factors were inserted!');
    }
  }

  res.json({
    message:
      'finished inserting ' +
      insertedEmissionFactors.length +
      ' emission factors.',
  });
});

router.get('/', async (req, res) => {
  const { category, source, region_name, unit_type } = req.query;

  const retrievedFactors = await EmissionFactor.find({
    category,
    source,
    region_name,
    unit_type,
  }).exec();

  res.json({
    factors: retrievedFactors,
  });
});

module.exports = router;
