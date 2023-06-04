import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getCustomSession } from '@utils/session'

export function withValidation<T>(handler: (req: Request, data: T) => Promise<NextResponse>, schema: z.ZodType<T>) {
  return async (req: Request) => {
    const result = schema.safeParse(await req.json())

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return handler(req, result.data)
  }
}

export function withAuthRoute(handler: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    const session = await getCustomSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req)
  }
}
