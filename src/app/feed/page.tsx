import Posts from './posts'
import CreatePostCard from './create-post'
import { getPosts } from '../posts/route'
import Card from '@common/card'
import { redirect } from 'next/navigation'
import { pages } from '@utils/pages'
import { getServerSession } from 'next-auth'
import { authConfig } from '../api/auth/[...nextauth]/route'
import UsersCard from './users-card'

export default async function Feed({}) {
  const sessionPromise = getServerSession(authConfig)
  const postsPromise = getPosts(1)

  const [session, posts] = await Promise.all([sessionPromise, postsPromise])

  if (!session) redirect(pages.home)

  return (
    <div className={'flex flex-col w-full xl:w-[1200px] py-5'}>
      <div className={'flex lg:flex-row flex-col gap-3 lg:gap-5'}>
        <UsersCard />

        <Posts posts={posts} />
      </div>
    </div>
  )
}
