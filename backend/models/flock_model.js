const database = require('../database.js');
const custom_error = require('../custom_errors.js');
const model_helpers = require('./model_helpers.js');
const restaurant = require('./resterants_model.js');

const FLOCK = 'flock';
const USER = 'user';


// Create a flock in database
const create_flock = async (request) => {

  const { flock_name, host_id, location } = request.body;
  if (!flock_name || !host_id || !location) throw custom_error.missing_data;

  const { longitude, latitude } = location;
  if (!longitude || !latitude) throw custom_error.missing_data;
  
  await database.view(USER, host_id);
  const restaurants = await restaurant.get_resterants(longitude, latitude);

  const flock_data = {
    flock_name: flock_name,
    location: location,
    host: parseInt(host_id),
    user_votes: {},
    restaurant_votes: {},
    restaurants: restaurants
  }

  // Add host as one of the users
  flock_data.user_votes[host_id] = restaurant.NUM_RESTAURANT;

  // Initialize the vote of each restaurant to zero
  flock_data.restaurant_votes = Object.fromEntries(restaurants.map(business =>
    [business.id, 0]));

  const flock_id = await database.create(FLOCK, flock_data);

  return construct_return(flock_id, flock_data, request);
}

// View a flock in database (by id)
const view_flock = async (request) => {

  const flock_id = request.params.flock_id;
  const flock_data = await database.view(FLOCK, flock_id);
  return construct_return(flock_id, flock_data, request);
}

// Joining a flock
const join_flock = async (request) => {

  const { flock_id, user_id } = request.params;
  await database.view(USER, user_id);
  const flock_data = await database.view(FLOCK, flock_id);

  if (flock_data.user_votes.hasOwnProperty(user_id)) 
    throw custom_error.already_in_flock;

  flock_data.user_votes[user_id] = restaurant.NUM_RESTAURANT;
  const response = await database.update(FLOCK, flock_id, flock_data);
  return construct_return(flock_id, flock_data, request);
}

// Deleting a flock
const delete_flock = async (request) => {
  const flock_id = request.params.flock_id;
  await database.remove(FLOCK, flock_id);
}

// Contruct a flock for returns
const construct_return = (flock_id, flock_data, request) => {
  return { 
    flock_id: parseInt(flock_id), 
    ...flock_data,
    self: model_helpers.get_URL(request, FLOCK, flock_id)
  };
}

module.exports = {
  create_flock,
  view_flock,
  join_flock,
  delete_flock
};