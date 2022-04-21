const database = require('../database.js');

const USER = 'user';
const NUM_VOTES = 20;

// Create an user in database
const create_user = async (user_name) => {

  const user_data = {
    user_name: user_name,
    num_votes: NUM_VOTES,
  }

  const user_id = await database.create(USER, user_data);
  return { user_id: user_id, ...user_data }
}

// View a user in database (by id)
const view_user = async (user_id) => {
  const user_data = await database.view(USER, user_id);
  return { user_id: parseInt(user_id, 10), ...user_data };
}

module.exports = { 
  create_user,
  view_user
};