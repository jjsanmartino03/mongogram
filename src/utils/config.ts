import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import db from "@utils/db"

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? '',
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      }
    }
  },
  session: {
    strategy: 'database'
  },
  adapter: MongoDBAdapter(db)
}