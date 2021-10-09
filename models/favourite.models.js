const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Type
// 1 - Session Beta
// 2 - Stories

const FavoriteModelSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      default: 1
    },
    slug: {
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
      required: true,
    },
    updatedAt: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Number,
      default: 0,
    }
})


FavoriteModelSchema.plugin(mongoosePaginate)

FavoriteModelSchema.pre("save", function (next) {
  var user = this;
  var now = new Date().getTime()
  if (!user.createdAt) {
    user.createdAt = now
    user.updatedAt = now
  } else {
    user.updatedAt = now
  }
  next ()
});

// Create the model class
const Modelclass = mongoose.model("favourites", FavoriteModelSchema);

//Export the model
module.exports = Modelclass;
