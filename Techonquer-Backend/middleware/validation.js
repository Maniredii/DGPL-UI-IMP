const { body } = require('express-validator');

// User validation
const validateUser = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username can only contain letters, numbers, hyphens, and underscores'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

// Login validation
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Testimonial validation
const validateTestimonial = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name must be less than 100 characters'),
    
    body('designation')
        .trim()
        .notEmpty()
        .withMessage('Designation is required')
        .isLength({ max: 100 })
        .withMessage('Designation must be less than 100 characters'),
    
    body('company')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company must be less than 100 characters'),
    
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ max: 1000 })
        .withMessage('Message must be less than 1000 characters'),
    
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    
    body('image')
        .optional()
        .trim()
        .isURL()
        .withMessage('Image must be a valid URL')
];

// Course validation
const validateCourse = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 200 })
        .withMessage('Title must be less than 200 characters'),
    
    body('path')
        .trim()
        .notEmpty()
        .withMessage('Path is required')
        .isLength({ max: 100 })
        .withMessage('Path must be less than 100 characters')
        .matches(/^[a-zA-Z0-9\-_]+$/)
        .withMessage('Path can only contain letters, numbers, hyphens, and underscores'),
    
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 2000 })
        .withMessage('Description must be less than 2000 characters'),
    
    body('shortDescription')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Short description must be less than 500 characters'),
    
    body('instructor')
        .trim()
        .notEmpty()
        .withMessage('Instructor is required')
        .isLength({ max: 100 })
        .withMessage('Instructor name must be less than 100 characters'),
    
    body('duration')
        .trim()
        .notEmpty()
        .withMessage('Duration is required'),
    
    body('level')
        .isIn(['Beginner', 'Intermediate', 'Advanced'])
        .withMessage('Level must be Beginner, Intermediate, or Advanced'),
    
    body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .isFloat({ min: 0 })
        .withMessage('Price must be greater than or equal to 0'),
    
    body('originalPrice')
        .optional()
        .isNumeric()
        .withMessage('Original price must be a number')
        .isFloat({ min: 0 })
        .withMessage('Original price must be greater than or equal to 0'),
    
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    
    body('image')
        .optional()
        .trim()
        .isURL()
        .withMessage('Image must be a valid URL'),
    
    body('requirements')
        .optional()
        .isArray()
        .withMessage('Requirements must be an array'),
    
    body('whatYouWillLearn')
        .optional()
        .isArray()
        .withMessage('What you will learn must be an array'),
    
    body('syllabusDownloadLink')
        .optional()
        .trim()
        .isURL()
        .withMessage('Syllabus download link must be a valid URL'),
    
    body('enrollLink')
        .optional()
        .trim()
        .isURL()
        .withMessage('Enroll link must be a valid URL')
];

module.exports = {
    validateUser,
    validateLogin,
    validateTestimonial,
    validateCourse
};
