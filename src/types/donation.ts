export type DonationStatus = 'AVAILABLE' | 'CLAIMED' | 'PICKED_UP' | 'COMPLETED';

export interface Donation {
  donationId: string;
  restaurantId: string;
  foodName: string;
  quantity: number;
  description?: string;
  pickupAddress: string;
  availableUntil: string; // ISO string
  status: DonationStatus;
  createdAt: string; // ISO string
}
