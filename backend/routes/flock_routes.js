const flock = require('../models/flock_model.js');
const custom_error = require('../custom_errors.js');

const express = require('express');
const router = express.Router();

// Creating a flock (must have host_id created before calling)
router.post('/', async (request, response) => {

  try {
    validate_create_request(request.body);
    const { flock_name, host_id, location } = request.body;
    const new_flock = await flock.create_flock(flock_name, host_id, location);
    response.status(201).json(new_flock);

  } catch (error) {
    custom_error.respond(error, response);
  }
});

// View a flock
router.get('/:flock_id', async(request, response) => {

  try {
    const flock_id = request.params.flock_id;
    const found_flock = await flock.view_flock(flock_id);
    response.status(200).json(found_flock);

  } catch (error) {
    custom_error.respond(error, response);
  }
})

// Join a flock
router.put('/:flock_id', async(request, response) => {

  try {
    const flock_id = request.params.flock_id;
    validate_join_request(request.body);

    const { user_id } = request.body;
    await flock.join_flock(flock_id, user_id);
    response.status(200).send();

  } catch (error) {
    custom_error.respond(error, response);
  }
})

// Validate the body of the create flock request
const validate_create_request = (request_body) => {

  const { flock_name, host_id, location } = request_body;
  if (!flock_name || !host_id || !location)
    throw custom_error.missing_request_body_data;

  const { longitude, latitude } = location;
  if (!longitude || !latitude) 
    throw custom_error.missing_request_body_data;
}

// Validate the body of the join flock request
const validate_join_request = (request_body) => {

  const { user_id } = request_body;
  if (!user_id) throw custom_error.missing_request_body_data;
}

module.exports = router;
