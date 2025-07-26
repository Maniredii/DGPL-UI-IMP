const File = require('../models/File');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    // Define allowed file types
    const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain', 'text/csv',
        'video/mp4', 'video/avi', 'video/mov', 'video/wmv',
        'audio/mp3', 'audio/wav', 'audio/mpeg'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, documents, videos, and audio files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// Helper function to determine file category
const getFileCategory = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.includes('pdf') || mimetype.includes('document') || mimetype.includes('spreadsheet') || mimetype.includes('presentation') || mimetype.includes('text')) return 'document';
    return 'other';
};

// @desc    Upload a new file
// @route   POST /api/files
// @access  Private
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const publicUrl = `${baseUrl}/api/files/view/${req.file.filename}`;
        const downloadUrl = `${baseUrl}/api/files/download/${req.file.filename}`;

        const fileData = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            publicUrl: publicUrl,
            description: req.body.description || '',
            category: getFileCategory(req.file.mimetype),
            isPublic: req.body.isPublic !== 'false',
            uploadedBy: req.user.id,
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
        };

        const file = new File(fileData);
        await file.save();

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                id: file._id,
                filename: file.filename,
                originalName: file.originalName,
                publicUrl: file.publicUrl,
                downloadUrl: downloadUrl,
                size: file.size,
                mimetype: file.mimetype,
                category: file.category,
                description: file.description,
                isPublic: file.isPublic,
                tags: file.tags,
                createdAt: file.createdAt
            }
        });
    } catch (error) {
        // Clean up uploaded file if database save fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

// @desc    Get all files
// @route   GET /api/files
// @access  Private
const getFiles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query
        let query = {};
        
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        if (req.query.isPublic !== undefined) {
            query.isPublic = req.query.isPublic === 'true';
        }
        
        if (req.query.uploadedBy) {
            query.uploadedBy = req.query.uploadedBy;
        }

        // Search functionality
        if (req.query.search) {
            query.$or = [
                { originalName: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { tags: { $in: [new RegExp(req.query.search, 'i')] } }
            ];
        }

        const files = await File.find(query)
            .populate('uploadedBy', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await File.countDocuments(query);

        res.json({
            success: true,
            data: files,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get files error:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving files',
            error: error.message
        });
    }
};

// @desc    Get single file
// @route   GET /api/files/:id
// @access  Private
const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id)
            .populate('uploadedBy', 'username email');

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        res.json({
            success: true,
            data: file
        });
    } catch (error) {
        console.error('Get file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving file',
            error: error.message
        });
    }
};

// @desc    Update file metadata
// @route   PUT /api/files/:id
// @access  Private
const updateFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Check if user owns the file or is admin
        if (file.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this file'
            });
        }

        const allowedUpdates = ['description', 'isPublic', 'tags'];
        const updates = {};

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                if (field === 'tags' && typeof req.body[field] === 'string') {
                    updates[field] = req.body[field].split(',').map(tag => tag.trim());
                } else {
                    updates[field] = req.body[field];
                }
            }
        });

        const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).populate('uploadedBy', 'username email');

        res.json({
            success: true,
            message: 'File updated successfully',
            data: updatedFile
        });
    } catch (error) {
        console.error('Update file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating file',
            error: error.message
        });
    }
};

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Check if user owns the file or is admin
        if (file.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this file'
            });
        }

        // Delete file from filesystem
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Delete from database
        await File.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error.message
        });
    }
};

// @desc    Access/View file
// @route   GET /api/files/view/:filename
// @access  Public
const viewFile = async (req, res) => {
    try {
        const file = await File.findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        if (!file.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'File is not publicly accessible'
            });
        }

        if (!fs.existsSync(file.path)) {
            return res.status(404).json({
                success: false,
                message: 'File not found on server'
            });
        }

        // Increment view count
        file.incrementDownloadCount();

        // Set appropriate headers for viewing (not downloading)
        res.setHeader('Content-Type', file.mimetype);
        
        // For images, videos, and PDFs - display inline
        if (file.mimetype.startsWith('image/') || 
            file.mimetype.startsWith('video/') || 
            file.mimetype === 'application/pdf') {
            res.setHeader('Content-Disposition', 'inline');
        } else {
            // For other files, still allow inline viewing but suggest filename
            res.setHeader('Content-Disposition', `inline; filename="${file.originalName}"`);
        }

        // Send file
        res.sendFile(path.resolve(file.path));
    } catch (error) {
        console.error('View file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error viewing file',
            error: error.message
        });
    }
};

// @desc    Download file
// @route   GET /api/files/download/:filename
// @access  Public
const downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        if (!file.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'File is not publicly accessible'
            });
        }

        if (!fs.existsSync(file.path)) {
            return res.status(404).json({
                success: false,
                message: 'File not found on server'
            });
        }

        // Increment download count
        file.incrementDownloadCount();

        // Set appropriate headers for download
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.setHeader('Content-Type', file.mimetype);

        // Send file
        res.sendFile(path.resolve(file.path));
    } catch (error) {
        console.error('Download file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading file',
            error: error.message
        });
    }
};

// @desc    Generate public link for file
// @route   POST /api/files/:id/generate-link
// @access  Private
const generatePublicLink = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Check if user owns the file or is admin
        if (file.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to generate link for this file'
            });
        }

        // Update file to be public
        file.isPublic = true;
        await file.save();

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const viewUrl = `${baseUrl}/api/files/view/${file.filename}`;
        const downloadUrl = `${baseUrl}/api/files/download/${file.filename}`;

        res.json({
            success: true,
            message: 'Public link generated successfully',
            data: {
                publicUrl: viewUrl,
                downloadUrl: downloadUrl,
                filename: file.filename,
                originalName: file.originalName
            }
        });
    } catch (error) {
        console.error('Generate link error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating public link',
            error: error.message
        });
    }
};

module.exports = {
    upload,
    uploadFile,
    getFiles,
    getFile,
    updateFile,
    deleteFile,
    viewFile,
    downloadFile,
    generatePublicLink
};
