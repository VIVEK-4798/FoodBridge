import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
}

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ label, error, isTextArea = false, rows = 4, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${props.name || Math.random().toString(36).substr(2, 9)}`;
    const baseStyle =
      'w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-2xl text-[#1A1F2B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:bg-gray-50 min-h-12 shadow-sm focus:shadow-md';
    const borderStyle = error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-200 focus:ring-[#F5A623]';

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-extrabold uppercase text-gray-400 tracking-widest pl-1"
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
          <p className="text-xs text-red-500 font-extrabold animate-fade-in pl-1" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;