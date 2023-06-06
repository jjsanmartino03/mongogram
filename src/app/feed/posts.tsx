'use client'
import { PostWithUser } from '@interfaces/post'
import Card from '@common/card'
import { getHumanReadableDiff } from '@utils/date'
import { useInfitePosts, useLikeMutation } from '@queries/posts'
import { PaginatedData } from '@interfaces/index'
import { Fragment } from 'react'
import Button from '@common/button'
import CreatePostCard from './create-post'
import { FaHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { useQueryClient } from 'react-query'

export default function Posts({ posts }: { posts: PaginatedData<PostWithUser> }) {
  const { data: session } = useSession<true>() as any
  const { data, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfitePosts(posts)

  const queryClient = useQueryClient()

  const { mutate } = useLikeMutation({
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
    mutate(id)
  }

  if (!data) return null

  return (
    <div className={'flex flex-col w-full lg:w-3/4 gap-5'}>
      <CreatePostCard onSuccess={refetch} />
      <Card className={'gap-3 flex flex-col w-full items-center'}>
        <h2 className={'w-full text-xl font-bold'}>Últimos posteos</h2>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.items.map((post, postIndex) => {
              return (
                <Fragment key={post._id.toString()}>
                  <div className={'w-full'}>
                    <div className={'flex items-center gap-2'}>
                      <img width={30} className={'rounded-full'} src={post.user.image} alt={'usuario'} />
                      <h2 className={'font-bold'}>{post.user.name}</h2>
                    </div>
                    <div className={'border-s-2 pl-2 mt-3'}>{post.content}</div>
                    <div className={'flex justify-end w-full items-center gap-3 text-gray-600 mt-2'}>
                      <div>{getHumanReadableDiff(post.createdAt)}</div>
                      <Button
                        variant={'link'}
                        theme={post.likes?.includes(session?.user?.id) ? 'danger' : 'secondary'}
                        onClick={() => onLike(post._id.toString())}
                        className={clsx(
                          'flex gap-1 items-center',
                          post.likes?.includes(session?.user?.id) ? '' : 'text-gray-600'
                        )}
                      >
                        {post.likes?.length || 0} <FaHeart />
                      </Button>
                    </div>
                  </div>
                  {pageIndex === data.pages.length - 1 && postIndex === page.items.length - 1 ? null : (
                    <hr className={'w-8/12 border-t-2'} />
                  )}
                </Fragment>
              )
            })}
          </Fragment>
        ))}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
            Ver más
          </Button>
        )}
      </Card>
    </div>
  )
}
