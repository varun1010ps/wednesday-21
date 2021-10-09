const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our Model
const teamAccessSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  company: {
    type: String,
  },
  noOfUser: {
    type: String,
  },
  message: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Create the model class
const Modelclass = mongoose.model("teamAcess", teamAccessSchema);

//Export the model
module.exports = Modelclass;
