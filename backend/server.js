const express = require('express');
const bodyParser = require('body-parser');
const custom_error = require('./custom_errors.js');

const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

const api_router = express.Router();
app.use('/api', api_router);

// Manage flocks
api_router.use('/flock', require('./routes/flock_routes'));

// Manage users
api_router.use('/user', require('./routes/user_routes'));

// Invalid URL and/or HTTP method
api_router.use((request, response, next) => {
  try {
    throw custom_error.not_found;
  } catch (error) {
    next(error);
  }
})

// Catch all errors
app.use((error, request, response, next) => {
  
  switch (error) {
    case custom_error.invalid_id:
    case custom_error.missing_data:
    case custom_error.already_in_flock:
    case custom_error.already_in_flock:
    case custom_error.user_not_in_flock:
    case custom_error.user_out_of_votes:
    case custom_error.invalid_vote:
      response.status(400);
      break;
    case custom_error.not_found:
      response.status(404);
      break;
    default:
      response.status(500);
      break;
  }
  response.json({ 'Error': error.message });
})

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log('Press Ctrl+C to quit.');
})