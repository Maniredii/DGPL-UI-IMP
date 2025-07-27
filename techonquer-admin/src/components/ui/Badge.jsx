import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-md transition-all duration-200';

  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    primary: 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
