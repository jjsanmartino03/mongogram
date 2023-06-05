import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery } from 'react-query'
import api from '@utils/api'
import { WithId } from 'mongodb'
import { PostWithUser } from '@interfaces/post'
import { PaginatedData } from '@interfaces/index'

export function useCreatePostMutation<T>(options?: UseMutationOptions<unknown, unknown, T>) {
  return useMutation<unknown, unknown, T>(
    'create-post',
    async (content: T) => {
      return api.post('/posts', { content })
    },
    options
  )
}

export function useInfitePosts(initialData?: PaginatedData<WithId<PostWithUser>>) {
  return useInfiniteQuery<PaginatedData<WithId<PostWithUser>>>(
    ['/posts'],
    async ({ pageParam = 1 }) => {
      return api.get('/posts', { page: pageParam.toString() })
    },
    {
      ...(initialData && { initialData: { pages: [initialData], pageParams: [initialData.page] } }),
      getNextPageParam: lastPage => (lastPage.items.length === 10 ? lastPage.page + 1 : null)
    }
  )
}
