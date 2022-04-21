const database = require('../database.js');

const FLOCK = 'flock';

// Create a flock in database
const create_flock = async (flock_name, host_id, location) => {

  const flock_data = {
    flock_name: flock_name,
    host_id: host_id,
    location: location
  }

  const flock_id = await database.create(FLOCK, flock_data);
  return { flock_id: flock_id, ...flock_data }
}

// View a flock in database (by id)
const view_flock = async (flock_id) => {
  const flock_data = await database.view(FLOCK, flock_id);
  return { flock_id: parseInt(flock_id, 10), ...flock_data };
}

module.exports = { 
  create_flock,
  view_flock
};