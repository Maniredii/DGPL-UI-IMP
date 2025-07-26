const Testimonial = require('../models/Testimonial');
const { validationResult } = require('express-validator');

// Get all testimonials
const getAllTestimonials = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive } = req.query;
        const query = {};
        
        // Filter by active status if provided
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        const testimonials = await Testimonial.find(query)
            .populate('createdBy', 'username email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Testimonial.countDocuments(query);

        res.json({
            success: true,
            data: testimonials,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });

    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get testimonial by ID
const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id)
            .populate('createdBy', 'username email');

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        res.json({
            success: true,
            data: testimonial
        });

    } catch (error) {
        console.error('Get testimonial error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Create testimonial
const createTestimonial = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const testimonialData = {
            ...req.body,
            createdBy: req.session.user.id
        };

        const testimonial = new Testimonial(testimonialData);
        await testimonial.save();

        const populatedTestimonial = await Testimonial.findById(testimonial._id)
            .populate('createdBy', 'username email');

        res.status(201).json({
            success: true,
            message: 'Testimonial created successfully',
            data: populatedTestimonial
        });

    } catch (error) {
        console.error('Create testimonial error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        // Update testimonial
        Object.assign(testimonial, req.body);
        await testimonial.save();

        const updatedTestimonial = await Testimonial.findById(testimonial._id)
            .populate('createdBy', 'username email');

        res.json({
            success: true,
            message: 'Testimonial updated successfully',
            data: updatedTestimonial
        });

    } catch (error) {
        console.error('Update testimonial error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        await Testimonial.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Testimonial deleted successfully'
        });

    } catch (error) {
        console.error('Delete testimonial error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
