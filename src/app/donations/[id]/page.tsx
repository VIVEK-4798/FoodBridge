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
import { ArrowLeft, Package, Clock, MapPin, Mail, FileText } from 'lucide-react';

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
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-between">
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
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-3xl">
        {/* Back navigation - Yellow Hover */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-extrabold text-gray-500 hover:text-[#F5A623] mb-4 transition-colors bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </button>

        {loading ? (
          <LoadingSpinner />
        ) : error && !donation ? (
          <Card className="p-10 text-center space-y-4 bg-white rounded-2xl shadow-md border border-red-100">
            <h2 className="text-xl font-black text-red-600">Error Loading Details</h2>
            <p className="text-gray-500 font-medium">{error}</p>
            <Button onClick={fetchDetails} className="px-6 py-2.5 bg-[#F5A623] rounded-2xl font-extrabold shadow-sm">Retry</Button>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Header banner */}
            <div className="p-8 border-b border-gray-100 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Status Badge - Ensure your Badge component supports yellow/amber for AVAILABLE */}
                <Badge status={donation.status} />
                <span className="text-xs font-bold text-gray-400 tracking-wide">
                  Listed on {formattedDate(donation.createdAt)}
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">
                  {donation.foodName}
                </h1>
                <p className="text-sm text-gray-500 font-bold mt-1.5">
                  Posted by {donation.restaurantName || 'Partner Restaurant'}
                </p>
              </div>
            </div>

            {/* Details content */}
            <div className="p-8 space-y-8">
              {/* Description */}
              {donation.description && (
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Description
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed bg-[#F8F9FC] p-5 rounded-2xl border border-gray-100">
                    {donation.description}
                  </p>
                </div>
              )}

              {/* Grid of Key Info - Yellow themed icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-5">
                  {/* Quantity */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] shrink-0 shadow-sm">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Quantity</h4>
                      <p className="text-base font-extrabold text-[#1A1F2B] mt-0.5">{donation.quantity} meals</p>
                    </div>
                  </div>

                  {/* Available Until */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] shrink-0 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Available Until</h4>
                      <p className="text-base font-extrabold text-[#1A1F2B] mt-0.5">{formattedDate(donation.availableUntil)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Pickup Location</h4>
                      <p className="text-base font-extrabold text-[#1A1F2B] mt-0.5">{donation.pickupAddress}</p>
                    </div>
                  </div>

                  {/* Restaurant Contact */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] shrink-0 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Restaurant Contact</h4>
                      <p className="text-base font-extrabold text-[#1A1F2B] mt-0.5">
                        {donation.restaurantEmail || 'No contact email listed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 text-sm font-medium text-red-600 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  {donation.status !== 'AVAILABLE' && (
                    <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider bg-[#F8F9FC] px-3 py-1.5 rounded-xl border border-gray-100">
                      Listing locked • Status: {donation.status.replace('_', ' ')}
                    </p>
                  )}
                </div>

                {/* NGO Action - Claim Button */}
                {role === 'ngo' && donation.status === 'AVAILABLE' && (
                  <ClaimButton
                    donationId={donation.donationId}
                    ngoId={userId}
                    onClaimSuccess={() => {
                      setToastMessage("Donation claimed successfully!");
                      fetchDetails();
                    }}
                    buttonClassName="w-full sm:w-auto px-8 py-3 bg-[#F5A623] hover:bg-[#e0961a] text-white rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200"
                  />
                )}

                {/* Restaurant Owner Action - Elevated Yellow Theme */}
                {role === 'restaurant' && donation.restaurantId === userId && (
                  <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-end">
                    <span className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mr-1">Update Status:</span>
                    
                    {donation.status === 'AVAILABLE' && (
                      <Button
                        variant="outline"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('COMPLETED')}
                        className="w-full sm:w-auto rounded-2xl font-extrabold shadow-sm border-gray-200 text-gray-600 hover:bg-[#F8F9FC]"
                      >
                        Cancel Listing
                      </Button>
                    )}

                    {donation.status === 'CLAIMED' && (
                      <Button
                        variant="primary"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('PICKED_UP')}
                        className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#e0961a] rounded-2xl font-extrabold shadow-md"
                      >
                        Mark as Picked Up
                      </Button>
                    )}

                    {donation.status === 'PICKED_UP' && (
                      <Button
                        variant="primary"
                        disabled={updating}
                        onClick={() => handleStatusUpdate('COMPLETED')}
                        className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#e0961a] rounded-2xl font-extrabold shadow-md"
                      >
                        Mark as Completed
                      </Button>
                    )}

                    {donation.status === 'COMPLETED' && (
                      <span className="text-xs font-extrabold text-[#F5A623] bg-[#FFF4E6] border border-[#F5A623]/20 px-4 py-2 rounded-2xl select-none shadow-sm">
                        ✓ Completed Cycle
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