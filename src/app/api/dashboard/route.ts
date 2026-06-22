import { NextResponse } from 'next/server';
import { getAllDonations } from '../../../lib/services/donation-service';
import { getClaims } from '../../../lib/services/claim-service';

export async function GET() {
  try {
    const donations = await getAllDonations();
    const claims = await getClaims();

    const totalDonations = donations.length;
    const activeDonations = donations.filter((d) => d.status === 'AVAILABLE' || d.status === 'CLAIMED').length;
    const completedDonations = donations.filter((d) => d.status === 'COMPLETED').length;
    const totalClaims = claims.length;

    return NextResponse.json({ totalDonations, activeDonations, completedDonations, totalClaims });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
