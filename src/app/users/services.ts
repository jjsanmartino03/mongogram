import { connectToDatabase } from '@utils/db'
import { User } from '@interfaces/user'

export async function getUsers() {
  const db = await connectToDatabase()

  return await db.collection<User>('users').find().toArray()
}
