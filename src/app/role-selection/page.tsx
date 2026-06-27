'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { selectUserRole } from '../../actions/user';
import { UserRole } from '../../types/user';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function RoleSelectionPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.role) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading' || (status === 'authenticated' && session?.user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  const handleSelectRole = async (role: UserRole) => {
    setLoading(true);
    setError('');
    try {
      const res = await selectUserRole(role);
      if (res.success) {
        // Update next-auth session client-side
        await update({ role });
        router.push('/dashboard');
      } else {
        setError('Failed to save role. Please try again.');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Role
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            To get started with FoodBridge, please let us know how you plan to use the platform.
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50 max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-xl mx-auto">
          {/* Restaurant Option */}
          <button
            onClick={() => handleSelectRole('restaurant')}
            disabled={loading}
            className="flex flex-col items-center text-left p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border-2 border-transparent hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 group disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl group-hover:scale-110 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.616m-7.5 0a3.001 3.001 0 0 1 3.75-.615 3.001 3.001 0 0 1 3.75.616m0 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.616m-7.5 0V3.75m9-.003 1.124-1.125m-1.124 1.125a2.25 2.25 0 0 0-2.25 2.25v2.247m1.124-4.497 1.124 1.125M18 8.25V5.75m0 2.5-.124.125m-12.752 0-.124-.125M4.5 5.75V8.25m0-2.5L3.376 4.625M4.5 5.75a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 10.5 5.75v2.247m-9 0L2.624 4.625M2.624 4.625l1.124-1.125" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Restaurant</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Donate surplus food, manage active postings, and track pickup completions.
            </p>
          </button>

          {/* NGO Option */}
          <button
            onClick={() => handleSelectRole('ngo')}
            disabled={loading}
            className="flex flex-col items-center text-left p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border-2 border-transparent hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 group disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl group-hover:scale-110 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-emerald-600 dark:text-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">NGO / Shelter</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Browse available donations near you, claim meals, and coordinate pick ups.
            </p>
          </button>
        </div>

        {loading && (
          <p className="text-sm text-blue-600 dark:text-blue-400 animate-pulse mt-4">
            Saving your preference and initializing dashboard...
          </p>
        )}
      </div>
    </div>
  );
}
