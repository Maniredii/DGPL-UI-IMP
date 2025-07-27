import React from 'react';

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
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800';
  
  const stateClasses = {
    default: 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20',
    success: 'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-900/20'
  };
  
  const state = error ? 'error' : success ? 'success' : 'default';
  const iconPadding = Icon ? 'pl-12' : 'pl-4';
  const rightIconPadding = RightIcon ? 'pr-12' : 'pr-4';
  
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        
        <input
          type={type}
          className={`${baseClasses} ${stateClasses[state]} ${iconPadding} ${rightIconPadding} ${className}`}
          {...props}
        />
        
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <RightIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
          <span className="mr-1">✓</span>
          {success}
        </p>
      )}
      
      {help && !error && !success && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {help}
        </p>
      )}
    </div>
  );
};

export default Input;
