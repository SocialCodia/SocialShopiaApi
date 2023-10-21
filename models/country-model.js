const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Country', countrySchema, 'countries');
