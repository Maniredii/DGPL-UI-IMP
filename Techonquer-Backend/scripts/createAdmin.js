const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'sample@gmail.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const adminUser = new User({
            username: 'admin',
            email: 'sample@gmail.com',
            password: 'Sample@123',
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email: sample@gmail.com');
        console.log('Password: Sample@123');
        
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

createAdminUser(); 