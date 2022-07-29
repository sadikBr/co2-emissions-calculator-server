const express = require('express');

const router = express.Router();

const EmissionFactor = require('../models/EmissionFactor');

router.get('/', async (req, res) => {
  const { category, source } = req.query;

  const emissionFactors = await EmissionFactor.find({
    category,
    source,
  }).exec();

  const regions = emissionFactors.reduce((acc, item) => {
    acc.add(item.region_name);
    return acc;
  }, new Set());

  res.json({
    regions: Array.from(regions),
  });
});

module.exports = router;
