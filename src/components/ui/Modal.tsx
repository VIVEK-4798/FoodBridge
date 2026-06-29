'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with click to close & blur - Updated to Dark Navy with softer blur */}
      <div
        className="fixed inset-0 bg-[#1A1F2B]/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content - Updated to Rounded-2xl, White bg, and Gray-100 border */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white border border-gray-100 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all animate-scale-up z-10 p-6 md:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h3 id="modal-title" className="text-xl font-black text-[#1A1F2B] tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#1A1F2B] rounded-2xl hover:bg-[#F8F9FC] transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Updated to Dark Navy text and Medium weight */}
        <div className="text-[#1A1F2B] font-medium text-sm space-y-4">
          {children}
        </div>

        {/* Footer - Updated border to Gray-100 */}
        {footer && (
          <div className="mt-6 pt-4 flex flex-row-reverse gap-3 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}