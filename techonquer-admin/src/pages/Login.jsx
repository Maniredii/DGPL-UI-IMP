import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsShieldLock, BsEye, BsEyeSlash } from 'react-icons/bs';

// Loading Skeleton Component
const LoginSkeleton = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-16 h-16 mx-auto mb-4 skeleton rounded-full"></div>
      <div className="skeleton skeleton-text w-48 mx-auto mb-2"></div>
      <div className="skeleton skeleton-text w-32 mx-auto"></div>
    </div>
    <div className="space-y-6">
      <div>
        <div className="skeleton skeleton-text w-24 mb-2"></div>
        <div className="skeleton skeleton-input"></div>
      </div>
      <div>
        <div className="skeleton skeleton-text w-20 mb-2"></div>
        <div className="skeleton skeleton-input"></div>
      </div>
      <div className="skeleton skeleton-button"></div>
    </div>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  // Animate form entrance and initialize
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
      setIsInitializing(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load remember me preference
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Real-time validation functions
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validatePassword(value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }

    // Here you would typically call a forgot password API
    setError('');
    alert('Password reset instructions have been sent to your email (Demo mode - feature not implemented)');
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

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

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

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
    <div className="flex items-center justify-center min-h-screen animated-gradient relative overflow-hidden">
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

      <div className={`relative z-10 p-4 sm:p-8 glass-card rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-105 glow-purple float-animation ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {isInitializing ? (
          <LoginSkeleton />
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <BsShieldLock className="text-purple-400 text-6xl mx-auto mb-4 drop-shadow-lg animate-pulse float-animation" />
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-20 animate-ping"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-2xl opacity-10 animate-pulse"></div>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent text-shimmer">
                Admin Portal
              </h2>
              <p className="text-base sm:text-lg text-gray-300 font-medium">Secure access for administrators</p>
            </div>

        <form onSubmit={handleLogin} className="space-y-6" role="form" aria-label="Admin login form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                className={`form-input ${emailError ? 'form-input-error' : ''}`}
                placeholder="admin@techonquer.com"
                required
                disabled={isLoading}
                aria-describedby={emailError ? "email-error" : undefined}
                aria-invalid={emailError ? "true" : "false"}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  email && !emailError ? 'bg-green-400' :
                  emailError ? 'bg-red-400' :
                  'bg-gray-600'
                }`}></div>
              </div>
            </div>
            {emailError && (
              <p id="email-error" className="form-error" role="alert">
                {emailError}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                className={`form-input pr-12 ${passwordError ? 'form-input-error' : ''}`}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                aria-describedby={passwordError ? "password-error" : "password-help"}
                aria-invalid={passwordError ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-400 transition-colors duration-200 p-1 rounded-md hover:bg-white/10"
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
              </button>
              <div className="absolute inset-y-0 right-10 flex items-center pr-3 pointer-events-none">
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  password && !passwordError ? 'bg-green-400' :
                  passwordError ? 'bg-red-400' :
                  'bg-gray-600'
                }`}></div>
              </div>
            </div>
            {passwordError && (
              <p id="password-error" className="form-error" role="alert">
                {passwordError}
              </p>
            )}
            {!passwordError && password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">Strength:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        password.length >= 8 ? 'bg-green-400 w-full' :
                        password.length >= 6 ? 'bg-yellow-400 w-2/3' :
                        'bg-red-400 w-1/3'
                      }`}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${
                    password.length >= 8 ? 'text-green-400' :
                    password.length >= 6 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {password.length >= 8 ? 'Strong' :
                     password.length >= 6 ? 'Medium' :
                     'Weak'}
                  </span>
                </div>
              </div>
            )}
            {!passwordError && !password && (
              <p id="password-help" className="form-help">
                Minimum 6 characters required
              </p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium hover:underline"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm animate-shake">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-xs">!</span>
                </div>
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || emailError || passwordError}
            className="btn btn-primary w-full py-4 text-base font-semibold relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <BsShieldLock className="text-lg" />
                  <span>Sign In</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Navigation to signup */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an admin account?{' '}
            <Link
              to="/signup"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo credentials info */}
        <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-xl backdrop-blur-sm">
          <p className="text-blue-300 text-xs text-center">
            <strong>Demo:</strong> admin@techonquer.com / password123
          </p>
        </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Authorized personnel only
              </p>
            </div>
          </>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-card rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <BsShieldLock className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
              <p className="text-gray-400 text-sm">Enter your email to receive reset instructions</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="form-group">
                <label className="form-label" htmlFor="forgotEmail">
                  Email Address
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail('');
                    setError('');
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
