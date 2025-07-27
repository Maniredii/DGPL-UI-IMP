import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  leftIcon,
  rightIcon,
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-medium rounded-xl transition-all duration-300 
    btn-hover focus-modern disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-95 
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-blue-600 
      hover:from-purple-700 hover:to-blue-700 
      text-white shadow-lg hover:shadow-xl
      border border-purple-500/30
    `,
    secondary: `
      glass border-white/20 text-white 
      hover:bg-white/20 hover:border-white/30
      shadow-md hover:shadow-lg
    `,
    success: `
      bg-gradient-to-r from-green-500 to-teal-500 
      hover:from-green-600 hover:to-teal-600 
      text-white shadow-lg hover:shadow-xl
      border border-green-500/30
    `,
    warning: `
      bg-gradient-to-r from-orange-500 to-red-500 
      hover:from-orange-600 hover:to-red-600 
      text-white shadow-lg hover:shadow-xl
      border border-orange-500/30
    `,
    ghost: `
      text-white hover:bg-white/10 
      border border-transparent hover:border-white/20
    `,
    outline: `
      border-2 border-purple-500 text-purple-400 
      hover:bg-purple-500 hover:text-white
      transition-colors duration-300
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {leftIcon && !loading && (
        <span className="w-4 h-4 flex items-center justify-center">
          {leftIcon}
        </span>
      )}
      
      {children}
      
      {rightIcon && !loading && (
        <span className="w-4 h-4 flex items-center justify-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
