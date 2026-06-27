'use client';

import React, { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Badge from '../../../components/ui/Badge';
import ClaimButton from '../../../components/donations/ClaimButton';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import PageContainer from '../../../components/ui/PageContainer';
import Toast from '../../../components/ui/Toast';

export default function DonationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/donations/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Donation listing not found.');
        }
        throw new Error('Failed to load donation details.');
      }
      const data = await response.json();
      setDonation(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    if (status === 'authenticated') {
      if (!session?.user?.role) {
        router.push('/role-selection');
        return;
      }
      fetchDetails();
    }
  }, [id, status, session, router]);

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    setError('');
    try {
      const response = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status. Please try again.');
      }

      setToastMessage(`Donation status updated to ${newStatus.replace('_', ' ')}!`);
      await fetchDetails();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  if (status === 'loading' || status === 'unauthenticated' || !session?.user?.role) {
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

  const role = session.user.role;
  const userId = session.user.id;

  const formattedDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-3xl">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-2 transition"
        >
          <svg xmlns="http://www.w3.org/2050/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Listings
        </button>

        {loading ? (
          <LoadingSpinner />
        ) : error && !donation ? (
          <Card className="p-8 text-center space-y-4 border-red-200 dark:border-red-900/50 bg-red-50/20">
            <h2 className="text-lg font-bold text-red-750 dark:text-red-400">Error Loading Details</h2>
            <p className="text-sm text-red-500 dark:text-red-450">{error}</p>
            <Button onClick={fetchDetails}>Retry</Button>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden">
            {/* Header banner */}
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700/50 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge status={donation.status} />
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Listed on {formattedDate(donation.createdAt)}
                </span>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {donation.foodName}
                </h1>
                <p className="text-sm text-gray-550 dark:text-gray-400 font-semibold mt-1">
                  Posted by {donation.restaurantName || 'Partner Restaurant'}
                </p>
              </div>
            </div>

            {/* Details content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Description */}
              {donation.description && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40">
                    {donation.description}
                  </p>
                </div>
              )}

              {/* Grid of Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  {/* Quantity */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider">Quantity</h4>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{donation.quantity} meals</p>
                    </div>
                  </div>

                  {/* Available Until */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg text-rose-600 dark:text-rose-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider">Available Until</h4>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{formattedDate(donation.availableUntil)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider">Pickup Location</h4>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{donation.pickupAddress}</p>
                    </div>
                  </div>

                  {/* Restaurant Contact */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-wider">Restaurant Contact</h4>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                        {donation.restaurantEmail || 'No contact email listed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/50">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-4">
                <div>
                  {donation.status !== 'AVAILABLE' && (
                    <p className="text-xs text-gray-450 dark:text-gray-500 font-semibold uppercase tracking-wider">
                      Listing locked • Status: {donation.status.replace('_', ' ')}
                    </p>
                  )}
                </div>

                {/* NGO Action */}
                {role === 'ngo' && donation.status === 'AVAILABLE' && (
                  <ClaimButton
                    donationId={donation.donationId}
                    ngoId={userId}
                    onClaimSuccess={() => {
                      setToastMessage("Donation claimed successfully!");
                      fetchDetails();
                    }}
                    buttonClassName="w-full sm:w-auto px-6 py-2.5 shadow-sm"
                  />
                )}

                {/* Restaurant Owner Action */}
                {role === 'restaurant' && donation.restaurantId === userId && (
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mr-1">Update Status:</span>
                    
                    {donation.status === 'AVAILABLE' && (
                      <Button
                        variant="outline"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('COMPLETED')}
                        className="w-full sm:w-auto"
                      >
                        Cancel Listing
                      </Button>
                    )}

                    {donation.status === 'CLAIMED' && (
                      <Button
                        variant="primary"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('PICKED_UP')}
                        className="w-full sm:w-auto"
                      >
                        Mark as Picked Up
                      </Button>
                    )}

                    {donation.status === 'PICKED_UP' && (
                      <Button
                        variant="primary"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('COMPLETED')}
                        className="w-full sm:w-auto"
                      >
                        Mark as Completed
                      </Button>
                    )}

                    {donation.status === 'COMPLETED' && (
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1.5 rounded-xl select-none">
                        Completed Cycle
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </PageContainer>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

      <Footer />
    </div>
  );
}
