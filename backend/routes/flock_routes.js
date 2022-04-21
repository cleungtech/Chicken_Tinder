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
    response.status(error === custom_error.missing_request_body_data ? 400:500);
    response.json(custom_error.json_message(error));
  }
});

// View a flock
router.get('/:flock_id', async(request, response) => {

  try {
    const flock_id = request.params.flock_id;
    const found_flock = await flock.view_flock(flock_id);
    response.status(200).json(found_flock);

  } catch (error) {
    response.status(error === custom_error.invalid_id ? 400:500);
    response.json(custom_error.json_message(error));
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

module.exports = router;
