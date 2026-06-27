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
    <>
      <Button
        variant="primary"
        loading={loading}
        onClick={handleClaim}
        className="w-full sm:w-auto"
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
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
    </>
  );

  return (
    <>
      <div className="flex flex-col items-stretch">
        <Button
          onClick={() => {
            setError('');
            setModalOpen(true);
          }}
          className={buttonClassName}
        >
          Claim Donation
        </Button>

        {error && (
          <span className="mt-2 text-xs text-red-655 font-semibold">
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
        <p className="leading-relaxed">
          Are you sure you want to claim this surplus donation? 
          The restaurant will prepare the food for your pickup. 
          Please ensure your logistics team can complete the collection before the expiration time.
        </p>
        {error && (
          <div className="mt-4 p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/50">
            Error: {error}
          </div>
        )}
      </Modal>
    </>
  );
}
