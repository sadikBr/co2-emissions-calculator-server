const axios = require('axios');

const BASE_URL = 'https://beta3.api.climatiq.io';
const API_KEY = '899QJD6EWCMEHBME50E21DCCWTEA';

const FactorsApi = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

module.exports = FactorsApi;
