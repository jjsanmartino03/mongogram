import { connectToDatabase } from '@utils/db'
import { Post } from '@interfaces/post'
import Posts from './posts'
import CreatePostCard from './create-post'
import { getPosts } from '../posts/route'

export default async function Feed({}) {
  const posts = await getPosts()

  return (
    <div className={'flex flex-col w-full lg:w-[1024px] gap-5'}>
      <h1>Feed</h1>
      <CreatePostCard />
      <Posts posts={posts} />
    </div>
  )
}
