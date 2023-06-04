import { connectToDatabase } from '@utils/db'
import { Post } from '@interfaces/post'
import Posts from './posts'
import CreatePostCard from './create-post'
import { getPosts } from '../posts/route'
import Card from '@common/card'

export default async function Feed({}) {
  const posts = await getPosts()

  return (
    <div className={'flex flex-col w-full xl:w-[1200px] pt-5'}>
      <div className={'flex gap-5'}>
        <Card className={'w-1/4'}>
          <h2 className={'text-2xl'}>Usuarios</h2>
        </Card>
        <div className={'flex flex-col w-3/4 gap-5'}>
          <CreatePostCard />
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  )
}
