import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsPersonPlus, BsEye, BsEyeSlash, BsCheckCircle, BsXCircle } from 'react-icons/bs';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-500' };
      case 2: return { text: 'Weak', color: 'text-orange-500' };
      case 3: return { text: 'Fair', color: 'text-yellow-500' };
      case 4: return { text: 'Good', color: 'text-blue-500' };
      case 5: return { text: 'Strong', color: 'text-green-500' };
      default: return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting admin registration...');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Admin account created successfully! You can now sign in.');
        // Clear form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Backend server is not running or admin registration is disabled.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen animated-gradient relative overflow-hidden py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse morphing-shape"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 morphing-shape"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000 morphing-shape"></div>

        {/* Floating particles */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="relative z-10 p-8 glass-card rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 glow-purple float-animation">
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <BsPersonPlus className="text-purple-400 text-6xl mx-auto mb-4 drop-shadow-lg animate-pulse float-animation" />
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-20 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-2xl opacity-10 animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent text-shimmer">
            Create Admin Account
          </h2>
          <p className="text-gray-300 text-lg font-medium">Join the administrative team</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="group">
            <label className="block text-gray-300 mb-2 font-medium transition-colors group-focus-within:text-purple-400" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>

          <div className="group">
            <label className="block text-gray-300 mb-2 font-medium transition-colors group-focus-within:text-purple-400" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="group">
            <label className="block text-gray-300 mb-2 font-medium transition-colors group-focus-within:text-purple-400" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                placeholder="Create a strong password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${getPasswordStrengthText().color}`}>
                    {getPasswordStrengthText().text}
                  </span>
                  <span className="text-gray-400">{passwordStrength}/5</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordStrength <= 1 ? 'bg-red-500' :
                      passwordStrength <= 2 ? 'bg-orange-500' :
                      passwordStrength <= 3 ? 'bg-yellow-500' :
                      passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="group">
            <label className="block text-gray-300 mb-2 font-medium transition-colors group-focus-within:text-purple-400" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                disabled={isLoading}
              >
                {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="mt-2 flex items-center text-xs">
                {formData.password === formData.confirmPassword ? (
                  <><BsCheckCircle className="text-green-500 mr-1" /> <span className="text-green-500">Passwords match</span></>
                ) : (
                  <><BsXCircle className="text-red-500 mr-1" /> <span className="text-red-500">Passwords do not match</span></>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700/50 rounded-xl backdrop-blur-sm animate-shake">
              <p className="text-red-300 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-900/50 border border-green-700/50 rounded-xl backdrop-blur-sm">
              <p className="text-green-300 text-sm text-center font-medium">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-purple-800 disabled:to-violet-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/25"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Admin Account'
            )}
          </button>
        </form>

        {/* Navigation to login */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Info about admin registration */}
        <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-xl backdrop-blur-sm">
          <p className="text-yellow-300 text-xs text-center">
            <strong>Note:</strong> Admin registration must be enabled on the server
          </p>
        </div>
      </div>
    </div>
  );
}
