import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BsEye,
  BsEyeSlash,
  BsEnvelope,
  BsLock,
  BsGoogle,
  BsFacebook,
  BsTwitter
} from 'react-icons/bs';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password && password.length >= 6;
  };

  // Handle social login (placeholder)
  const handleSocialLogin = (provider) => {
    setError(`${provider} login is not implemented in demo mode`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!validateEmail(email) || !validatePassword(password)) {
      setError('Please enter valid email and password');
      setIsLoading(false);
      return;
    }

    // Check for demo credentials first
    if (email === 'admin@techonquer.com' && password === 'password123') {
      console.log('Using demo credentials');
      // Mock successful login for demo
      const mockUser = {
        id: 'demo-admin-id',
        username: 'Admin',
        email: 'admin@techonquer.com',
        role: 'admin'
      };

      // Store user info and trigger auth change event
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Dispatch custom event to notify App component of auth change
      window.dispatchEvent(new Event('authChange'));

      // Navigate to dashboard
      navigate('/dashboard');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting API login...');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        // Check if user has admin role
        if (data.user.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
          setIsLoading(false);
          return;
        }

        // Store user info and trigger auth change event
        localStorage.setItem('user', JSON.stringify(data.user));

        // Dispatch custom event to notify App component of auth change
        window.dispatchEvent(new Event('authChange'));

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Backend server is not running. Using demo mode for admin@techonquer.com with password123.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Theme Toggle */}
      <div className="theme-toggle-wrapper">
        <ThemeToggle size="md" />
      </div>

      {/* Login Card */}
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">LOGIN</h1>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {/* Email Input */}
          <div className="input-group">
            <div className="input-wrapper">
              <BsEnvelope className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="login-input"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <div className="input-wrapper">
              <BsLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={isLoading}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="social-button"
            disabled={isLoading}
          >
            <BsGoogle />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="social-button"
            disabled={isLoading}
          >
            <BsFacebook />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('Twitter')}
            className="social-button"
            disabled={isLoading}
          >
            <BsTwitter />
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/signup" className="signup-text">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
