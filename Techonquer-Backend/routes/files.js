const express = require('express');
const router = express.Router();
const {
    upload,
    uploadFile,
    getFiles,
    getFile,
    updateFile,
    deleteFile,
    viewFile,
    downloadFile,
    generatePublicLink
} = require('../controllers/fileController');
const { protect } = require('../middleware/auth');

// @desc    Upload file
// @route   POST /api/files
// @access  Private
router.post('/', protect, upload.single('file'), uploadFile);

// @desc    Get all files
// @route   GET /api/files
// @access  Private
router.get('/', protect, getFiles);

// @desc    Get single file
// @route   GET /api/files/:id
// @access  Private
router.get('/:id', protect, getFile);

// @desc    Update file metadata
// @route   PUT /api/files/:id
// @access  Private
router.put('/:id', protect, updateFile);

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
router.delete('/:id', protect, deleteFile);

// @desc    View/Access file (Public route)
// @route   GET /api/files/view/:filename
// @access  Public
router.get('/view/:filename', viewFile);

// @desc    Download file (Public route)
// @route   GET /api/files/download/:filename
// @access  Public
router.get('/download/:filename', downloadFile);

// @desc    Generate public link for file
// @route   POST /api/files/:id/generate-link
// @access  Private
router.post('/:id/generate-link', protect, generatePublicLink);

module.exports = router;
