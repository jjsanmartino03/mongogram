import { WithId } from 'mongodb'
import { PostWithUser } from '@interfaces/post'
import Card from '@common/card'
import { getHumanReadableDiff } from '@utils/date'

export default function Posts({ posts }: { posts: WithId<PostWithUser>[] }) {
  return (
    <div>
      <Card className={'gap-5 flex flex-col w-full items-center'}>
        {posts.map((post, index) => {
          return (
            <>
              <div className={'w-full'} key={post._id.toString()}>
                <div className={'flex items-center gap-2'}>
                  <img
                    width={30}
                    className={'rounded-full'}
                    src={post.user.image}
                    alt={post.user.name + "'s profile image"}
                  />
                  <h2 className={'font-bold'}>{post.user.name}</h2>
                </div>
                <div className={'border-s-2 pl-2 mt-3'}>{post.content}</div>
                <div className={'flex justify-end w-full text-gray-600'}>{getHumanReadableDiff(post.createdAt)}</div>
              </div>
              {index !== posts.length - 1 ? <hr className={'w-8/12 border-t-2'} /> : null}
            </>
          )
        })}
      </Card>
    </div>
  )
}
