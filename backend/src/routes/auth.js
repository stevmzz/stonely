// authentication routes for register
const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/user');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
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
    const password_hash = await bcrypt.hash(password, 10); // 10 salt rounds

    // create user
    const userId = await createUser({ email, password_hash, full_name });
    res.status(201).json({ success: true, userId });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
