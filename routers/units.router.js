const express = require('express');

const router = express.Router();

const EmissionFactor = require('../models/EmissionFactor');

router.get('/', async (req, res) => {
  const { category, source, region_name } = req.query;

  const emissionFactors = await EmissionFactor.find({
    category,
    source,
    region_name,
  }).exec();

  const units = emissionFactors.reduce((acc, item) => {
    acc.add(item.unit_type);
    return acc;
  }, new Set());

  res.json({
    units: Array.from(units),
  });
});

module.exports = router;
