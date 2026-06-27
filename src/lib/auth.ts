import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, createUser } from './services/user-service';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder-secret',
    }),
    CredentialsProvider({
      name: 'Development Bypass',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@foodbridge.org" },
        name: { label: "Name", type: "text", placeholder: "Test User" },
        role: { label: "Role (restaurant or ngo)", type: "text", placeholder: "ngo" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = String(credentials.email);
        const name = String(credentials.name || email.split('@')[0]);
        const role = credentials.role === 'restaurant' ? 'restaurant' : 'ngo';
        
        let user = await getUserByEmail(email);
        if (!user) {
          user = await createUser({
            id: crypto.randomUUID(),
            name: name,
            email: email,
            role: role,
            createdAt: new Date().toISOString()
          });
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google') {
        const email = user.email!;
        let dbUser = await getUserByEmail(email);
        if (!dbUser) {
          dbUser = await createUser({
            id: user.id || crypto.randomUUID(),
            name: user.name || email.split('@')[0],
            email: email,
            role: null, // Select role on next page
            createdAt: new Date().toISOString()
          });
        }
        user.role = dbUser.role;
        user.id = dbUser.id;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      // Re-fetch role from DB if it is null to stay updated
      if (!token.role && token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser && dbUser.role) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'foodbridge-secret-development-key-1234567890',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions as any);
