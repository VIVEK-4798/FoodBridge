import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6 ${className}`}>
      {children}
    </main>
  );
}
