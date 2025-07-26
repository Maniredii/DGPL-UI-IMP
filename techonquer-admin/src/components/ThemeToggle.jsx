import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${sizeClasses[size]} ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className={`theme-toggle-slider ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="theme-toggle-icon">
          {isDarkMode ? (
            <BsMoon size={iconSizes[size]} />
          ) : (
            <BsSun size={iconSizes[size]} />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
