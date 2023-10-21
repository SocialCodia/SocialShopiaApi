const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    },
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['product', 'brand', 'banner', 'profile', 'icon'],
        default: 'product'
    },
    mimeType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Upload', uploadSchema, 'uploads');