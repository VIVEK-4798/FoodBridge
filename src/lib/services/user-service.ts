import { client, USERS_TABLE, PutItemCommand, GetItemCommand, UpdateItemCommand, marshall, unmarshall } from '../dynamodb';
import { User } from '../../types/user';

export async function createUser(user: User): Promise<User> {
  try {
    const params = { TableName: USERS_TABLE, Item: marshall(user, { removeUndefinedValues: true }) };
    await client.send(new PutItemCommand(params));
    return user;
  } catch (err) {
    throw new Error(`Failed to create user: ${(err as Error).message}`);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const params = { TableName: USERS_TABLE, Key: marshall({ id }) };
    const res = await client.send(new GetItemCommand(params));
    if (!res.Item) return null;
    return unmarshall(res.Item) as User;
  } catch (err) {
    throw new Error(`Failed to get user: ${(err as Error).message}`);
  }
}

export async function updateUserRole(id: string, role: User['role']): Promise<void> {
  try {
    const params = {
      TableName: USERS_TABLE,
      Key: marshall({ id }),
      UpdateExpression: 'SET #r = :role',
      ExpressionAttributeNames: { '#r': 'role' },
      ExpressionAttributeValues: marshall({ ':role': role }),
    };
    await client.send(new UpdateItemCommand(params));
  } catch (err) {
    throw new Error(`Failed to update user role: ${(err as Error).message}`);
  }
}
