const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

// GET /api/user/profile - protected route
router.get('/profile', authenticateToken, getProfile);

module.exports = router;