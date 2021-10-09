const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminTokenSchema = new Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'admins'
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
const Modelclass = mongoose.model("admin-Token", adminTokenSchema);

//Export the model
module.exports = Modelclass;