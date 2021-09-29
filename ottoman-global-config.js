const { Ottoman } = require('ottoman');
const dotenv = require('dotenv');
dotenv.config();

const ottoman = new Ottoman({
  modelKey: 'type',
  scopeName: 'inventory'
});

module.exports = { ottoman };
