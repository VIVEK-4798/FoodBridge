'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { selectUserRole } from '../../actions/user';
import { UserRole } from '../../types/user';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Store, HeartHandshake, Sparkles } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
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
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4 py-12">
      {/* Main White Card Container - Rounded-3xl with deep shadow */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center space-y-8 animate-scale-up">
        
        <div className="space-y-4">
          {/* Welcome Badge - Updated to Yellow Theme */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 text-xs font-extrabold uppercase tracking-wider select-none mb-1 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Welcome to FoodBridge
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1F2B] leading-[1.1]">
            Choose Your Role
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed font-medium">
            To get started, please tell us how your organization plans to interact with the FoodBridge network.
          </p>
        </div>

        {error && (
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-2xl max-w-md mx-auto shadow-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-xl mx-auto">
          {/* Restaurant Option - Yellow Theme Hover */}
          <button
            onClick={() => handleSelectRole('restaurant')}
            disabled={loading}
            className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border-2 border-gray-100 hover:border-[#F5A623] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F5A623] transition-all duration-300 group disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer"
          >
            <div className="p-4 bg-[#FFF4E6] rounded-2xl text-[#F5A623] group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#1A1F2B] tracking-tight">Food Provider</h3>
            <p className="mt-2 text-xs text-gray-500 leading-normal font-bold">
              Restaurants, cafes, bakeries, or event organizers donating safe, surplus meals.
            </p>
          </button>

          {/* NGO Option - Yellow Theme Hover */}
          <button
            onClick={() => handleSelectRole('ngo')}
            disabled={loading}
            className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border-2 border-gray-100 hover:border-[#F5A623] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F5A623] transition-all duration-300 group disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer"
          >
            <div className="p-4 bg-[#FFF4E6] rounded-2xl text-[#F5A623] group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#1A1F2B] tracking-tight">Recipient NGO</h3>
            <p className="mt-2 text-xs text-gray-500 leading-normal font-bold">
              Non-profits, community shelters, soup kitchens, or charities claiming food.
            </p>
          </button>
        </div>

        {loading && (
          <p className="text-xs text-[#F5A623] font-extrabold uppercase tracking-widest animate-pulse mt-4 bg-[#FFF4E6] px-4 py-2 rounded-full inline-block border border-[#F5A623]/20">
            Setting up your workspace dashboard...
          </p>
        )}
      </div>
    </div>
  );
}