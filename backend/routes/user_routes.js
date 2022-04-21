const user = require('../models/user_model.js');
const custom_error = require('../custom_errors.js');

const express = require('express');
const router = express.Router();

// Creating a user
router.post('/', async (request, response) => {

  try {
    validate_create_request(request.body);
    const { user_name } = request.body;
    const new_user = await user.create_user(user_name);
    response.status(201).json(new_user);

  } catch (error) {
    custom_error.respond(error, response);
  }
});

// View a user
router.get('/:user_id', async(request, response) => {

  try {
    const user_id = request.params.user_id;
    const found_user = await user.view_user(user_id);
    response.status(200).json(found_user);

  } catch (error) {
    custom_error.respond(error, response);
  }
})

// Validate the body of the create user request
const validate_create_request = (request_body) => {

  const { user_name } = request_body;
  if (!user_name) throw custom_error.missing_request_body_data;
}

module.exports = router;
