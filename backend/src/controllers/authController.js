// auth controller for register and login endpoints
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/user');

// register a new user
async function register(req, res, next) {
  try {
    // validate request body
    const { email, password, full_name } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'missing fields' });
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
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'missing fields' });
    }

    // find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }

    // compare password with bcryptjs
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }
    
    // login successful
    res.json({ success: true, userId: user.id });
  } catch (err) {
    next(err);
  }
}

// export the controller functions
module.exports = {
  register,
  login,
};
