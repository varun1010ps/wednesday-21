const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const EpisodeSchema = new Schema({
  type: {
    type: Number,
    default: 4
  },
  title: {
    type: String,
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library-Topic",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  theme1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  theme1: {
    type: String,
    required: true,
  },
  theme2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  theme2: {
    type: String,
    required: true,
  },
  theme3Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  theme3: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  journal1:{
    type: String,
  },
  journal2:{
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Create the model class
const Modelclass = mongoose.model("Episode", EpisodeSchema);

//Export the model
module.exports = Modelclass;
