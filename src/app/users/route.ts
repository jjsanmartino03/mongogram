import { NextResponse } from 'next/server'
import { getUsers } from './services'

const GET = async (req: Request) => {
  const users = await getUsers()

  return NextResponse.json(users)
}

export { GET }
