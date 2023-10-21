const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('State', stateSchema, 'states');
