import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export default function Card({ hoverEffect = false, children, className = '', ...props }: CardProps) {
  const baseStyle = 'bg-white dark:bg-slate-900 border border-gray-150/65 dark:border-gray-800/80 rounded-3xl p-6 shadow-xs';
  const hoverStyle = hoverEffect ? 'hover:shadow-md hover:-translate-y-1 transition duration-300' : '';

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}
