const json_message = (error) => {
  return {
    'Error': error.message
  }
}

const missing_request_body_data = new Error(
  'Missing data in the request body!'
);

const invalid_id = new Error(
  'Provided id is invalid!'
)

module.exports = {
  json_message,
  missing_request_body_data,
  invalid_id,
}