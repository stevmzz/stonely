// healthcheck route
const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// export the router to be used in the main app
module.exports = router;

