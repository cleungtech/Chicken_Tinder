const database = require('../database.js');
const custom_error = require('../custom_errors.js');

const FLOCK = 'flock';

// Create a flock in database
const create_flock = async (flock_name, host_id, location) => {

  const flock_data = {
    flock_name: flock_name,
    host: host_id,
    users: [host_id],
    location: location,
  }

  const flock_id = await database.create(FLOCK, flock_data);
  return { flock_id: flock_id, ...flock_data }
}

// View a flock in database (by id)
const view_flock = async (flock_id) => {
  const flock_data = await database.view(FLOCK, flock_id);
  return { flock_id: parseInt(flock_id, 10), ...flock_data };
}

// Joining a flock
const join_flock = async (flock_id, user_id) => {

  const flock_data = await database.view(FLOCK, flock_id);
  if (flock_data.users.includes(user_id)) throw custom_error.already_in_flock;
  flock_data.users.push(user_id);
  await database.update(FLOCK, flock_id, flock_data);
}

module.exports = { 
  create_flock,
  view_flock,
  join_flock,
};