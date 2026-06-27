import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export default function Card({ hoverEffect = false, children, className = '', ...props }: CardProps) {
  const baseStyle = 'bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2xl p-5 shadow-2xs';
  const hoverStyle = hoverEffect ? 'hover:shadow-md hover:-translate-y-0.5 transition duration-300' : '';

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}
