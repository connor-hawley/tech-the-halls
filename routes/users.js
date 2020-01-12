const { validateUserRegister } = require("../middleware/auth");
const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const userRouter = express.Router();

// Registers user
userRouter.post("/", (req, res) => {
  // Validates request body
  const { error } = validateUserRegister(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, password } = req.body;

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      
      user = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({ msg: err.message });
          }
          user.password = hash;
          // Saves user to db
          user.save()
            .then((user) => {
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
        });
      });
    });
});

module.exports = userRouter;