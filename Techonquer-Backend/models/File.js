const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    publicUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    category: {
        type: String,
        enum: ['document', 'image', 'video', 'audio', 'other'],
        default: 'other'
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    metadata: {
        type: Map,
        of: String
    }
}, {
    timestamps: true
});

// Index for faster queries
fileSchema.index({ uploadedBy: 1, createdAt: -1 });
fileSchema.index({ category: 1 });
fileSchema.index({ isPublic: 1 });

// Virtual for file URL
fileSchema.virtual('fullUrl').get(function() {
    return this.publicUrl;
});

// Method to increment download count
fileSchema.methods.incrementDownloadCount = function() {
    this.downloadCount += 1;
    return this.save();
};

module.exports = mongoose.model('File', fileSchema);
