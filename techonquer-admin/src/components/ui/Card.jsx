import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  hover = false,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl transition-all duration-300 animate-fade-in-up';

  const variants = {
    default: 'shadow-soft hover:shadow-medium',
    elevated: 'shadow-medium shadow-slate-200/40 dark:shadow-slate-900/40 hover:shadow-large',
    glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/30 dark:border-slate-700/30 shadow-glass',
    gradient: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-soft',
    glow: 'shadow-glow border-primary-200 dark:border-primary-800 bg-gradient-to-br from-white to-primary-50/30 dark:from-slate-800 dark:to-primary-900/10'
  };
  
  const paddings = {
    none: '',
    xs: 'p-3',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClasses = hover ? 'hover:shadow-large hover:-translate-y-1 cursor-pointer' : '';
  const gradientOverlay = gradient ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/5 before:to-transparent before:pointer-events-none' : '';
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${gradientOverlay} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-slate-200 dark:border-slate-700 pb-4 mb-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-slate-600 dark:text-slate-400 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-slate-200 dark:border-slate-700 pt-4 mt-6 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
