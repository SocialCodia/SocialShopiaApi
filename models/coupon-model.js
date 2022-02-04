const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 300,
        required: true,
    },
    code: {
        type: String,
        minlength: 5,
        maxlength: 15,
        unique: true,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    type: {
        type: String,
        enum: ['percent', 'amount'],
        default: 'percent'
    },
    minPurchase: {
        type: Number,
        min: 0,
        required: true,
    },
    maxDiscount: {
        type: Number,
        min: 0,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = new mongoose.model('Coupon', couponSchema, 'coupons');