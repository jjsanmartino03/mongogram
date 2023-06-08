import { withAuthRoute, withValidation } from '@utils/middlewares'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@utils/db'
import { Post } from '@interfaces/post'
import { ObjectId } from 'mongodb'

const newCommentSchema = z.object({
  content: z.string()
})

export const createComment = async (postId: string, content: string, userId: string) => {
  if (!userId) throw Error('You need to pass an userId')
  const db = await connectToDatabase()
  await db.collection<Post>('posts').updateOne(
    { _id: new ObjectId(postId) },
    {
      $push: {
        comments: {
          _id: new ObjectId().toString(),
          content,
          userId: new ObjectId(userId),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    }
  )
}

const POST = withAuthRoute(
  withValidation(async function (req, data, params: { params: { id: string } }, user) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = data

    await createComment(params.params.id, content, user.id)

    return NextResponse.json({ success: true })
  }, newCommentSchema)
)

export { POST }
