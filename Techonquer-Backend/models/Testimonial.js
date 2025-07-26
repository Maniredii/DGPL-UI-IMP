const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    designation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    company: {
        type: String,
        trim: true,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    image: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
