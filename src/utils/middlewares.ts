import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCustomSession } from '@utils/session'
import { User } from 'next-auth'
export function withValidation<T>(handler: (req: Request, data: T) => Promise<NextResponse>, schema: z.ZodType<T>) {
  return async (req: Request) => {
    const result = schema.safeParse(await req.json())

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return handler(req, result.data)
  }
}

export function withAuthRoute<P = unknown>(handler: (req: Request, params: P, user: User) => Promise<NextResponse>) {
  return async (req: Request, params: P) => {
    const session = await getCustomSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req, params, session.user)
  }
}
