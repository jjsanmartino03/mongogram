import { connectToDatabase } from '@utils/db'
import { withAuthRoute } from '@utils/middlewares'
import { User } from 'next-auth'
import { NextResponse } from 'next/server'
import { Post } from '@interfaces/post'
import { ObjectId } from 'mongodb'

const POST = withAuthRoute(async function (req: Request, params: { params: { id: string } }, user: User) {
  const db = await connectToDatabase()

  const id = user.id
  const postId = params.params.id

  const post = await db.collection<Post>('posts').findOne({ _id: new ObjectId(postId) })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  if (post.likes && post.likes.includes(id)) {
    post.likes = post.likes.filter(like => like !== id)
  } else if (post.likes) {
    post.likes.push(id)
  } else {
    post.likes = [id]
  }

  await db.collection<Post>('posts').updateOne(
    {
      _id: new ObjectId(postId)
    },
    {
      $set: {
        likes: post.likes
      }
    }
  )

  return NextResponse.json({ success: true })
})

export { POST }
