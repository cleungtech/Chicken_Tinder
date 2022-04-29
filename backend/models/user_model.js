const database = require('../database.js');
const custom_error = require('../custom_errors.js');
const model_helpers = require('./model_helpers.js');

const USER = 'user';

// Create an user in database
const create_user = async (request) => {

  const { user_name } = request.body;
  if (!user_name) throw custom_error.missing_data;

  const user_data = {
    user_name: user_name
  }
  const user_id = parseInt(await database.create(USER, user_data));

  return construct_return(user_id, user_data, request);
}

// View a user in database
const view_user = async (request) => {
  const user_id = request.params.user_id;
  const user_data = await database.view(USER, user_id);
  return construct_return(user_id, user_data, request);
}

// Update a user in a database
const update_user = async (request) => {

  const { user_name } = request.body;
  const { user_id } = request.params;
  if (!user_name || !user_id) throw custom_error.missing_data;

  const user_data = {
    user_name: user_name
  }
  await database.update(USER, user_id, user_data);

  return construct_return(user_id, user_data, request);
}

// Delete a user in a database
const delete_user = async (request) => {
  
  const user_id = request.params.user_id;
  await database.remove(USER, user_id);
}

// Contruct a user for returns
const construct_return = (user_id, user_data, request) => {
  return { 
    user_id: parseInt(user_id), 
    ...user_data,
    self: model_helpers.get_URL(request, USER, user_id)
  };
}

module.exports = { 
  create_user,
  view_user,
  update_user,
  delete_user
};