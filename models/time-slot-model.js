const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false, 
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('TimeSlot', timeSlotSchema, 'time-slots');