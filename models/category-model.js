const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({

    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 40,
        required: true,
        unique: true
    },
    banner: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
    },
    icon: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true,
        unique: true
    },
    metaTitle: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true
    },
    metaDescription: {
        type: String,
        minlength: 3,
        maxlength: 1000,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Category', categorySchema, 'categories');