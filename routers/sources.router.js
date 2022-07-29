const express = require('express');

const router = express.Router();

const EmissionFactor = require('../models/EmissionFactor');

router.get('/', async (req, res) => {
  const { category } = req.query;

  const emissionFactors = await EmissionFactor.find({ category }).exec();
  const sources = emissionFactors.reduce((acc, item) => {
    acc.add(item.source);
    return acc;
  }, new Set());

  res.json({
    sources: Array.from(sources),
  });
});

module.exports = router;
