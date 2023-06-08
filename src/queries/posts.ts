import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery } from 'react-query'
import api from '@utils/api'
import { WithId } from 'mongodb'
import { PostWithUser } from '@interfaces/post'
import { PaginatedData } from '@interfaces/index'
import { opt } from 'ts-interface-checker'

export function useCreatePostMutation<T>(options?: UseMutationOptions<unknown, unknown, T>) {
  return useMutation<unknown, unknown, T>(
    'create-post',
    async (content: T) => {
      return api.post('/posts', { content })
    },
    options
  )
}

export function useInfitePosts<T>(initialData?: PaginatedData<T>) {
  return useInfiniteQuery<PaginatedData<T>>(
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

export const useLikeMutation = <T>(options?: UseMutationOptions<T, unknown, string, { previousPosts: T }>) => {
  return useMutation<T, unknown, string, { previousPosts: T }>(
    'like',
    async (postId: string) => {
      return api.post(`/posts/${postId}/like`, {})
    },
    options
  )
}

export const useCommentMutation = <T>(
  options?: UseMutationOptions<T, unknown, { postId: string; content: string }>
) => {
  return useMutation<T, unknown, { postId: string; content: string }>(
    'comment',
    async ({ postId, content }) => {
      return api.post(`/posts/${postId}/comments`, { content })
    },
    options
  )
}
