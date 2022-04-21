const respond = (error, response) => {

  switch (error) {
    case invalid_id:
      response.status(400);
      break;
    case missing_request_body_data:
      response.status(400);
      break;
    case already_in_flock:
      response.status(400);
      break;
    default:
      response.status(500);
  }
  response.json({ 'Error': error.message });
}

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
  respond,
  missing_request_body_data,
  invalid_id,
  already_in_flock,
}