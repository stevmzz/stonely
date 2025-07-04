const jwt = require('jsonwebtoken');

// middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ success: false, message: 'no token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'invalid token' });
    }
    req.user = user; // attach user info to request
    next();
  });
}

module.exports = authenticateToken;