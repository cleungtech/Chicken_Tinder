const custom_error = require('../custom_errors.js');

// Create a URL pointing to itself
const get_self_URL = (request, resource, id) => {
  const protocol = request.protocol;
  const host = request.headers.host;
  return `${protocol}://${host}/api/${resource}/${id}`;
}

// Generate a entity data to be used for creating or updating
const create_data = (required_properties, request_body) => {
  return Object.fromEntries(required_properties.map(property => [property, request_body[property]]));
}

module.exports = {
  get_self_URL,
  create_data
}