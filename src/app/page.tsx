'use client'
import Button from 'utils/components/button'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()

  if (session) console.dir(session)
  return (
    <main className='flex min-h-screen flex-col items-center justify-center text-black'>
      <div className={'flex flex-col gap-3 bg-white w-1/4 h-72 rounded-lg justify-center items-center shadow-lg'}>
        <div>Hola, ingresa a tu cuenta de Mongogram</div>
        <Button variant={'link'} onClick={() => signIn('google')}>
          Ingresar con google
        </Button>
      </div>
    </main>
  )
}
