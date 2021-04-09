const express = require('express');
const { AirportModel } = require('./airports.model');
const { makeResponse } = require('../shared/make.response');
const { FindOptions } = require('ottoman');

const router = express();

router.get('/', async (req, res) => {
  await makeResponse(res, async () => {
    const { limit, search, skip } = req.query;
    const options = new FindOptions({ limit: Number(limit || 50), skip: Number(skip || 0) });
    const filter = search ? { airportname: { $like: `%${search}%` } } : {};
    const result = await AirportModel.find(filter, options);
    const { rows: items } = result;
    return {
      items,
    };
  });
});

router.get('/:id', async (req, res) => {
  await makeResponse(res, () => AirportModel.findById(req.params.id));
});

router.post('/', async (req, res) => {
  await makeResponse(res, () => {
    res.status(201);
    const airport = new AirportModel(req.body);
    return airport.save();
  });
});

router.patch('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    res.status(204);
    await AirportModel.updateById(req.params.id, req.body);
  });
});

router.put('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await AirportModel.replaceById(req.params.id, req.body);
    res.status(204);
  });
});

router.delete('/:id', async (req, res) => {
  await makeResponse(res, async () => {
    await AirportModel.removeById(req.params.id);
    res.status(204);
  });
});

module.exports = {
  AirportRoutes: router
}