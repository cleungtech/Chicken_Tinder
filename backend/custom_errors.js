const not_found = new Error(
  'Invalid URL and/or HTTP method'
)

const missing_request_body_data = new Error(
  'Missing data in the request body!'
);

const invalid_id = new Error(
  'Provided id is invalid!'
)

const already_in_flock = new Error(
  'This user is already in the flock!'
)

module.exports = {
  not_found,
  missing_request_body_data,
  invalid_id,
  already_in_flock,
}