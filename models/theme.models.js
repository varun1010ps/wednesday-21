const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const ThemeSchema = new Schema({
    theme: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

// Create the model class
const Modelclass = mongoose.model("Theme", ThemeSchema);

//Export the model
module.exports = Modelclass;
