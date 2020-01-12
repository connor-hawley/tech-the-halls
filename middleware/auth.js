const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("Joi");

// Middleware to validate token
function validateToken(req, res, next) {
  // Get jwt token from header
  const token = req.header("x-auth-token");
  // 401 response if no token found
  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    // Verifies jwt with private key
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (err) {
    // Catches invalid token
    res.status(400).json({ msg: "Invalid token." });
  }
};

// Validates user registration
function validateUserRegister(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

// Validates user login
function validateUserLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

module.exports = { validateUserRegister, validateToken, validateUserLogin };