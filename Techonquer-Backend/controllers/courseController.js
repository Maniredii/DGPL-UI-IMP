const Course = require('../models/Course');
const { validationResult } = require('express-validator');

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            category, 
            level, 
            isActive, 
            isFeatured,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const query = {};
        
        // Filter by category
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }
        
        // Filter by level
        if (level) {
            query.level = level;
        }
        
        // Filter by active status
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }
        
        // Filter by featured status
        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured === 'true';
        }

        // Search functionality
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { shortDescription: { $regex: search, $options: 'i' } },
                { instructor: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const courses = await Course.find(query)
            .populate('createdBy', 'username email')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Course.countDocuments(query);

        res.json({
            success: true,
            data: courses,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });

    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('createdBy', 'username email');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course
        });

    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get course by path
const getCourseByPath = async (req, res) => {
    try {
        const course = await Course.findOne({ path: req.params.path })
            .populate('createdBy', 'username email');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course
        });

    } catch (error) {
        console.error('Get course by path error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Create course
const createCourse = async (req, res) => {
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

        const courseData = {
            ...req.body,
            createdBy: req.session.user.id
        };

        const course = new Course(courseData);
        await course.save();

        const populatedCourse = await Course.findById(course._id)
            .populate('createdBy', 'username email');

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: populatedCourse
        });

    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Update course
const updateCourse = async (req, res) => {
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

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Update course
        Object.assign(course, req.body);
        await course.save();

        const updatedCourse = await Course.findById(course._id)
            .populate('createdBy', 'username email');

        res.json({
            success: true,
            message: 'Course updated successfully',
            data: updatedCourse
        });

    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await Course.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });

    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get course categories
const getCourseCategories = async (req, res) => {
    try {
        const categories = await Course.distinct('category', { isActive: true });
        
        res.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getCourseByPath,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseCategories
};
