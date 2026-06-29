import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1F2B]/50 backdrop-blur-sm transition-opacity"
        onClick={loading ? undefined : onCancel}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
          <div className="p-8">
            <h3 className="text-xl font-black text-[#1A1F2B] tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <div className="bg-[#F8F9FC] px-8 py-5 flex flex-col sm:flex-row-reverse gap-3 border-t border-gray-100">
            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="inline-flex w-full sm:w-auto justify-center rounded-2xl bg-[#F5A623] px-6 py-2.5 text-sm font-extrabold text-white hover:bg-[#e0961a] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Confirm'
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="inline-flex w-full sm:w-auto justify-center rounded-2xl bg-white border border-gray-200 px-6 py-2.5 text-sm font-extrabold text-[#1A1F2B] hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}