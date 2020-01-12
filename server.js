const mongoose = require("mongoose");
const config = require("config");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const requirementsRoute = require("./routes/requirements");
const express = require("express");
const app = express();

// Connect to mongo
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// Bodyparser middleware
app.use(express.json());

// Mount api routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/requirements", requirementsRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set ports
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));