export type UserRole = 'restaurant' | 'ngo';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
