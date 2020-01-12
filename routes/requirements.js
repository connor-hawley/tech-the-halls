//import { validateToken } from '../middleware/auth';
const express = require("express");
const requirementsRouter = express.Router();

// Retrieves member requirements completed by a specific user
requirementsRouter.get("/", (req, res) => {
  return res.status(400).json({ msg: "Internal server error." });
});

module.exports = requirementsRouter;