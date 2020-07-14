const express = require('express');
const { RouteModel } = require('./flights.model');
const { AirportModel } = require('../airports/airports.model');
const { makeResponse } = require('../shared/make.response');
const { Query, getDefaultConnection } = require('ottoman');
const router = express();

router.get('/', async (req, res) => {
  await makeResponse(res, async () => {
    const { limit, skip, from, to, weekDay } = req.query;
    const fromDocument = await AirportModel.findById(from, { select: 'faa' });
    const toDocument = await AirportModel.findById(to, { select: 'faa' });
    const conn = getDefaultConnection();
    const buckeName = conn.bucketName;
    const query = new Query({}, `${buckeName} as r UNNEST r.schedule as s`)
      .select('a.name, s.flight, s.utc, s.day, r.sourceairport, r.destinationairport, r.equipment')
      .plainJoin(`JOIN \`${buckeName}\` as a on keys r.airlineid`)
      .where({ 'r.sourceairport': fromDocument.faa, 'r.destinationairport': toDocument.faa, 's.day': Number(weekDay) })
      .limit(Number(limit || 50))
      .offset(Number(skip || 0))
      .orderBy({ 'a.name': 'ASC' });
    const result = await conn.query(query.build());
    const { rows: items } = result;
    return {
      items,
    };
  });
});

router.get('/:id', async (req, res) => {
  await makeResponse(res, () => RouteModel.findById(req.params.id));
});

router.post('/', async (req, res) => {
  await makeResponse(res, () => {
    res.status(201);
    const airport = new RouteModel(req.body);
    return airport.save();
  });
});

router.patch('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    res.status(204);
    await RouteModel.update(req.body, req.params.id);
  });
});

router.put('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await AirportModel.replace(req.body, req.params.id);
    res.status(204);
  });
});

router.delete('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await RouteModel.remove(req.params.id);
    res.status(204);
  });
});

module.exports = { 
  FlightRoutes: router
}
