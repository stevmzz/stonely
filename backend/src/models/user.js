const pool = require('../models/database');

// create a new user
async function createUser({ email, password_hash, full_name }) {
  const [result] = await pool.query(
    'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)',
    [email, password_hash, full_name]
  );
  return result.insertId;
}

// find a user by email
async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // return the first user found
}

// export the functions to be used in other files
module.exports = {
  createUser,
  findUserByEmail,
};
