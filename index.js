const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/user");
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// Use config to obtain private_key, otherwise exit
if (!config.get("private_key")) {
  console.error("FATAL ERROR: private_key is not defined.");
  process.exit(1);
}

// Connect to mongo
mongoose.connect(`mongodb+srv://norcon4:${config.get("tth_db_pass")}@courseracluster-79sgj.mongodb.net/test?retryWrites=true&w=majority`, 
  { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
// Mount users route
app.use("/users", usersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));