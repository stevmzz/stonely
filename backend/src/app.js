// import required packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// create express app
const app = express();

// logs method and url of each incoming request
app.use((req, res, next) => {
  console.log(`[ok] ${req.method} ${req.url}`);
  next();
});

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// import and use healthcheck route
const healthRoutes = require('./routes/health');
app.use('/api', healthRoutes);

// import and use auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// import and use user routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// define base route
app.get('/', (req, res) => {
  res.send('api is running');
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // log error stack trace
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'internal server error'
  });
});

// export app for use in other files
module.exports = app;
