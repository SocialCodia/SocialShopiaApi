const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({

    title: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true
    },
    type: {
        type: String,
        enum: ['product', 'category'],
        default: 'product'
    },
    status: {
        type: Boolean,
        default: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Banner', bannerSchema, 'banners');