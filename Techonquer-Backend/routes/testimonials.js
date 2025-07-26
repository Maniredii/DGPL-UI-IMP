const express = require('express');
const router = express.Router();
const {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');
const { validateTestimonial } = require('../middleware/validation');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Get all testimonials (public)
router.get('/', getAllTestimonials);

// Get testimonial by ID (public)
router.get('/:id', getTestimonialById);

// Create testimonial (admin only)
router.post('/', isAuthenticated, isAdmin, validateTestimonial, createTestimonial);

// Update testimonial (admin only)
router.put('/:id', isAuthenticated, isAdmin, validateTestimonial, updateTestimonial);

// Delete testimonial (admin only)
router.delete('/:id', isAuthenticated, isAdmin, deleteTestimonial);

module.exports = router;
