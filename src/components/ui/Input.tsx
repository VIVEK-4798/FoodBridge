import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
}

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ label, error, isTextArea = false, rows = 3, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${props.name || Math.random().toString(36).substr(2, 9)}`;
    const baseStyle =
      'w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-850 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900';
    const borderStyle = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-600';

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider"
          >
            {label}
          </label>
        )}
        
        {isTextArea ? (
          <textarea
            ref={ref as any}
            id={inputId}
            rows={rows}
            className={`${baseStyle} ${borderStyle} ${className}`}
            {...props}
          />
        ) : (
          <input
            ref={ref as any}
            id={inputId}
            className={`${baseStyle} ${borderStyle} ${className}`}
            {...props}
          />
        )}

        {error && (
          <p className="text-xs text-red-655 font-semibold animate-fade-in" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
