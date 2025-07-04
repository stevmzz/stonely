const { findUserByEmail } = require('../models/user');

// get user profile
async function getProfile(req, res, next) {
  try {
    // req.user viene del JWT (userId y email)
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'user not found' });
    }

    // no enviar password_hash
    const { password_hash, ...userData } = user;
    res.json({ success: true, user: userData });
    
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile };