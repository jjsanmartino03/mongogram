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

  const posts = await db
    .collection<Post>('posts')
    .aggregate<WithId<PostWithUser>>([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $skip: 0
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.userId',
          foreignField: '_id',
          as: 'comments.user'
        }
      },
      {
        $unwind: {
          path: '$comments.user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          content: {
            $first: '$content'
          },
          createdAt: {
            $first: '$createdAt'
          },
          updatedAt: {
            $first: '$updatedAt'
          },
          userId: {
            $first: '$userId'
          },
          likes: {
            $first: '$likes'
          },
          user: {
            $first: '$user'
          },
          comments: {
            $push: '$comments'
          }
        }
      },
      {
        $set: {
          comments: {
            $cond: {
              if: {
                $eq: ['$comments', [{}]]
              },
              then: null,
              else: '$comments'
            }
          }
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
    .toArray()

  const items = posts.map(p => ({
    ...p,
    _id: p._id.toString(),
    user: {
      ...p.user,
      _id: p.user._id.toString()
    },
    userId: p.userId.toString(),
    comments: p.comments
      ? p.comments.map(c => ({
          ...c,
          _id: c._id.toString(),
          userId: c.userId.toString(),
          content: c.content,
          createdAt: c.createdAt,
          user: {
            ...c.user,
            _id: c.user?._id.toString() || '',
            email: c.user?.email || '',
            name: c.user?.name || ''
          }
        }))
      : undefined
  }))

  return {
    items,
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
