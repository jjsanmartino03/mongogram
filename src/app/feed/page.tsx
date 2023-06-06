import Posts from './posts'
import { getPosts } from '../posts/route'
import { redirect } from 'next/navigation'
import { pages } from '@utils/pages'
import { getServerSession } from 'next-auth'
import { authConfig } from '../api/auth/[...nextauth]/route'
import UsersCard from './users-card'
import { getUsers } from '../users/services'

export default async function Feed({}) {
  const sessionPromise = getServerSession(authConfig)
  const postsPromise = getPosts(1)
  const usersPromise = getUsers()

  const [session, posts, users] = await Promise.all([sessionPromise, postsPromise, usersPromise])

  if (!session) redirect(pages.home)

  return (
    <div className={'flex flex-col w-full xl:w-[1200px] py-5'}>
      <div className={'flex lg:flex-row flex-col gap-3 lg:gap-5'}>
        <UsersCard users={users} />

        <Posts posts={posts} />
      </div>
    </div>
  )
}
