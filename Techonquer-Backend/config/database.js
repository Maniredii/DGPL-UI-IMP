const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Set connection options
        const options = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            bufferCommands: false, // Disable mongoose buffering
        };

        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('💡 Make sure MongoDB is running on your system');
        console.error('💡 You can start MongoDB with: sudo systemctl start mongod');
        console.error('💡 Or if using Docker: docker run -d -p 27017:27017 mongo');
        process.exit(1);
    }
};

module.exports = connectDB;
