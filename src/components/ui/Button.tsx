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
    'inline-flex items-center justify-center font-bold text-sm rounded-2xl px-5 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 active:scale-98 disabled:opacity-50 disabled:pointer-events-none select-none h-12 min-w-[100px]';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-150/40 dark:bg-teal-950/20 dark:hover:bg-teal-950/45 dark:text-teal-400 dark:border-teal-900/50';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white shadow-xs';
      case 'outline':
        return 'bg-transparent border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850';
      case 'ghost':
        return 'bg-transparent text-gray-650 hover:text-emerald-650 hover:bg-emerald-50/40 dark:text-gray-350 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/15';
      case 'primary':
      default:
        return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-md';
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
