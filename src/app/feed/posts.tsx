'use client'
import { PostWithUser } from '@interfaces/post'
import Card from '@common/card'
import { useInfitePosts } from '@queries/posts'
import { PaginatedData } from '@interfaces/index'
import { Fragment } from 'react'
import Button from '@common/button'
import CreatePostCard from './create-post'
import { useSession } from 'next-auth/react'
import Post from './post'
import Loader from '@common/loader'

export default function Posts({
  posts,
  newComment
}: {
  posts: PaginatedData<PostWithUser>
  newComment: (data: FormData) => void
}) {
  const { data: session } = useSession<true>() as any
  const { data, refetch, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfitePosts(posts)

  if (!data) return null

  return (
    <div className={'flex flex-col w-full lg:w-3/4 gap-5'}>
      <CreatePostCard onSuccess={refetch} />
      <Card className={'gap-3 flex flex-col w-full items-center'}>
        <h2 className={'w-full text-xl font-bold flex items-center gap-2'}>
          Últimos posteos {isFetching && <Loader />}
        </h2>
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.items.map(post => {
              return <Post key={post._id.toString()} post={post} />
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
