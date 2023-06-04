'use client'
import Button from '@common/button'
import { useState } from 'react'
import { useCreatePostMutation } from '@mutations/posts'
import { useRouter } from 'next/navigation'

export default function CreatePostCard({}) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const { mutate, isLoading } = useCreatePostMutation<string>({
    onMutate: async () => {
      router.refresh()
    }
  })

  return (
    <>
      <input onChange={e => setContent(e.target.value)} type={'textarea'} />
      <Button isLoading={isLoading} theme={'primary'} onClick={() => mutate(content)}>
        Publicar
      </Button>
    </>
  )
}
