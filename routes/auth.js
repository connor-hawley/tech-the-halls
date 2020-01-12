const { validateUserLogin } = require("../middleware/auth");
const config = require("config");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

// Retrieves current user based on user in request
authRouter.get("/", (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then(user => res.json(user))
    .catch((err) => console.log(err));
});

// Handles user login
authRouter.post("/", (req, res) => {
  // Validates request body
  const { error } = validateUserLogin(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { email, password } = req.body;

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if(!user) {
        return res.status(400).json({ msg: "User Does not exist" });
      }

      // Validate password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
          }

          // Generates jwt token
          jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin }, 
            config.get('jwtSecret'), 
            { expiresIn: 3600 }, 
            (err, token) => {
              if (err) {
                return res.status(400).json({ msg: err.message });
              }
              res
                .header("x-auth-token", token)
                .json({
                  user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                  }
                });
            }
          );
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = authRouter;