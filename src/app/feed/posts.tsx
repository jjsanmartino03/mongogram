'use client'
import { WithId } from 'mongodb'
import { PostWithUser } from '@interfaces/post'
import Card from '@common/card'
import { getHumanReadableDiff } from '@utils/date'
import { useInfitePosts } from '@queries/posts'
import { PaginatedData } from '@interfaces/index'
import { Fragment } from 'react'
import Button from '@common/button'
import CreatePostCard from './create-post'

export default function Posts({ posts }: { posts: PaginatedData<WithId<PostWithUser>> }) {
  const { data, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfitePosts(posts)

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
                    <div className={'flex justify-end w-full text-gray-600 mt-2'}>
                      {getHumanReadableDiff(post.createdAt)}
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
