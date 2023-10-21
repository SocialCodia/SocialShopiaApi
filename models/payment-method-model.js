const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('PaymentMethod', paymentMethodSchema, 'payment-methods');