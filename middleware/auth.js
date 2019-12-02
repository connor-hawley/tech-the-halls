const jwt = require("jsonwebtoken");
// const config = require("config");
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
  // Get jwt token from header
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  // 401 response if no token found
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Verifies jwt with private key
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    // Catches invalid token
    res.status(400).send("Invalid token.");
  }
};