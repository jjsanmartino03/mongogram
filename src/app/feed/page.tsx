import Posts from './posts'
import { getPosts } from '../posts/route'
import { redirect } from 'next/navigation'
import { pages } from '@utils/pages'
import { getServerSession } from 'next-auth'
import { authConfig } from '@utils/config'
import UsersCard from './users-card'
import { getUsers } from '../users/services'
import { createComment } from '../posts/[id]/comments/route'
import { getCustomSession } from '@utils/session'
import { revalidatePath } from 'next/cache'

export default async function Feed({}) {
  const sessionPromise = getCustomSession()
  const postsPromise = getPosts(1)
  const usersPromise = getUsers()

  const [session, posts, users] = await Promise.all([sessionPromise, postsPromise, usersPromise])

  if (!session || !session.user?.id) redirect(pages.home)

  const newComment = async (data: FormData) => {
    'use server'

    const postId = data.get('postId') as string
    const content = data.get('content') as string

    if (!postId || !content) return

    await createComment(postId, content, session?.user?.id)

    revalidatePath('/feed')
  }

  return (
    <div className={'flex flex-col w-full xl:w-[1200px] py-5'}>
      <div className={'flex lg:flex-row flex-col gap-3 lg:gap-5'}>
        <UsersCard users={users} />

        <Posts newComment={newComment} posts={posts} />
      </div>
    </div>
  )
}
