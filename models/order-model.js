const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shippingId: {
        type: Schema.Types.ObjectId,
        ref: 'ShippingAddress',
        required: true,
    },
    paymentMethodId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'out_for_delivery', 'returned', 'failed', 'canceled'],
        default: 'pending'
    },
    deliveryBoyId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    note: {
        type: String,
        maxlength: 1000,
        required: false
    },
    code: {
        type: String,
        maxlength: 1000,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    couponDiscount: {
        type: Number,
        default: 0,
        required: false
    },
    productDiscount: {
        type: Number,
        default: 0,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    timeSlotId: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlot',
    },
    couponId: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon',
    },
    shippingCost: {
        type: Number,
        default: 0,
        required: false
    }
}, {
    timestamps: true
});


module.exports = new mongoose.model('Order', orderSchema, 'orders');