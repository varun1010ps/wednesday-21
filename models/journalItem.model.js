const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Define our Model
const JournalItemSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  id: {
    type: String
  },
  questionId: {
    type: String
  },
  question: {
    type: String,
    default: 1
  },
  answer: {
    type: String,
  },
  updatedAt: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: 0,
  },
});

JournalItemSchema.pre("save", function (next) {
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

JournalItemSchema.plugin(mongoosePaginate)
// Create the model class
const Modelclass = mongoose.model("journalitem", JournalItemSchema);

//Export the model
module.exports = Modelclass;
