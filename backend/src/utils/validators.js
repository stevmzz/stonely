// utils for input validation

// validate email format using regex
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// validate password length (min 6 chars)
function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

// validate full name (not empty)
function isValidFullName(full_name) {
  return typeof full_name === 'string' && full_name.trim().length > 0;
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidFullName,
};
