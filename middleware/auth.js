const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get jwt token from header
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  // 401 response if no token found
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Verifies jwt with private key
    const decoded = jwt.verify(token, config.get("private_key"));
    req.user = decoded;
    next();
  } catch (err) {
    // Catches invalid token
    res.status(400).send("Invalid token.");
  }
};