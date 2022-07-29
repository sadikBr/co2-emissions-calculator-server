const express = require('express');

const router = express.Router();

const Metrics = require('../models/Metrics');

router.get('/', async (req, res) => {
  const metrics = await Metrics.find({}).exec();

  const { data } = metrics[0];

  res.json({
    data,
  });
});

router.put('/', async (req, res) => {
  const metrics = req.body;

  const foundMetrics = await Metrics.find({}).exec();
  const metricsDocument = foundMetrics[0];

  metricsDocument.data = metrics;

  await metricsDocument.save();

  res.json({
    message: 'Metrics updated successfuly.',
  });
});

module.exports = router;
