const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    discountType: {
        type: String,
        enum: ['amount', 'percent'],
    },
    discountPrice: {
        type: Number,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscountPrice: {
        type: Number,
        required: true
    },
    attribute: {
        type: String,
        required: true
    },
    stockId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductStock',
        required: true,
    },
}, {
    timestamps: true
});


module.exports = new mongoose.model('OrderDetail', orderDetailSchema, 'order-details');