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
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        ${sizeClasses[size]}
        bg-slate-200 dark:bg-slate-700
        hover:bg-slate-300 dark:hover:bg-slate-600
        border border-slate-300 dark:border-slate-600
        rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-slate-800
        shadow-sm hover:shadow-md
        group
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient for active state */}
      <div className={`
        absolute inset-0 rounded-full transition-opacity duration-300
        ${isDarkMode
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 opacity-100'
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 opacity-100'
        }
      `} />

      {/* Toggle slider */}
      <div className={`
        absolute w-5 h-5 bg-white rounded-full shadow-md
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        ${isDarkMode ? 'translate-x-3' : '-translate-x-3'}
        ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}
      `}>
        {/* Icon with smooth transition */}
        <div className={`
          transition-all duration-300 ease-in-out
          ${iconSizes[size]}
          ${isDarkMode ? 'text-indigo-600 rotate-0' : 'text-yellow-600 rotate-180'}
        `}>
          {isDarkMode ? (
            <BsMoon className="drop-shadow-sm" />
          ) : (
            <BsSun className="drop-shadow-sm" />
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
};

export default ThemeToggle;
