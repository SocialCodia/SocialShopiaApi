const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        unique: true
    },
    logo: {
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
        unique: true,
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Brand', brandSchema, 'brands'); 