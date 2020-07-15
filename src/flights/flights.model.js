const { Schema, model } = require('ottoman');

const FlightSchema = new Schema({
  day: Number,
  flight: String,
  utc: String,
});

const RouteSchema = new Schema({
  airline: String,
  airlineid: String,
  destinationairport: String,
  distance: Number,
  equipment: String,
  id: String,
  schedule: [FlightSchema],
  sourceairport: String,
  stops: Number,
  type: String,
});

const RouteModel = model('route', RouteSchema);

module.exports = {
  RouteModel
}
