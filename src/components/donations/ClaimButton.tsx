'use client';

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface ClaimButtonProps {
  donationId: string;
  ngoId: string;
  onClaimSuccess: () => void;
  buttonClassName?: string;
}

export default function ClaimButton({ donationId, ngoId, onClaimSuccess, buttonClassName = "" }: ClaimButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClaim = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationId,
          ngoId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to claim donation. Please try again.');
      }

      setModalOpen(false);
      onClaimSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const modalFooter = (
    <div className="flex flex-col sm:flex-row-reverse gap-3 w-full">
      <Button
        variant="primary"
        loading={loading}
        onClick={handleClaim}
        className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#e0961a] text-white rounded-2xl font-extrabold shadow-md hover:shadow-lg transition-all duration-200 border-none"
      >
        Confirm Claim
      </Button>
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => {
          setModalOpen(false);
          setError('');
        }}
        className="w-full sm:w-auto bg-white border-gray-200 text-[#1A1F2B] hover:bg-gray-50 rounded-2xl font-extrabold shadow-sm hover:shadow-md transition-all duration-200"
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-stretch">
        <Button
          onClick={() => {
            setError('');
            setModalOpen(true);
          }}
          className={`bg-[#F5A623] hover:bg-[#e0961a] text-white rounded-2xl font-extrabold shadow-md hover:shadow-lg transition-all duration-200 border-none ${buttonClassName}`}
        >
          Claim Donation
        </Button>

        {error && (
          <span className="mt-2 text-xs font-extrabold text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 text-center">
            {error}
          </span>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        title="Confirm Food Claim"
        onClose={() => {
          if (!loading) {
            setModalOpen(false);
            setError('');
          }
        }}
        footer={modalFooter}
      >
        <div className="space-y-4">
          <p className="text-gray-600 font-medium leading-relaxed">
            Are you sure you want to claim this surplus donation? 
            The restaurant will prepare the food for your pickup. 
            Please ensure your logistics team can complete the collection before the expiration time.
          </p>
          {error && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-2xl border border-red-100">
              Error: {error}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}