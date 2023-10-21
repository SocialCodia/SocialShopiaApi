const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    cost: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    }
}, { timestamps: true });

module.exports = new mongoose.model('City', citySchema, 'cities');
