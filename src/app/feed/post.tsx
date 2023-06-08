import { getHumanReadableDiff } from '@utils/date'
import Button from '@common/button'
import { FaArrowRight, FaComment, FaHeart } from 'react-icons/fa'
import clsx from 'clsx'
import { PostWithUser } from '@interfaces/post'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useCommentMutation, useInfitePosts, useLikeMutation } from '@queries/posts'
import { PaginatedData } from '@interfaces/index'

export default function Post({ post }: { post: PostWithUser }) {
  const { data: session } = useSession<true>() as any

  const { refetch: refetchPosts } = useInfitePosts()

  const queryClient = useQueryClient()

  const [comment, setComment] = useState('')

  const { mutate: mutateLike } = useLikeMutation({
    onMutate: id => {
      const posts = queryClient.getQueryData<{ pages: PaginatedData<PostWithUser>[] }>('/posts')

      if (posts) {
        queryClient.setQueryData<{ pages: PaginatedData<PostWithUser>[] }>('/posts', {
          ...posts,
          pages: posts.pages.map(page => ({
            ...page,
            items: page.items.map(post => {
              if (post._id === id) {
                post.likes = post.likes?.includes(session?.user?.id)
                  ? post.likes?.filter(like => like !== session?.user?.id)
                  : [...(post.likes || []), session?.user?.id]
              }

              return post
            })
          }))
        })
      }

      return { previousPosts: posts }
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData<{ pages: PaginatedData<PostWithUser>[] }>('/posts', context.previousPosts)
      }
    }
  })

  const onLike = (id: string) => {
    mutateLike(id)
  }

  const { mutate: mutateComment, isLoading: commentLoading } = useCommentMutation({
    onSuccess: () => {
      setComment('')
      refetchPosts()
    }
  })

  const [commentsOpen, setCommentsOpen] = useState(false)
  const toggleComments = () => setCommentsOpen(commentsOpen => !commentsOpen)

  return (
    <Fragment key={post._id.toString()}>
      <div className={'w-full overflow-hidden'}>
        <div className={'flex items-center gap-2'}>
          <img width={30} className={'rounded-full'} src={post.user.image} alt={'usuario'} />
          <h2 className={'font-bold'}>{post.user.name}</h2>
        </div>
        <div className={'border-s-2 pl-2 mt-3'}>{post.content}</div>
        <div className={'flex justify-end w-full items-center gap-3 text-gray-600 mt-2'}>
          <div>{getHumanReadableDiff(post.createdAt)}</div>
          <Button
            padding={false}
            className={'flex gap-1 items-center text-gray-600 p-0'}
            variant={'link'}
            theme={'secondary'}
            onClick={toggleComments}
          >
            {post.comments?.length || 0} <FaComment />
          </Button>
          <Button
            padding={false}
            variant={'link'}
            theme={post.likes?.includes(session?.user?.id) ? 'danger' : 'secondary'}
            onClick={() => onLike(post._id.toString())}
            className={clsx(
              'flex gap-1 items-center p-0',
              post.likes?.includes(session?.user?.id) ? '' : 'text-gray-600'
            )}
          >
            {post.likes?.length || 0} <FaHeart />
          </Button>
        </div>
      </div>
      {/* <form>
        <input type={'hidden'} name={'postId'} value={post._id.toString()} />
        <input type={'text'} name={'content'} />
        <Button type={'submit'}>Comentar</Button>
      </form>*/}
      <div
        className={clsx(
          'relative overflow-hidden transition-all flex flex-col gap-1 w-full bg-blue-100 rounded-xl items-start gap-2',
          commentsOpen ? 'max-h-full lg:px-8 px-4  py-3' : 'max-h-0'
        )}
      >
        {post.comments?.map(comment => (
          <div key={comment._id.toString()} className={'flex flex-col w-full items-start gap-1 border-s-white'}>
            <div className={'flex items-center gap-2'}>
              <img width={25} className={'rounded-full'} src={comment.user?.image} alt={'usuario'} />
              <h2 className={'font-bold'}>{comment.user?.name}</h2>
            </div>
            <div className={'w-full border-s-2 border-s-white pl-2'}>{comment.content}</div>
            <div className={'self-end'}>{getHumanReadableDiff(comment.createdAt)}</div>
          </div>
        ))}
        {post.comments && <hr />}
        <div className={'flex gap-2'}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={'Comenta tu respuesta 👇'}
            className={
              'rounded-md w-full focus:shadow-lg focus:border-b-2 focus:border-blue-500 bg-gray-100 focus:outline-none p-2 focus:border-0'
            }
          />
          <Button
            onClick={() =>
              mutateComment({
                postId: post._id.toString(),
                content: comment
              })
            }
            isLoading={commentLoading}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
