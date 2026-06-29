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
import { User, ShieldCheck } from 'lucide-react';

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
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-between">
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
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-2xl">
        <SectionHeader
          title="Account Profile"
          description="View your FoodBridge organization profile details and account status."
        />

        {user ? (
          <Card className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl bg-[#F5A623] flex items-center justify-center text-white text-2xl font-black shadow-md select-none">
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1A1F2B] leading-tight">
                  {user.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F5A623] bg-[#FFF4E6] px-3 py-1 rounded-full mt-1 border border-[#F5A623]/20">
                  <User className="w-3 h-3" />
                  {user.role === 'restaurant' ? 'Restaurant Provider' : 'NGO / Shelter Recipient'}
                </span>
              </div>
            </div>

            {/* Details Grid - styled with clean rows */}
            <div className="grid grid-cols-1 gap-y-4 text-sm">
              <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px] self-center">Name</span>
                <span className="col-span-2 font-extrabold text-[#1A1F2B]">{user.name}</span>
              </div>
              
              <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px] self-center">Email</span>
                <span className="col-span-2 font-extrabold text-[#1A1F2B]">{user.email}</span>
              </div>

              <div className="grid grid-cols-3 py-2 border-b border-gray-50">
                <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px] self-center">Account Role</span>
                <span className="col-span-2 font-extrabold text-[#1A1F2B] capitalize">{user.role}</span>
              </div>

              <div className="grid grid-cols-3 py-2">
                <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px] self-center">Verification</span>
                <span className="col-span-2 inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 w-fit select-none shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Member
                </span>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center text-gray-400 font-bold py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            No profile data could be recovered.
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}