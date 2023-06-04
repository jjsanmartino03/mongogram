'use client'
import Button from '@common/button'
import { useState } from 'react'
import { useCreatePostMutation } from '@queries/posts'
import { useRouter } from 'next/navigation'
import Card from '@common/card'

export default function CreatePostCard({}) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const { mutate, isLoading } = useCreatePostMutation<string>({
    onMutate: async () => {
      router.refresh()
    }
  })

  return (
    <Card>
      <input onChange={e => setContent(e.target.value)} type={'textarea'} />
      <Button isLoading={isLoading} theme={'primary'} onClick={() => mutate(content)}>
        Publicar
      </Button>
    </Card>
  )
}
