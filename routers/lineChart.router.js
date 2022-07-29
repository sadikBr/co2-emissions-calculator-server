const express = require('express');

const router = express.Router();

const LineChart = require('../models/LineChart');

const lineChartDataId = '62b45e46efb363cfafdd6ad3';

router.put('/', async (req, res) => {
  const lineChartData = req.body;

  const formatedLineChartDataArray = Object.keys(lineChartData).reduce(
    (acc, item) => {
      const lineItem = {};

      lineItem.name = item;
      lineItem['CO2 Savings in TCO2e'] = lineChartData[item];

      return [...acc, lineItem];
    },
    []
  );

  await LineChart.findOneAndUpdate(
    { _id: lineChartDataId },
    { $set: { data: formatedLineChartDataArray } }
  );

  res.json({
    updatedData: formatedLineChartDataArray,
  });
});

router.get('/', async (req, res) => {
  const metrics = await LineChart.findOne({ _id: lineChartDataId });

  res.json({
    data: metrics,
  });
});

module.exports = router;
