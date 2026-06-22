import { client, DONATIONS_TABLE, PutItemCommand, ScanCommand, GetItemCommand, UpdateItemCommand, marshall, unmarshall } from '../dynamodb';
import { Donation } from '../../types/donation';

// Create a donation record
export async function createDonation(donation: Donation): Promise<Donation> {
  try {
    const params = {
      TableName: DONATIONS_TABLE,
      Item: marshall(donation, { removeUndefinedValues: true }),
    };
    await client.send(new PutItemCommand(params));
    return donation;
  } catch (err) {
    throw new Error(`Failed to create donation: ${(err as Error).message}`);
  }
}

// Retrieve all donations
export async function getAllDonations(): Promise<Donation[]> {
  try {
    const params = { TableName: DONATIONS_TABLE };
    const res = await client.send(new ScanCommand(params));
    const items = res.Items || [];
    return items.map((it) => unmarshall(it) as Donation);
  } catch (err) {
    throw new Error(`Failed to fetch donations: ${(err as Error).message}`);
  }
}

// Retrieve one donation by id
export async function getDonationById(donationId: string): Promise<Donation | null> {
  try {
    const params = { TableName: DONATIONS_TABLE, Key: marshall({ donationId }) };
    const res = await client.send(new GetItemCommand(params));
    if (!res.Item) return null;
    return unmarshall(res.Item) as Donation;
  } catch (err) {
    throw new Error(`Failed to get donation: ${(err as Error).message}`);
  }
}

// Update donation status
export async function updateDonationStatus(donationId: string, status: Donation['status']): Promise<void> {
  try {
    const params = {
      TableName: DONATIONS_TABLE,
      Key: marshall({ donationId }),
      UpdateExpression: 'SET #s = :status',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: marshall({ ':status': status }),
    };
    await client.send(new UpdateItemCommand(params));
  } catch (err) {
    throw new Error(`Failed to update donation status: ${(err as Error).message}`);
  }
}
