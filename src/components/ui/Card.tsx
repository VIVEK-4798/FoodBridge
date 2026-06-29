import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export default function Card({ hoverEffect = false, children, className = '', ...props }: CardProps) {
  const baseStyle = 'bg-white border border-gray-100 rounded-2xl p-6 shadow-sm';
  const hoverStyle = hoverEffect ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : '';

  return (
    <div className={`${baseStyle} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}