import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center font-extrabold text-sm rounded-2xl px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none h-12 min-w-[100px]';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-[#FFF4E6] hover:bg-[#FDEBD0] text-[#F5A623] border border-[#F5A623]/20 shadow-sm hover:shadow-md';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md';
      case 'outline':
        return 'bg-transparent border-2 border-gray-200 text-[#1A1F2B] hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md';
      case 'ghost':
        return 'bg-transparent text-gray-500 hover:text-[#F5A623] hover:bg-[#FFF4E6]';
      case 'primary':
      default:
        return 'bg-[#F5A623] hover:bg-[#e0961a] text-white shadow-md hover:shadow-lg';
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyle} ${getVariantStyles()} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}