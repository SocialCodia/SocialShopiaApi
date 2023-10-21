const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productStockSchema = new Schema({
    attributeId: {
        type: Schema.Types.ObjectId,
        ref: 'Attribute',
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000,
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('ProductStock', productStockSchema, 'product-stocks');