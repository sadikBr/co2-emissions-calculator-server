const express = require('express');

const router = express.Router();

const BarChart = require('../models/BarChart');

const barChartDataId = '62b45f5cefb363cfafdd6ad4';

router.get('/', async (req, res) => {
  const metrics = await BarChart.findOne({ _id: barChartDataId });

  res.json({
    data: metrics,
  });
});

router.put('/', async (req, res) => {
  const barChartData = req.body;

  const formatedBarChartDataArray = Object.keys(barChartData).reduce(
    (acc, item) => {
      const barItem = {};

      barItem.name = item;
      barItem['CO2 Saving'] = barChartData[item];

      return [...acc, barItem];
    },
    []
  );

  await BarChart.findOneAndUpdate(
    { _id: barChartDataId },
    { $set: { data: formatedBarChartDataArray } }
  );

  res.json({
    updatedData: formatedBarChartDataArray,
  });
});

module.exports = router;
