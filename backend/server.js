const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// Manage flocks
const flocks = require('./routes/flock_routes');
app.use('/flock', flocks);

// Manage users
const users = require('./routes/user_routes');
app.use('/users', users);

// Catch bad requests
app.use((req, res) => {
  console.log('bad request');
  res.status(400).send('Bad Request');
})

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log('Press Ctrl+C to quit.');
})