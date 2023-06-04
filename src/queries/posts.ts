import { useMutation, UseMutationOptions } from 'react-query'
import api from '@utils/api'

export function useCreatePostMutation<T>(options?: UseMutationOptions<unknown, unknown, T>) {
  return useMutation<unknown, unknown, T>(
    'create-post',
    async (content: T) => {
      return api.post('/posts', { content })
    },
    options
  )
}
