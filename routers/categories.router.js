const express = require('express');

const router = express.Router();

const EmissionFactor = require('../models/EmissionFactor');

router.get('/', async (req, res) => {
  const { sector } = req.query;

  const emissionFactors = await EmissionFactor.find({
    sector,
  }).exec();

  const categories = emissionFactors.reduce((acc, item) => {
    acc.add(item.category);
    return acc;
  }, new Set());

  res.json({
    categories: Array.from(categories),
  });
});

module.exports = router;
