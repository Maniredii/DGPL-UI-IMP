import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsShieldLock, BsEye, BsEyeSlash } from 'react-icons/bs';

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
  const navigate = useNavigate();

  // Animate form entrance
  React.useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
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

      <div className={`relative z-10 p-8 glass-card rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 glow-purple float-animation ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <BsShieldLock className="text-purple-400 text-6xl mx-auto mb-4 drop-shadow-lg animate-pulse float-animation" />
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-20 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur-2xl opacity-10 animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent text-shimmer">
            Admin Portal
          </h2>
          <p className="text-gray-300 text-lg font-medium">Secure access for administrators</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <label className="block text-gray-300 mb-2 font-medium transition-colors group-focus-within:text-purple-400" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 transform focus:scale-105"
              placeholder="admin@techonquer.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 glass-input rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 transform focus:scale-105"
                placeholder="Enter your password"
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
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700/50 rounded-xl backdrop-blur-sm animate-shake">
              <p className="text-red-300 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-purple-800 disabled:to-violet-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/25 ripple-effect glow-purple"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
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
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-medium" htmlFor="forgotEmail">
                  Email Address
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  required
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
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl transition-all duration-200"
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
