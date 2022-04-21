const custom_error = require('./custom_errors.js');
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

// Create a Datastore Entity
const create_entity = (kind, data) => {
  const key = datastore.key(kind);
  return {
    key: key,
    data: data
  };
}

// Get the Datastore key
const get_key = (kind, id) => {
  const key = datastore.key([kind, parseInt(id, 10)]);
  if (isNaN(key.id)) throw custom_error.invalid_id;
  return key;
}

// Get an entity by ID
const view = async (kind, id) => {
  const key = get_key(kind, id);
  const [ entity ] = await datastore.get(key);
  if (!entity) throw custom_error.invalid_id;
  return entity;
}

// Create and save an entity in Datastore
const create = async (kind, data) => {
  const new_entity = await create_entity(kind, data);
  await datastore.insert(new_entity);
  return new_entity.key.id;
}

module.exports = {
  create,
  view,
}