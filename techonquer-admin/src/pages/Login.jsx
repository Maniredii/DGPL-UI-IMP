import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BsEye,
  BsEyeSlash,
  BsEnvelope,
  BsLock,
  BsGoogle,
  BsFacebook,
  BsTwitter,
  BsShieldLock
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-20"></div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle size="md" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-xl"></div>

        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <BsShieldLock className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-600 dark:text-slate-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BsEnvelope className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BsLock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <BsEyeSlash className="h-5 w-5" /> : <BsEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            <span className="px-4 text-sm text-slate-500 dark:text-slate-400">Or continue with</span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center py-3 px-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={isLoading}
            >
              <BsGoogle className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="flex items-center justify-center py-3 px-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={isLoading}
            >
              <BsFacebook className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Twitter')}
              className="flex items-center justify-center py-3 px-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={isLoading}
            >
              <BsTwitter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
              <strong>Demo:</strong> admin@techonquer.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
