// import required packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// define base route
app.get('/', (req, res) => {
  res.send('api is running');
});

// export app for use in other files
module.exports = app;
