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

  return {
    user_id: user_id,
    ...user_data
  }
}

module.exports = { create_user };