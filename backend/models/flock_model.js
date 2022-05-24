const database = require('../database.js');
const custom_error = require('../custom_errors.js');
const model_helpers = require('./model_helpers.js');
const restaurant = require('./restaurants_model.js');

const FLOCK = 'flock';
const USER = 'user';

// Create a flock in database
const create_flock = async (request) => {

  const { flock_name, host_id, location } = request.body;
  if (!flock_name || !host_id || !location) throw custom_error.missing_data;

  const { longitude, latitude } = location;
  if (!longitude || !latitude) throw custom_error.missing_data;
  
  await database.view(USER, host_id);
  const restaurants = await restaurant.get_restaurants(longitude, latitude);

  const flock_data = {
    flock_name: flock_name,
    location: location,
    host: Number(host_id),
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

// Check the current status of the flock
// Lightweight method to see if all users have voted
// If so, it will return the most voted restaurant
const check_flock = async (request) => {

  const flock_id = request.params.flock_id;
  const flock_data = await database.view(FLOCK, flock_id);

  const { user_votes, restaurant_votes } = flock_data;

  const remaining_votes = Object.values(user_votes).reduce((total, each) => 
    total + each, 0);

  const ranked_restaurants = Object.keys(restaurant_votes);
  ranked_restaurants.sort((id_1, id_2) => {
    return restaurant_votes[id_2] - restaurant_votes[id_1];
  })

  const most_voted_restaurants = ranked_restaurants.filter(id => 
    restaurant_votes[id] !== 0 &&
    restaurant_votes[id] === restaurant_votes[ranked_restaurants[0]]
    )

  const flock_status = {
    remaining_votes: remaining_votes,
    ranked_restaurants: ranked_restaurants,
    restaurant_votes: restaurant_votes,
    most_voted_restaurants: most_voted_restaurants
  }

  return construct_return(flock_id, flock_status, request);
}
// Joining a flock
const join_flock = async (request) => {

  const { flock_id, user_id } = request.params;
  await database.view(USER, user_id);
  const flock_data = await database.view(FLOCK, flock_id);

  if (flock_data.user_votes.hasOwnProperty(user_id)) 
    throw custom_error.already_in_flock;

  flock_data.user_votes[user_id] = restaurant.NUM_RESTAURANT;
  await database.update(FLOCK, flock_id, flock_data);
  return construct_return(flock_id, flock_data, request);
}

// Vote for a restaurant
const vote_restaurant = async (request) => {

  const { flock_id, user_id, restaurant_id } = request.params;
  const num_votes = Number(request.query.vote);

  await database.view(USER, user_id);
  const flock_data = await database.view(FLOCK, flock_id);

  // User not in flock
  if (!flock_data.user_votes.hasOwnProperty(user_id)) 
    throw custom_error.user_not_in_flock;

  // Restaurant not in flock
  if (!flock_data.restaurant_votes.hasOwnProperty(restaurant_id)) 
    throw custom_error.invalid_id;

  // User has not more votes
  if (flock_data.user_votes[user_id] <= 0)
    throw custom_error.user_out_of_votes;

  // User specified vote count is invalid
  if (isNaN(num_votes) || num_votes < 0 || num_votes > 2)
    throw custom_error.invalid_vote;

  flock_data.user_votes[user_id] -= 1;
  flock_data.restaurant_votes[restaurant_id] += num_votes;
  await database.update(FLOCK, flock_id, flock_data);
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
    flock_id: Number(flock_id), 
    ...flock_data,
    self: model_helpers.get_URL(request, FLOCK, flock_id)
  };
}

module.exports = {
  create_flock,
  view_flock,
  check_flock,
  join_flock,
  vote_restaurant,
  delete_flock
};