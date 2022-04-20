const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

// Create a Datastore Entity
const create_entity = async (kind, data) => {
  const key = await datastore.key(kind);
  return {
    key: key,
    data: data
  };
}

// Create and save an entity in Datastore
const create = async (kind, data) => {
  const new_entity = await create_entity(kind, data);
  await datastore.insert(new_entity);
  return new_entity.key.id;
}

module.exports = {
  create,
}