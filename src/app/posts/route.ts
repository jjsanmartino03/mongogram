import { z } from 'zod'
import { connectToDatabase } from '@utils/db'
import { Post, PostWithUser } from '@interfaces/post'
import { NextResponse } from 'next/server'
import { withAuthRoute, withValidation } from '@utils/middlewares'
import { getCustomSession } from '@utils/session'
import { ObjectId, WithId } from 'mongodb'

const newPostSchema = z.object({
  content: z.string()
})

export const getPosts = async (page: number) => {
  const db = await connectToDatabase()

  let posts = await db
    .collection<Post>('posts')
    .aggregate<WithId<PostWithUser>>([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * 10 },
      { $limit: 10 }
    ])
    .toArray()

  posts = posts.map(p => ({
    ...p,
    _id: p._id.toString(),
    user: {
      ...p.user,
      _id: p.user._id.toString()
    },
    userId: p.userId.toString()
  }))

  return {
    items: posts,
    page
  }
}

const POST = withAuthRoute(
  withValidation(async (req: Request, data) => {
    const session = await getCustomSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = data

    const db = await connectToDatabase()

    await db.collection<Post>('posts').insertOne({
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: new ObjectId(session.user.id)
    })

    return NextResponse.json({ success: true })
  }, newPostSchema)
)

const GET = withAuthRoute(async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')

  const posts = await getPosts(parseInt(page || '1'))

  return NextResponse.json(posts)
})

export { POST, GET }
