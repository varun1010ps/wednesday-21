const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }

}, {timestamps: true});

// Create the model class
const Modelclass = mongoose.model("User-Token", userTokenSchema);

//Export the model
module.exports = Modelclass;