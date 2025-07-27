import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsPersonPlus, BsEye, BsEyeSlash, BsCheckCircle, BsXCircle, BsEnvelope, BsLock, BsPerson } from 'react-icons/bs';
import ThemeToggle from '../components/ThemeToggle';
import { Input, Button } from '../components/ui';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-20"></div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle size="md" />
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-lg">
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-xl"></div>

        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <BsPersonPlus className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Create Account</h1>
            <p className="text-slate-600 dark:text-slate-400">Join the administrative team</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Username Input */}
            <Input
              label="Username"
              icon={BsPerson}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              icon={BsEnvelope}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BsLock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
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
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${
                      passwordStrength <= 1 ? 'text-red-600 dark:text-red-400' :
                      passwordStrength <= 2 ? 'text-orange-600 dark:text-orange-400' :
                      passwordStrength <= 3 ? 'text-yellow-600 dark:text-yellow-400' :
                      passwordStrength <= 4 ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {getPasswordStrengthText().text}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{passwordStrength}/5</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
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

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BsLock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <BsEyeSlash className="h-5 w-5" /> : <BsEye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center text-xs">
                  {formData.password === formData.confirmPassword ? (
                    <><BsCheckCircle className="text-green-600 dark:text-green-400 mr-1" /> <span className="text-green-600 dark:text-green-400">Passwords match</span></>
                  ) : (
                    <><BsXCircle className="text-red-600 dark:text-red-400 mr-1" /> <span className="text-red-600 dark:text-red-400">Passwords do not match</span></>
                  )}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-sm text-green-600 dark:text-green-400 text-center">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            </Button>
          </form>

          {/* Navigation to login */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Info about admin registration */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm text-center">
              <strong>Note:</strong> Admin registration must be enabled on the server
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
