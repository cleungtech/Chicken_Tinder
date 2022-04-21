const custom_error = require('./custom_errors.js');
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

// Create a Datastore Entity
const create_entity = (key, data) => {
  return {
    key: key,
    data: data
  };
}

// Get the Datastore key
const get_key = (kind, id=null) => {
  const key = id ? datastore.key([kind, parseInt(id,10)]) : datastore.key(kind);
  if (id && isNaN(key.id)) throw custom_error.invalid_id;
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
  const key = get_key(kind);
  const new_entity = create_entity(key, data);
  await datastore.insert(new_entity);
  return new_entity.key.id;
}

// Update an entity in Datastore
const update = async (kind, id, data) => {
  const key = get_key(kind, id);
  const modified_entity = create_entity(key, data);
  await datastore.save(modified_entity);
}

// Remove an entity in datastore
const remove = async (kind, id) => {
  const key = get_key(kind, id);
  const db_return = await datastore.delete(key);
  if (!db_return[0].indexUpdates) throw custom_error.invalid_id;
}

module.exports = {
  create,
  view,
  update,
  remove,
}