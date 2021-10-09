
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Model for the Podcast Types
const TopicItemSchema = new Schema({
    parentTopicId: {
        type: String,
        required: true
    },
    parentTopic: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 3
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
    createdOn: {
        type: Date,
        default: Date.now
    }
})

TopicItemSchema.plugin(mongoosePaginate)
// Create the model class
const Modelclass = mongoose.model("topicItem", TopicItemSchema);

//Export the model
module.exports = Modelclass;
