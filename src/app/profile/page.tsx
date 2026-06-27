'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Card from '../../components/ui/Card';
import SectionHeader from '../../components/ui/SectionHeader';
import PageContainer from '../../components/ui/PageContainer';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-2xl">
        <SectionHeader
          title="Account Profile"
          description="View your FoodBridge organization profile details and account status."
        />

        {user ? (
          <Card className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700/50">
              <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-extrabold shadow-sm uppercase select-none">
                {user.name ? user.name.slice(0, 2) : 'U'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {user.name}
                </h2>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none mt-1 inline-block">
                  {user.role === 'restaurant' ? 'Restaurant Provider' : 'NGO / Shelter Recipient'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-4 text-sm">
              <div className="grid grid-cols-3 py-1.5 border-b border-gray-50 dark:border-gray-800/30">
                <span className="font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider text-xs self-center">Name</span>
                <span className="col-span-2 font-semibold text-gray-900 dark:text-white">{user.name}</span>
              </div>
              
              <div className="grid grid-cols-3 py-1.5 border-b border-gray-50 dark:border-gray-800/30">
                <span className="font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider text-xs self-center">Email</span>
                <span className="col-span-2 font-semibold text-gray-900 dark:text-white">{user.email}</span>
              </div>

              <div className="grid grid-cols-3 py-1.5 border-b border-gray-50 dark:border-gray-800/30">
                <span className="font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider text-xs self-center">Account Role</span>
                <span className="col-span-2 font-semibold text-gray-900 dark:text-white capitalize">{user.role}</span>
              </div>

              <div className="grid grid-cols-3 py-1.5">
                <span className="font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider text-xs self-center">Verification</span>
                <span className="col-span-2 text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 w-fit select-none">
                  Verified Member
                </span>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No profile data could be recovered.
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}
