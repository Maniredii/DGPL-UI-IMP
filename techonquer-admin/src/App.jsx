import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import FileManager from './pages/FileManager';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastProvider } from './components/Toast';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      const newAuthStatus = !!user;
      console.log('Auth status check:', { user, newAuthStatus, currentStatus: isLoggedIn });
      setIsLoggedIn(newAuthStatus);
    };

    // Check initial auth status
    checkAuthStatus();

    // Listen for storage changes (when localStorage is modified)
    window.addEventListener('storage', checkAuthStatus);

    // Custom event listener for manual localStorage changes within the same tab
    window.addEventListener('authChange', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
        {!isLoggedIn ? (
          // Show only login and signup pages if not logged in
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          // Show main app if logged in
          <div className="grid-container">
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            />
            <main className="main-container">
              <Header OpenSidebar={OpenSidebar} />
              <div className="main-content">
                <Routes>
                  <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/files" element={<FileManager />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<h1 className="text-white">404 - Not Found</h1>} />
                </Routes>
              </div>
            </main>
          </div>
        )}
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
