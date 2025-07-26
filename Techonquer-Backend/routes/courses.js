const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    getCourseByPath,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseCategories
} = require('../controllers/courseController');
const { validateCourse } = require('../middleware/validation');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Get all courses (public)
router.get('/', getAllCourses);

// Get course categories (public)
router.get('/categories', getCourseCategories);

// Get course by path (public)
router.get('/path/:path', getCourseByPath);

// Get course by ID (public)
router.get('/:id', getCourseById);

// Create course (admin only)
router.post('/', isAuthenticated, isAdmin, validateCourse, createCourse);

// Update course (admin only)
router.put('/:id', isAuthenticated, isAdmin, validateCourse, updateCourse);

// Delete course (admin only)
router.delete('/:id', isAuthenticated, isAdmin, deleteCourse);

module.exports = router;
