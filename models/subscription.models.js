const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSubSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    stipeSubId:{
      type: String,
    },
    stipeCustId: {
      type: String,
    },
    subStart: {
      type: Date,
    },
    subCancel:{
      type: Date
    },
    subEnd: {
      type: Date,
    },
    trialEnd: {
      type: Date,
    },
    status: {
      type: String,
    },
    subType: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the model class
const Modelclass = mongoose.model("User-Sub", userSubSchema);

//Export the model
module.exports = Modelclass;
