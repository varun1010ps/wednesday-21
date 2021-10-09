
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Model for the Podcast Types
const TopicSchema = new Schema({
    type: {
        type: Number,
        default: 3
    },
    themeId: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    topicItemsCount : {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

TopicSchema.plugin(mongoosePaginate)

// Create the model class
const Modelclass = mongoose.model("Library-Topic", TopicSchema);

//Export the model
module.exports = Modelclass;
