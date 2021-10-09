const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate-v2')

// Define our Model
const sessionBetaSchema = new Schema({
  type: {
    type: Number,
    default: 1
  },
  themeId: {
    type: String,
    required: true
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
  count: {
    type: Number,
    default: 0
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

sessionBetaSchema.plugin(mongoosePaginate)

// Create the model class
const Modelclass = mongoose.model("sessionBeta", sessionBetaSchema);

//Export the model
module.exports = Modelclass;
