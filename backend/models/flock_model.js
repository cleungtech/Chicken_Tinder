const database = require('../database.js');
const custom_error = require('../custom_errors.js');
const model_helpers = require('./model_helpers.js');

const FLOCK = 'flock';
const USER = 'user';
const NUM_VOTES = 20;

// Create a flock in database
const create_flock = async (request) => {

  const { flock_name, host_id, location } = request.body;
  if (!flock_name || !host_id || !location) throw custom_error.missing_data;

  const { longitude, latitude } = location;
  if (!longitude || !latitude) throw custom_error.missing_data;
  
  const host_data = await database.view(USER, host_id);

  // TO DO: Get Yelp data

  const flock_data = {
    flock_name: flock_name,
    location: location,
    host: parseInt(host_id),
    user_votes: {},
    restaurant_votes: {}
  }

  // Add host as one of the users
  flock_data.user_votes[host_id] = NUM_VOTES;
  const flock_id = await database.create(FLOCK, flock_data);

  return { 
    flock_id: parseInt(flock_id), 
    ...flock_data,
    self: model_helpers.get_self_URL(request, FLOCK, flock_id)
  }
}

// View a flock in database (by id)
const view_flock = async (request) => {

  const flock_id = request.params.flock_id;
  const flock_data = await database.view(FLOCK, flock_id);

  return { 
    flock_id: parseInt(flock_id), 
    ...flock_data,
    self: model_helpers.get_self_URL(request, FLOCK, flock_id)
  };
}

// Joining a flock
const join_flock = async (request) => {

  const { flock_id, user_id } = request.params;
  await database.view(USER, user_id);
  const flock_data = await database.view(FLOCK, flock_id);

  console.log(flock_data);

  if (flock_data.user_votes.hasOwnProperty(user_id)) 
    throw custom_error.already_in_flock;
  flock_data.user_votes[user_id] = NUM_VOTES;
  await database.update(FLOCK, flock_id, flock_data);
}

// Deleting a flock
const delete_flock = async (request) => {
  const flock_id = request.params.flock_id;
  await database.remove(FLOCK, flock_id);
}

module.exports = { 
  create_flock,
  view_flock,
  join_flock,
  delete_flock
};