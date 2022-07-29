const express = require('express');

const router = express.Router();

const FactorsApi = require('../utils/FactorsApi');
const KeyExtractor = require('../utils/KeyExtractor');

const Calculation = require('../models/Calculation');

const { v4: uuidv4 } = require('uuid');

const Extractor = new KeyExtractor();

router.get('/', async (req, res) => {
  const { scope, project_id } = req.query;

  let calculations;

  if (project_id !== undefined) {
    calculations = await Calculation.find({ scope, project_id }).exec();
  } else {
    calculations = [];
  }

  res.json({
    calculations: calculations,
  });
});

router.delete('/', async (req, res) => {
  const { id } = req.query;

  await Calculation.deleteOne({ _id: id }).exec();

  res.json({
    message: `Calculation with id ${id} has been deleted`,
  });
});

router.post('/estimate', async (req, res) => {
  const { requestData, scope, project_id } = req.body;

  const response = await FactorsApi.post('/estimate', requestData);
  const calculationProperties = Extractor.extractCalculationProperties(
    response.data
  );

  calculationProperties.parameters = requestData.parameters;
  calculationProperties.scope = scope;

  if (project_id === undefined) {
    calculationProperties._id = uuidv4();
    return res.json({
      calculation: calculationProperties,
    });
  } else {
    calculationProperties.project_id = project_id;

    const calculation = new Calculation(calculationProperties);
    await calculation.save();

    return res.json({
      calculation: calculation,
    });
  }
});

module.exports = router;
