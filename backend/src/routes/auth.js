// authentication routes for register and login
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register - user registration
router.post('/register', register);

// POST /api/auth/login - user login
router.post('/login', login);

module.exports = router;
