import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
// utils
import { connectToDB } from '@utils/database';

// ----------------------------------------------------------------

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDB();
      // check if user already exists

      // if not create new user and save to DB
      return true;
    } catch (error) {
      console.log('Error on SignIn', error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
