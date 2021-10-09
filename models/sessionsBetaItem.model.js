const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate-v2')

// Define our Model
const sessionBetaSchemaItem = new Schema({
  parentSessionId: {
    type: String,
    required: true
  },
  parentSessionBeta: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

sessionBetaSchemaItem.plugin(mongoosePaginate)

// Create the model class
const Modelclass = mongoose.model("sessionBetaItem", sessionBetaSchemaItem);

//Export the model
module.exports = Modelclass;
