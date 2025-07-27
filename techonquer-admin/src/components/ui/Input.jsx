import React, { useState } from 'react';

const Input = ({ 
  label,
  error,
  success,
  help,
  icon: Icon,
  rightIcon: RightIcon,
  className = '',
  containerClassName = '',
  type = 'text',
  variant = 'default',
  size = 'md',
  required = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  
  const baseClasses = 'w-full bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 focus:outline-none transform hover:scale-[1.01] focus:scale-[1.01]';
  
  const variants = {
    default: 'shadow-soft focus:shadow-medium',
    glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-glass',
    gradient: 'bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-soft'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base'
  };
  
  const stateClasses = {
    default: 'border-slate-200/60 dark:border-slate-700/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
    error: 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10',
    success: 'border-emerald-300 dark:border-emerald-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10'
  };
  
  const state = error ? 'error' : success ? 'success' : 'default';
  const iconPadding = Icon ? 'pl-12' : '';
  const rightIconPadding = RightIcon ? 'pr-12' : '';
  
  return (
    <div className={`space-y-2 animate-fade-in-up ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium transition-colors duration-200 ${
          focused ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'
        }`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
            focused ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <input
          type={type}
          className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${stateClasses[state]} ${iconPadding} ${rightIconPadding} ${className}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {RightIcon && (
          <div className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200 ${
            focused ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'
          }`}>
            <RightIcon className="h-5 w-5" />
          </div>
        )}
        
        {/* Floating border effect */}
        <div className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10`} />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-slide-in-left">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-slide-in-left">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {success}
        </p>
      )}
      
      {help && !error && !success && (
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-slide-in-left">
          {help}
        </p>
      )}
    </div>
  );
};

export default Input;
