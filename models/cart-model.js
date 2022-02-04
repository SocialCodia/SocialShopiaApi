const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductStock',
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Cart', cartSchema, 'carts');