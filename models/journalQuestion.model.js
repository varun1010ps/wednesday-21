const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2')

// Type
// 1 - Session Beta
// 2 - Stories
// 3 - Topic
// 4 - Episode

// Model for the Podcast Types
const JournalQuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    type: {
      type: Number,
      default: 1
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

JournalQuestionSchema.plugin(mongoosePaginate)
// Create the model class
const Modelclass = mongoose.model("journalquestion", JournalQuestionSchema);

//Export the model
module.exports = Modelclass;
