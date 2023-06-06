import { connectToDatabase } from '@utils/db'
import { User } from '@interfaces/user'
import { NextResponse } from 'next/server'

export async function getUsers() {
  const db = await connectToDatabase()

  return await db.collection<User>('users').find().toArray()
}

const GET = async (req: Request) => {
  const users = await getUsers()

  return NextResponse.json(users)
}

export { GET }
