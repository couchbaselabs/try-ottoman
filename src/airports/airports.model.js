const { model, Schema } = require('ottoman');
const { GeolocationSchema } = require('../shared/geolocation.schema');

const AirportSchema = new Schema({
  airportname: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  faa: String,
  geo: GeolocationSchema,
  icao: String,
  tz: { type: String, required: true },
});

AirportSchema.index.findByName = { by: 'name', type: 'n1ql' };

const AirportModel = model('airport', AirportSchema);

module.exports = {
  AirportModel
}