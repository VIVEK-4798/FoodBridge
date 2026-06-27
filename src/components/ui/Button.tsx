import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
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
    'inline-flex items-center justify-center font-semibold text-sm rounded-xl px-4 py-2.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-650 active:scale-98 disabled:opacity-50 disabled:pointer-events-none select-none';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750 dark:text-gray-250';
      case 'danger':
        return 'bg-red-655 hover:bg-red-500 text-white dark:bg-red-900/60 dark:hover:bg-red-800/80';
      case 'outline':
        return 'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850';
      case 'primary':
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm';
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
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
