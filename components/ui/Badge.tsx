import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  className = '' 
}: BadgeProps) {
  // Create class names based on variant
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  
  let variantStyles = "";
  switch (variant) {
    case 'default':
      variantStyles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case 'secondary':
      variantStyles = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600";
      break;
    case 'destructive':
      variantStyles = "bg-red-500 text-white hover:bg-red-600";
      break;
    case 'outline':
      variantStyles = "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800";
      break;
    case 'success':
      variantStyles = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/40";
      break;
  }
  
  const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}