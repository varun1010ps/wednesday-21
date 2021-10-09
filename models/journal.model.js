const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Type
// 1 - Session Beta
// 2 - Stories
// 3 - Topic
// 4 - Episode

// Define our Model
const JournalSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  id: {
    type: String,
    unique: false 
  },
  type: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
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
    required: true,
  },
  updatedAt: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Number,
    default: 0
  },
});

JournalSchema.plugin(mongoosePaginate)

JournalSchema.pre("save", function (next) {
  var user = this;
  var now = new Date().getTime()
  if (!user.createdAt) {
    user.createdAt = now
    user.updatedAt = now
  } else {
    user.updatedAt = now
  }
  next()
});

// Create the model class
const Modelclass = mongoose.model("journals", JournalSchema);

//Export the model
module.exports = Modelclass;
