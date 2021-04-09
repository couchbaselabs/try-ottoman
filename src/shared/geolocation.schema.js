const ottoman = require('ottoman');

const GeolocationSchema = new ottoman.Schema({
  alt: Number,
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  accuracy: String,
});

module.exports = {
  GeolocationSchema
};
