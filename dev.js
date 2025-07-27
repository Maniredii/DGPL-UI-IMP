#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Techonquer Development Environment...\n');

// Start backend server
console.log('🔧 Starting Backend Server on port 5000...');
const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'Techonquer-Backend'),
    stdio: 'inherit',
    shell: true
});

// Wait a bit for backend to start
setTimeout(() => {
    console.log('⚛️  Starting React Admin Panel on port 8080...');
    const frontend = spawn('npm', ['run', 'dev'], {
        cwd: path.join(__dirname, 'techonquer-admin'),
        stdio: 'inherit',
        shell: true
    });

    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down servers...');
        backend.kill();
        frontend.kill();
        process.exit();
    });

    frontend.on('close', (code) => {
        console.log(`Frontend process exited with code ${code}`);
        backend.kill();
    });

    backend.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
        frontend.kill();
    });

}, 2000);

console.log('\n📱 Development URLs:');
console.log('🔗 Frontend (React): http://localhost:8080');
console.log('🔗 Backend (API): http://localhost:5000');
console.log('📊 API Health Check: http://localhost:5000/health');
console.log('\n💡 Press Ctrl+C to stop both servers\n');
