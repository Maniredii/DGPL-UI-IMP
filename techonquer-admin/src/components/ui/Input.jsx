import React, { useState, forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({
  className,
  type = 'text',
  label,
  placeholder,
  error,
  success,
  icon: Icon,
  rightIcon: RightIcon,
  size = 'md',
  variant = 'default',
  disabled = false,
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-base',
    lg: 'h-13 px-5 text-lg',
    xl: 'h-15 px-6 text-xl'
  };

  const variantClasses = {
    default: 'border-gray-200 bg-white focus:border-primary-500 focus:ring-primary-500/20',
    filled: 'border-transparent bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-primary-500/20',
    ghost: 'border-transparent bg-transparent focus:bg-white focus:border-primary-500 focus:ring-primary-500/20',
    gradient: 'border-transparent bg-gradient-to-r from-primary-50 to-secondary-50 focus:from-white focus:to-white focus:border-primary-500 focus:ring-primary-500/20'
  };

  const baseClasses = cn(
    'w-full rounded-xl border transition-all duration-200 outline-none',
    'placeholder:text-gray-400 text-gray-900',
    'focus:ring-4 focus:ring-opacity-20',
    sizeClasses[size],
    variantClasses[variant],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
    success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
    disabled && 'opacity-60 cursor-not-allowed bg-gray-100',
    Icon && 'pl-11',
    (RightIcon || showPasswordToggle) && 'pr-11',
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          'block text-sm font-medium transition-colors duration-200',
          error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700'
        )}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={baseClasses}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(RightIcon || showPasswordToggle) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            )}
            {RightIcon && !showPasswordToggle && (
              <RightIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
        )}
      </div>
      
      {(error || success) && (
        <p className={cn(
          'text-sm font-medium',
          error ? 'text-red-600' : 'text-green-600'
        )}>
          {error || success}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
