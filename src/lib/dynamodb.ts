import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

// Centralized DynamoDB client. Reads configuration from environment variables.
// Do NOT hardcode credentials here; rely on environment variables or IAM role.
const REGION = process.env.AWS_REGION || 'us-east-1';

export const client = new DynamoDBClient({
  region: REGION,
  // Credentials will be picked up from environment variables:
  // AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and optionally AWS_SESSION_TOKEN.
});

// Table names should be provided via environment variables.
export const DONATIONS_TABLE = process.env.DYNAMODB_TABLE_DONATIONS || 'FoodBridge_Donations';
export const CLAIMS_TABLE = process.env.DYNAMODB_TABLE_CLAIMS || 'FoodBridge_Claims';
export const USERS_TABLE = process.env.DYNAMODB_TABLE_USERS || 'FoodBridge_Users';

export { PutItemCommand, GetItemCommand, ScanCommand, UpdateItemCommand, marshall, unmarshall };
