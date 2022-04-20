const json_message = (error) => {
  return {
    'Error': error.message
  }
}

const missing_request_body_data = new Error(
  'Missing data in the request body!'
);

module.exports = {
  missing_request_body_data,
  json_message,
}