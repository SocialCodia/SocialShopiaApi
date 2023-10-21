const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['home', 'office'],
        default: 'home'
    },
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    default: {
        type: Boolean,
        default: false,
    },
    longitude: {
        type: String,
        required: false,
    },
    latitude: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

module.exports = new mongoose.model('Address', addressSchema, 'addresses');