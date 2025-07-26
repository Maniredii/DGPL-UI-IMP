const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    path: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 100,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9\-_]+$/.test(v);
            },
            message: 'Path can only contain letters, numbers, hyphens, and underscores'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: 500
    },
    instructor: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        trim: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    whatYouWillLearn: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    enrolledStudents: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    syllabusDownloadLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Syllabus download link must be a valid URL'
        }
    },
    enrollLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Enroll link must be a valid URL'
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
