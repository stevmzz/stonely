// import user model functions
const { createUser, findUserByEmail, validatePassword } = require('../models/user');

// import bcryptjs for password hashing
const bcrypt = require('bcryptjs');

// import validators from utils
const { isValidEmail, isValidPassword, isValidFullName } = require('../utils/validators');

// 
const jwt = require('jsonwebtoken');

// register a new user
async function register(req, res, next) {
  try {
    // validate request body
    const { email, password, full_name } = req.body;

    // check for missing fields
    if (!email || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'missing fields' });
    }
    // validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'invalid email format' });
    }
    // validate password length
    if (!isValidPassword(password)) {
      return res.status(400).json({ success: false, message: 'password must be at least 6 characters' });
    }
    // validate full name
    if (!isValidFullName(full_name)) {
      return res.status(400).json({ success: false, message: 'invalid full name' });
    }

    // check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'user already exists' });
    }

    // hash password with bcryptjs
    const password_hash = await bcrypt.hash(password, 10);

    // create user in database
    const userId = await createUser({ email, password_hash, full_name });
    res.status(201).json({ success: true, userId });

  } catch (err) {
    next(err);
  }
}

// login a user
async function login(req, res, next) {
  try {
    // validate request body
    const { email, password } = req.body;

    // check for missing fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'missing fields' });
    }
    // validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'invalid email format' });
    }
    // validate password length
    if (!isValidPassword(password)) {
      return res.status(400).json({ success: false, message: 'password must be at least 6 characters' });
    }

    // find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }

    // validate password using model method
    const isMatch = await validatePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // login successful
    res.json({ success: true, token });
    
  } catch (err) {
    next(err);
  }
}

// export the controller functions
module.exports = {
  register,
  login,
};
