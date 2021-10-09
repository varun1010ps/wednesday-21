const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Define our Model
const StoriesSchema = new Schema({
  type: {
    type: Number,
    default: 2
  },
  themeId: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

StoriesSchema.plugin(mongoosePaginate)

// Create the model class
const Modelclass = mongoose.model("stories", StoriesSchema);

//Export the model
module.exports = Modelclass;
