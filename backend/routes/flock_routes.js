const flock = require('../models/flock_model.js');
const custom_error = require('../custom_errors.js');

const express = require('express');
const router = express.Router();

// Creating a flock (must have host_id created before calling)
router.post('/', async (request, response, next) => {

  try {
    const new_flock = await flock.create_flock(request);
    response.status(201).json(new_flock);

  } catch (error) {
    next(error);
  }
});

// View a flock
router.get('/:flock_id', async (request, response, next) => {

  try {
    const found_flock = await flock.view_flock(request);
    response.status(200).json(found_flock);

  } catch (error) {
    next(error);
  }
})


// Join a flock
router.post('/:flock_id/user/:user_id', async (request, response, next) => {

  try {
    const updated_flock = await flock.join_flock(request);
    response.status(200).json(updated_flock);

  } catch (error) {
    next(error);
  }
})

// Vote for a restaurant
router.post('/:flock_id/restaurant/:restaurant_id/user/:user_id', async (request, response, next) => {

  try {
    const updated_flock = await flock.vote_restaurant(request);
    response.status(204).send();

  } catch (error) {
    next(error);
  }
})

// Disband a flock
router.delete('/:flock_id', async (request, response, next) => {

  try {
    await flock.delete_flock(request);
    response.status(204).send();

  } catch (error) {
    next(error);
  }
})

module.exports = router;
