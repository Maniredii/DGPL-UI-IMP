const express = require('express');
const router = express.Router();
const { 
    register, 
    registerAdmin, 
    login, 
    logout, 
    getCurrentUser 
} = require('../controllers/authController');
const { validateUser, validateLogin } = require('../middleware/validation');
const { isAdminRegEnabled } = require('../middleware/auth');

// User registration
router.post('/register', validateUser, register);

// Admin registration (only when ADMIN_REG=true)
router.post('/register-admin', isAdminRegEnabled, validateUser, registerAdmin);

// User login
router.post('/login', validateLogin, login);

// User logout
router.post('/logout', logout);

// Get current user
router.get('/me', getCurrentUser);

module.exports = router;
