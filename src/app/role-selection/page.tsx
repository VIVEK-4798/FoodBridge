'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { selectUserRole } from '../../actions/user';
import { UserRole } from '../../types/user';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Store, HeartHandshake } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <div className="max-w-2xl w-full text-center space-y-8 animate-scale-up">
        
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-250/20 text-xs font-bold uppercase tracking-wider select-none mb-1">
            🌱 Welcome to FoodBridge
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
            Choose Your Role
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            To get started, please tell us how your organization plans to interact with the FoodBridge network.
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-750 bg-red-50 dark:bg-red-955/20 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-900/50 max-w-md mx-auto font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-xl mx-auto">
          {/* Restaurant Option */}
          <button
            onClick={() => handleSelectRole('restaurant')}
            disabled={loading}
            className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xs border-2 border-transparent hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300 group disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer"
          >
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl text-emerald-600 dark:text-emerald-450 group-hover:scale-110 transition duration-300 shadow-2xs">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="mt-5 text-lg font-black text-gray-900 dark:text-white tracking-tight">Food Provider</h3>
            <p className="mt-2 text-xs text-gray-550 dark:text-gray-400 leading-normal font-semibold">
              Restaurants, cafes, bakeries, or event organizers donating safe, surplus meals.
            </p>
          </button>

          {/* NGO Option */}
          <button
            onClick={() => handleSelectRole('ngo')}
            disabled={loading}
            className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xs border-2 border-transparent hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300 group disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer"
          >
            <div className="p-4 bg-teal-50 dark:bg-teal-950/20 rounded-2xl text-teal-650 dark:text-teal-400 group-hover:scale-110 transition duration-300 shadow-2xs">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="mt-5 text-lg font-black text-gray-900 dark:text-white tracking-tight">Recipient NGO</h3>
            <p className="mt-2 text-xs text-gray-550 dark:text-gray-400 leading-normal font-semibold">
              Non-profits, community shelters, soup kitchens, or charities claiming food.
            </p>
          </button>
        </div>

        {loading && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest animate-pulse mt-4">
            Setting up your workspace dashboard...
          </p>
        )}
      </div>
    </div>
  );
}
