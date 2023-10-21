const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        // unique: true,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    images: [
        {
            type: Schema.ObjectId, ref: 'Upload'
        }
    ],

    thumbnail: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true,
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 2000,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },
    stockIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProductStock'
        }
    ],
    published: {
        type: Boolean,
        default: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    todaysDeal: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
    },
    discountType: {
        type: String,
        enum: ['amount', 'percent']
    },
    discountStartDate: {
        type: Date,
    },
    discountEndDate: {
        type: Date,
    },
    metaTitle: {
        type: String,
        minlength: 3,
        maxlength: 300,
        required: true,
    },
    metaDescription: {
        type: String,
        minlength: 3,
        maxlength: 2000,
        required: true
    },
    metaImage: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true,
    },
    slug: {
        type: String,
        minlength: 3,
        maxlength: 500,
        required: true,
        // unique: true
    }

},
    {
        timestamps: true
    }
);

module.exports = new mongoose.model('Product', productSchema, 'products');