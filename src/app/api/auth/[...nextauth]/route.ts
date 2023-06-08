import NextAuth, { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import db from '@utils/db'
import { authConfig } from "@utils/config"



const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
