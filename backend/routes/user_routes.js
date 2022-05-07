const user = require('../models/user_model.js');
const custom_error = require('../custom_errors.js');

const express = require('express');
const router = express.Router();

// Creating a user
router.post('/', async (request, response, next) => {

  try {
    const new_user = await user.create_user(request);
    response.status(201).json(new_user);

  } catch (error) {
    next(error);
  }
});

// View a user
router.get('/:user_id', async (request, response, next) => {

  try {
    const found_user = await user.view_user(request);
    response.status(200).json(found_user);

  } catch (error) {
    next(error)
  }
})

// Update a user
router.put('/:user_id', async (request, response, next) => {

  try {
    const updated_user = await user.update_user(request);
    response.status(200).json(updated_user);

  } catch (error) {
    next(error)
  }
})

// Delete a user
router.delete('/:user_id', async (request, response, next) => {

  try {
    await user.delete_user(request);
    response.status(204).send();

  } catch (error) {
    next(error)
  }
})

module.exports = router;
