import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const REGION = process.env.AWS_REGION!;

export const client = new DynamoDBClient({
  region: REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const DONATIONS_TABLE =
  process.env.DYNAMODB_TABLE_DONATIONS!;

export const CLAIMS_TABLE =
  process.env.DYNAMODB_TABLE_CLAIMS!;

export const USERS_TABLE =
  process.env.DYNAMODB_TABLE_USERS!;

export {
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
  marshall,
  unmarshall,
};