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

    if (error === custom_error.missing_request_body_data) {
      response.status(400);
    } else {
      response.status(500);
    }
    response.json(custom_error.json_message(error));
  }
});

// Validate the body of the create user request
const validate_create_request = (request_body) => {
  const { user_name } = request_body;
  if (!user_name) throw custom_error.missing_request_body_data;
}

module.exports = router;
