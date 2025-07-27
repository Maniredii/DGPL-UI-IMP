#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Techonquer Deployment Process...\n');

// Build the React admin panel
console.log('📦 Building React Admin Panel...');
try {
    process.chdir(path.join(__dirname, 'techonquer-admin'));
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ React build completed successfully!\n');
} catch (error) {
    console.error('❌ React build failed:', error.message);
    process.exit(1);
}

// Check if dist folder exists
const distPath = path.join(__dirname, 'techonquer-admin', 'dist');
if (!fs.existsSync(distPath)) {
    console.error('❌ Build folder not found. Build may have failed.');
    process.exit(1);
}

console.log('📁 Build files created in:', distPath);

// Go back to root directory
process.chdir(__dirname);

// Start the backend server
console.log('🔧 Starting Backend Server...');
try {
    process.chdir(path.join(__dirname, 'Techonquer-Backend'));
    console.log('🌟 Backend server will serve both API and React app');
    console.log('🔗 Access your app at: http://localhost:5000');
    console.log('📊 API endpoints available at: http://localhost:5000/api/*');
    console.log('\n⚡ Starting server...\n');
    
    execSync('npm start', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Backend server failed to start:', error.message);
    process.exit(1);
}
