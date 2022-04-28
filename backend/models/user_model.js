const database = require('../database.js');
const custom_error = require('../custom_errors.js');
const model_helpers = require('./model_helpers.js');

const USER = 'user';

// Create an user in database
const create_user = async (request) => {

  const required_properties = ["user_name"];
  model_helpers.validate_request(request.body, ...required_properties);

  const user_data = model_helpers.create_data(required_properties, request.body);
  const user_id = parseInt(await database.create(USER, user_data));

  return { 
    user_id: user_id, 
    ...user_data,
    self: model_helpers.get_self_URL(request, USER, user_id)
   }
}

// View a user in database
const view_user = async (request) => {
  const user_id = request.params.user_id;
  const user_data = await database.view(USER, user_id);
  return { 
    user_id: parseInt(user_id), 
    ...user_data,
    self: model_helpers.get_self_URL(request, USER, user_id)
   }
}

// Update a user in a database
const update_user = async (request) => {

  const required_properties = ["user_name"];

  model_helpers.validate_request(request.body, ...required_properties);

  const user_id = request.params.user_id;
  const user_data = model_helpers.create_data(required_properties, request.body);
  await database.update(USER, user_id, user_data);

  return { 
    user_id: user_id, 
    ...user_data,
    self: model_helpers.get_self_URL(request, USER, user_id)
   }
}

module.exports = { 
  create_user,
  view_user,
  update_user
};