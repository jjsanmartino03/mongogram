import Button from '@common/button'
import { useState } from 'react'
import { useCreatePostMutation } from '@queries/posts'
import Card from '@common/card'

export default function CreatePostCard({ onSuccess }: { onSuccess: () => void }) {
  const [content, setContent] = useState('')

  const { mutate, isLoading } = useCreatePostMutation<string>({
    onSuccess: async () => {
      setContent('')
      onSuccess()
    }
  })

  return (
    <Card className={'flex gap-2 items-end flex-col'}>
      <textarea
        placeholder='¿En qué estas pensando? 👇'
        className={
          'resize-none rounded-md w-full focus:shadow-lg focus:border-b-2 focus:border-blue-500 bg-gray-100 focus:outline-none p-2 focus:border-0'
        }
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />
      <Button
        disabled={content === ''}
        isLoading={isLoading}
        className={'h-min w-full'}
        theme={'primary'}
        onClick={() => mutate(content)}
      >
        Publicar
      </Button>
    </Card>
  )
}
