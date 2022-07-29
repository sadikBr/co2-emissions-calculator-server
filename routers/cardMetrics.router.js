const express = require('express');

const router = express.Router();

const CardMetrics = require('../models/CardMetrics');

const metricsCardsId = '62b45493a975ec7b556d2beb';

router.put('/', async (req, res) => {
  const metrics = req.body;

  const formated_metrics = Object.keys(metrics).reduce((acc, item) => {
    const key = item.replace(' ', '_').toLowerCase();

    acc[key] = metrics[item];
    return acc;
  }, {});

  await CardMetrics.findOneAndUpdate({ _id: metricsCardsId }, formated_metrics);

  res.json({
    message: 'Metrics Cards Updated Successfuly',
  });
});

router.get('/', async (req, res) => {
  const metrics = await CardMetrics.findOne({ _id: metricsCardsId });

  res.json({
    data: {
      PACKAGING: metrics.packaging,
      INBOUND: metrics.inbound,
      'FLOW OPENING': metrics.flow_opening,
    },
  });
});

module.exports = router;
