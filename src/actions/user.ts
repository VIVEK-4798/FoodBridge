'use server';

import { auth } from '../lib/auth';
import { updateUserRole } from '../lib/services/user-service';
import { UserRole } from '../types/user';

export async function selectUserRole(role: UserRole) {
  const session: any = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error('Not authenticated');
  }

  const userId = session.user.id;
  await updateUserRole(userId, role);

  return { success: true };
}
