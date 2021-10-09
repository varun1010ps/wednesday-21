const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    orgName: {
        type: String,
        required: true
    },
    orgCode: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Organization', OrganizationSchema);