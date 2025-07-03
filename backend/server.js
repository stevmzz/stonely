// import the express app
const app = require('./src/app');

// get port from environment or use 3000 by default
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});