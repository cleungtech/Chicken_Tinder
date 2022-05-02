const not_found = new Error(
  'Invalid URL and/or HTTP method'
);

const missing_data = new Error(
  'Missing data in the request body'
);

const invalid_id = new Error(
  'Provided id is invalid'
);

const already_in_flock = new Error(
  'This user is already in the flock'
);

const user_not_in_flock = new Error(
  'This user is not in the flock'
);

const user_out_of_votes = new Error(
  'This user ran out of votes'
);

const invalid_vote = new Error(
  'The vote is missing or invalid'
);

module.exports = {
  not_found,
  missing_data,
  invalid_id,
  already_in_flock,
  user_not_in_flock,
  user_out_of_votes,
  invalid_vote
};