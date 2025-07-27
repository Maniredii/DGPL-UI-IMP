import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-200';

  const variants = {
    default: 'shadow-sm',
    elevated: 'shadow-md shadow-slate-200/20 dark:shadow-slate-900/20',
    glass: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50',
    gradient: 'bg-slate-50 dark:bg-slate-800'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };
  
  const hoverClasses = hover ? 'hover:shadow-md hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30 hover:-translate-y-0.5' : '';
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
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
