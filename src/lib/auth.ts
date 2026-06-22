import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// NextAuth configuration. Credentials must be provided via environment variables.
// DO NOT commit client secrets. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment.
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  // Additional options (callbacks, session, etc.) can be added here.
};

// The App Router requires a route handler for NextAuth (not implemented here).
// This file provides the shared config for the auth routes.
export default NextAuth(authOptions as any);
