import { client, CLAIMS_TABLE, PutItemCommand, ScanCommand, marshall, unmarshall, UpdateItemCommand, DONATIONS_TABLE } from '../dynamodb';
import { Claim } from '../../types/claim';

// Create a claim and mark the donation as CLAIMED
export async function createClaim(claim: Claim): Promise<Claim> {
  try {
    const putParams = {
      TableName: CLAIMS_TABLE,
      Item: marshall(claim, { removeUndefinedValues: true }),
    };
    await client.send(new PutItemCommand(putParams));

    // Update donation status to CLAIMED
    const updateParams = {
      TableName: DONATIONS_TABLE,
      Key: marshall({ donationId: claim.donationId }),
      UpdateExpression: 'SET #s = :status',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: marshall({ ':status': 'CLAIMED' }),
    };
    await client.send(new UpdateItemCommand(updateParams));

    return claim;
  } catch (err) {
    throw new Error(`Failed to create claim: ${(err as Error).message}`);
  }
}

// Get all claims (simple scan for MVP)
export async function getClaims(): Promise<Claim[]> {
  try {
    const params = { TableName: CLAIMS_TABLE };
    const res = await client.send(new ScanCommand(params));
    const items = res.Items || [];
    return items.map((it) => unmarshall(it) as Claim);
  } catch (err) {
    throw new Error(`Failed to fetch claims: ${(err as Error).message}`);
  }
}
